// Single source of truth for per-route metadata. Used at runtime (document head updates in App.jsx)
// AND at build time (vite.config.js pre-renders one HTML shell per route so crawlers and
// WhatsApp/Facebook link previews see the right title, description and canonical without running JS).
import { FOOTER, CONTACT, BRAND } from './Content.js'

export const SITE_NAME = BRAND

export const ROUTE_META = {
  '/': {
    title: 'Golden Photography | Wedding Photographer in Bhandara',
    description:
      'Candid wedding photography, pre-wedding shoots, cinematic films and albums in Bhandara, Maharashtra. See our work and book your shoot with Golden Photography.',
  },
  '/album': {
    title: 'Wedding Albums, Box & Leather Bag Sets | Golden Photography',
    description:
      'Premium wedding albums from Golden Photography, Bhandara: a box, leather bag and calendar set for ₹8,000, cover and box styles, paper options and a clear price guide.',
    crumb: 'Albums',
  },
  '/about': {
    title: 'About Us | Golden Photography, Bhandara',
    description:
      'Meet the team behind Golden Photography: authentic, natural-light wedding photography and films for families in Bhandara and nearby cities.',
    crumb: 'About',
  },
  '/servicespage': {
    title: 'Photography & Film Services and Rates | Golden Photography',
    description:
      'Wedding photography from ₹3,500 per day, traditional and cinematic video, candid shoots, drone and FPV coverage, and albums. Rates and packages from Golden Photography, Bhandara.',
    crumb: 'Services',
  },
  '/contact': {
    title: 'Contact & Book a Shoot | Golden Photography Bhandara',
    description:
      'Call, WhatsApp or send an enquiry to book Golden Photography for your wedding, pre-wedding, portrait or event in Bhandara.',
    crumb: 'Contact',
  },
}

export const NOT_FOUND_META = {
  title: 'Page not found | Golden Photography',
  description: 'The page you are looking for does not exist.',
}

const INSTAGRAM = 'https://www.instagram.com/g_o_l_u__09'

// LocalBusiness structured data. Only facts that already appear on the site are used.
export function businessJsonLd(siteUrl) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Photographer',
    name: BRAND,
    description: ROUTE_META['/'].description,
    telephone: CONTACT.call,
    email: FOOTER.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jawaharnagar Petrol Pump Thana',
      addressLocality: 'Bhandara',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'City', name: 'Bhandara' },
    sameAs: [INSTAGRAM],
  }
  if (siteUrl) {
    data.url = siteUrl + '/'
    data.image = siteUrl + '/og-image.jpg'
  }
  return data
}

export function breadcrumbJsonLd(siteUrl, path) {
  const meta = ROUTE_META[path]
  if (!siteUrl || !meta || !meta.crumb) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
      { '@type': 'ListItem', position: 2, name: meta.crumb, item: siteUrl + path },
    ],
  }
}

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Keeps <head> in sync on client-side navigation.
export function applyRouteMeta(pathname, siteUrl) {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/'
  const known = ROUTE_META[path]
  const meta = known || NOT_FOUND_META
  document.title = meta.title
  setMeta('meta[name="description"]', 'content', meta.description)
  setMeta('meta[property="og:title"]', 'content', meta.title)
  setMeta('meta[property="og:description"]', 'content', meta.description)
  setMeta('meta[name="twitter:title"]', 'content', meta.title)
  setMeta('meta[name="twitter:description"]', 'content', meta.description)
  setMeta('meta[name="robots"]', 'content', known ? 'index, follow, max-image-preview:large' : 'noindex')
  if (siteUrl && known) {
    setMeta('link[rel="canonical"]', 'href', siteUrl + (path === '/' ? '/' : path))
    setMeta('meta[property="og:url"]', 'content', siteUrl + (path === '/' ? '/' : path))
  }
}
