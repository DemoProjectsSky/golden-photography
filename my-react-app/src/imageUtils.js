import manifest from './image-manifest.json'

// URL of a resized variant for places that need a single URL (e.g. WebGL textures).
// Picks the smallest variant that is at least `width` wide.
export function variantSrc(src, width = 600, format = 'webp') {
  const m = manifest[src]
  if (!m) return src
  const list = m[format] || m.webp
  return (list.find(e => e.width >= width) || list[list.length - 1]).src
}

// Photos shown as floating prints in the 3D scene.
export const SHOWCASE = ['goldenphoto1.jpg', 'goldenphoto2.jpg', 'goldenphoto3.jpg', 'goldenphoto4.jpg', 'goldenphoto5.jpg', 'goldenphoto6.jpeg', 'goldenphoto7.jpg'].map(f => `/images/${f}`)
