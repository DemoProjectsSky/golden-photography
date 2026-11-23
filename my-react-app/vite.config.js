import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { ROUTE_META, NOT_FOUND_META, SITE_NAME, businessJsonLd, breadcrumbJsonLd } from './src/seo.js'

// Production origin, used for canonical URLs, Open Graph, sitemap and JSON-LD.
// Set VITE_SITE_URL, or deploy on Vercel (VERCEL_PROJECT_PRODUCTION_URL is provided automatically).
// If neither exists, absolute-URL tags are simply omitted rather than guessed.
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/+$/, '')

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

function headFor(route, { notFound = false } = {}) {
  const meta = notFound ? NOT_FOUND_META : ROUTE_META[route]
  const url = SITE_URL ? SITE_URL + (route === '/' ? '/' : route) : ''
  const img = SITE_URL ? `${SITE_URL}/og-image.jpg` : ''
  const lines = [
    '<!--seo:start-->',
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${notFound ? 'noindex' : 'index, follow, max-image-preview:large'}" />`,
    ...(url && !notFound ? [`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`] : []),
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    ...(img
      ? [
          `<meta property="og:image" content="${img}" />`,
          '<meta property="og:image:width" content="1200" />',
          '<meta property="og:image:height" content="630" />',
          `<meta name="twitter:image" content="${img}" />`,
        ]
      : []),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ]
  if (!notFound) {
    lines.push(ld(businessJsonLd(SITE_URL)))
    const crumbs = breadcrumbJsonLd(SITE_URL, route)
    if (crumbs) lines.push(ld(crumbs))
  }
  lines.push('<!--seo:end-->')
  return lines.join('\n')
}

// Pre-renders one HTML shell per route (+ 404.html). The React app still renders the page,
// but crawlers and link-preview bots (WhatsApp, Facebook) get the right <head> without running JS.
function seoPlugin() {
  let outDir = 'dist'
  return {
    name: 'golden-seo',
    configResolved(cfg) {
      outDir = path.resolve(cfg.root, cfg.build.outDir)
    },
    transformIndexHtml: { order: 'pre', handler: html => html.replace('<!--seo-->', headFor('/')) },
    closeBundle() {
      const base = readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const re = /<!--seo:start-->[\s\S]*?<!--seo:end-->/
      for (const route of Object.keys(ROUTE_META)) {
        if (route === '/') continue
        const dir = path.join(outDir, route)
        mkdirSync(dir, { recursive: true })
        writeFileSync(path.join(dir, 'index.html'), base.replace(re, () => headFor(route)))
      }
      writeFileSync(path.join(outDir, '404.html'), base.replace(re, () => headFor('/404', { notFound: true })))

      const today = new Date().toISOString().slice(0, 10)
      if (SITE_URL) {
        const urls = Object.keys(ROUTE_META)
          .map(r => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
          .join('\n')
        writeFileSync(
          path.join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
        )
      } else {
        console.warn('[golden-seo] No site URL known (set VITE_SITE_URL): sitemap.xml, canonical and og:url were skipped.')
      }
      writeFileSync(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\nDisallow: /api/\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`
      )
    },
  }
}

// three-r128's example helpers (RoomEnvironment) import the bare 'three' specifier, which would resolve to
// the project's three 0.186 and mix two versions in one scene. Keep them on their own r128 copy.
function pinThreeR128() {
  return {
    name: 'pin-three-r128',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (source === 'three' && importer && importer.includes('/node_modules/three-r128/')) {
        return this.resolve('three-r128', importer, { ...options, skipSelf: true })
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [pinThreeR128(), react(), seoPlugin()],
  define: { __SITE_URL__: JSON.stringify(SITE_URL) },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three-r128/')) return 'three-r128'
          if (id.includes('/node_modules/three/')) return 'three'
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/react-router-dom/')) return 'vendor'
        },
      },
    },
  },
  server: { port: 5173, proxy: { '/api': 'http://localhost:5000' } },
})
