// "Wedding Photography" -> "wedding-photography" (details link / URL ke liye)
export const serviceSlug = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
