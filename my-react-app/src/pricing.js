// Price rule used by the brochure style codes, e.g. SM110-01:
//   PREFIX (collection) + PRICE DIGITS + "-" + DESIGN NO.
//   "middle number" x 100 = price in rupees  (SM110-01 -> Rs 11,000, FR28-01 -> Rs 2,800)
const CODE_RE = /^([A-Za-z]+)(\d+)-(\d+)$/

export const priceFromCode = (code = '') => {
  const m = code.trim().replace(/\s+/g, '').match(CODE_RE)
  if (!m) return null
  return { prefix: m[1].toUpperCase(), digits: m[2], design: m[3], price: Number(m[2]) * 100 }
}

export const inr = n => '₹' + Number(n).toLocaleString('en-IN')
