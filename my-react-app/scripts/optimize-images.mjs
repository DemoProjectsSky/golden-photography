// Regenerates public/images/optimized/* and src/image-manifest.json from assets-src/images/*.
// Usage: npm run images              (all images, rebuilds the manifest)
//        npm run images -- album-    (only files whose name contains 'album-', merged into the manifest)
// Originals live in assets-src/ so they are NOT deployed; only the small variants are.
import sharp from 'sharp'
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'assets-src/images')
const OUT = path.join(root, 'public/images/optimized')
const MANIFEST = path.join(root, 'src/image-manifest.json')
const WIDTHS = [300, 600, 1200, 1920]
const only = process.argv.slice(2)

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter(f => /\.(jpe?g|png|avif|webp)$/i.test(f))
// Partial runs (npm run images -- album-) MERGE into the existing manifest instead of replacing it.
let manifest = {}
if (only.length) {
  try { manifest = JSON.parse(await readFile(MANIFEST, 'utf8')) } catch { manifest = {} }
}

for (const file of files) {
  if (only.length && !only.some(o => file.includes(o))) continue
  const name = path.parse(file).name
  const meta = await sharp(path.join(SRC, file), { limitInputPixels: false }).metadata()
  const entry = { width: meta.width, height: meta.height, avif: [], webp: [] }
  // Never upscale: use the standard widths below the source width, plus the source width itself when it is smaller than the next step.
  const widths = [...new Set([...WIDTHS.filter(w => w < meta.width), Math.min(meta.width, WIDTHS.find(w => w >= meta.width) || meta.width)])].sort((a, b) => a - b)
  for (const w of widths) {
    const h = Math.round((meta.height * w) / meta.width)
    const base = sharp(path.join(SRC, file), { limitInputPixels: false }).rotate().resize({ width: w, withoutEnlargement: true })
    await base.clone().avif({ quality: 52, effort: 4 }).toFile(path.join(OUT, `${name}-${w}.avif`))
    await base.clone().webp({ quality: 78, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    entry.avif.push({ src: `/images/optimized/${name}-${w}.avif`, width: w, height: h })
    entry.webp.push({ src: `/images/optimized/${name}-${w}.webp`, width: w, height: h })
  }
  manifest[`/images/${file}`] = entry
  console.log('✓', file, widths.join(','))
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(only.length ? 'Partial run: manifest updated (merged).' : 'Manifest rebuilt.')
