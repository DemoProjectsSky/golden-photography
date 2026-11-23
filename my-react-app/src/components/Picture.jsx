import manifest from '../image-manifest.json'

// Builds a responsive <picture> (AVIF -> WebP) from image-manifest.json.
// Sources that are not in the manifest fall back to a plain <img>.
// `priority` is for the single LCP image: eager + fetchpriority=high, never lazy.
export default function Picture({ src, alt, sizes = '100vw', priority = false, className, onError }) {
  const m = manifest[src]
  const loading = priority ? 'eager' : 'lazy'
  const fetchPriority = priority ? 'high' : 'auto'
  if (!m) {
    return <img src={src} alt={alt} className={className} loading={loading} decoding="async" onError={onError} />
  }
  const set = list => list.map(e => `${e.src} ${e.width}w`).join(', ')
  const fallback = m.webp.find(e => e.width >= 600) || m.webp[m.webp.length - 1]
  return (
    <picture>
      <source type="image/avif" srcSet={set(m.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={set(m.webp)} sizes={sizes} />
      <img
        src={fallback.src}
        alt={alt}
        className={className}
        width={m.width}
        height={m.height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onError={onError}
      />
    </picture>
  )
}
