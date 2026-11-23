# Golden Photography: audit & optimisation report

Scope: `my-react-app` (React 19 + Vite + three.js, Vercel `api/` functions). All numbers below were measured in headless Chromium against a production build unless marked "not tested".

## 1. Critical issues found and fixed

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 1 | Homepage content invisible on cold load (43 `.rv` blocks at opacity 0, 0 revealed) | Visitors saw only the camera; no headline, no CTA | Reveal observer now runs inside the Suspense boundary (`App.jsx`) |
| 2 | Raw originals served (two 17–21 MB JPGs); optimized AVIF/WebP existed but was unused | Homepage 49.3 MB transfer | `Picture` component + manifest; originals moved to `assets-src/` |
| 3 | `hero.jpg`, `about-story.jpg` missing | Broken hero / About image | Mapped to existing photos (`goldenphoto5`, `candid`) |
| 4 | three.js r128 loaded from cdnjs/jsDelivr at runtime, no SRI | Supply-chain risk, blocks CSP, 3D fails if CDN blocked | Bundled via npm alias `three-r128`, lazy-loaded, pinned so its helpers don't import three 0.186 |
| 5 | Gmail app password committed to git history | Credential leak | **Needs you: rotate + scrub history** (see section 5) |
| 6 | No `vercel.json`: deep links 404, unknown URLs soft-404 | Broken shared links, bad SEO | Rewrites for old capitalised URLs, true 404 page, headers |
| 7 | Footer pushed 5,000 px down when lazy page mounted | CLS 0.5 on Home/Services/Contact | Full-height loading placeholder; CLS now <= 0.049 |
| 8 | Booking API: no limits, honeypot, rate limit; CR/LF could reach subject | Spam, header-injection risk | Hardened `api/bookings.js` (12/12 handler tests pass) |

## 2. Other fixes

- **Images:** responsive AVIF -> WebP with `srcset/sizes`, intrinsic width/height, LCP image eager + `fetchpriority=high`, everything else lazy. Alt text rewritten to describe what is actually in each photo (about half were wrong). Duplicate images removed from the social grid. `goldenphoto6` is a `.jpeg` (was requested as `.jpg` = 404). 3D scene textures use 600 px WebP instead of 7.5 MB of JPEGs.
- **CSS:** 1,075 -> ~600 lines (stylesheet was pasted twice). Contact cards no longer overflow at 320 px.
- **SEO:** per-route title/description/canonical/OG/Twitter, pre-rendered HTML shell per route + `404.html` (noindex), `robots.txt`, `sitemap.xml`, `Photographer` JSON-LD (only facts already on the site), BreadcrumbList on sub-pages, `og-image.jpg` (1200x630 JPEG), clean Instagram URL. FAQPage/Product schema intentionally not added (FAQ rich results are restricted; prices are not purchasable products).
- **Accessibility:** single `<main>`, one `<h1>` per page, skip link, visible focus, form labels/autocomplete, nav `aria-expanded`/`aria-current`, reduced-motion support (CSS + JS), Album autoplay respects it. Contrast: gradient headline stops were 1.66:1 worst case (7 of 12 under 3:1) -> now >= 4.09:1; white button labels were 2.3-2.9:1 -> now >= 4.5:1 (buttons are visibly darker; adjust `60%` in `index.css` if you want to tune it).
- **Content:** "Golden Shoot Photography" -> "Golden Photography". Placeholder testimonials and About stats (`sample: true`) are hidden in production builds.
- **Cleanup:** removed verified-dead `Hero/Moods/Packages` components, `Contactscene.js`, `Servicecontent.js`, Vite template assets, the `Client/` scaffold, unused `@react-three/*`, the unused MongoDB `Server` code (local `Server/` now wraps `api/`), and fixed `Server/Package.json` (capital P, ignored by npm on Linux).
- **Tooling:** `npm run images` (sharp) regenerates variants + manifest; `scripts/make-og-image.mjs`; ESLint config covers Node files. `npm audit fix` applied (0 vulnerabilities).

## 3. Measured results

| Metric | Before | After |
|---|---|---|
| Homepage transfer (cold) | 49.3 MB | ~0.8 MB (1.5 MB at 1366/1440 px) |
| About / Album transfer | 6.4 / 11.7 MB | ~0.5 / 0.6-0.9 MB |
| `dist` size | 61 MB | 13 MB |
| CLS Home / Services / Contact | 0.50 / 0.53 / 0.50 | 0.000 / <=0.049 / 0.000 |
| Lint | 16 errors | 0 errors (4 fast-refresh warnings) |
| Console errors | several | none (only sandbox GPU-driver notices) |
| npm audit | n/a | 0 vulnerabilities |

QA matrix: 6 routes x 5 viewports (320/390/768/1366/1440) = 30 runs, served with the real `vercel.json` security headers (CSP enforced): no horizontal overflow, no broken images, no failed requests, 1 `<h1>`/page, every image has alt, every form control labelled. Unknown route returns HTTP 404 with `noindex`. Both forms were submitted end-to-end against a mocked API (honeypot sent empty). All five 3D canvases were confirmed to draw pixels.

## 4. Not tested / caveats

- **Lighthouse / PageSpeed / real Core Web Vitals were not run.** LCP figures from my sandbox (0.1-1.5 s on localhost) are not representative of real devices or networks.
- Not tested on real Vercel (headers, rewrites and the 404 behaviour were emulated locally); not tested on real devices, Safari or Firefox; no screen-reader testing; no real email sent (mail transport stubbed).
- The in-memory rate limit is per serverless instance (best effort). Use Vercel WAF/Upstash for hard limits.
- `three` 0.186 and `three-r128` are both shipped (each lazy, ~145-150 KB gz) to keep every scene looking exactly as before. Porting the Services/Contact scenes to one three version would save one chunk but needs visual QA.

## 5. Actions only you can do

1. **Rotate the Gmail app password** and re-set `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `EMAIL_TO` in Vercel. The old value is in git history (commits `8015418`, `f22d915`, `2c64059`).
2. Scrub history (`git filter-repo --path my-react-app/Server/.env --invert-paths`) and force-push; `git rm -r --cached node_modules` at the repo root (about 1,885 tracked files).
3. Set `VITE_SITE_URL=https://your-domain` in Vercel (or rely on `VERCEL_PROJECT_PRODUCTION_URL`) so canonicals, OG URLs and the sitemap are generated. Submit `sitemap.xml` in Search Console.
4. Provide real testimonials/stats, then set `sample: false` in `src/Content.js`.
5. Album page (rebuilt, see section 6): you supplied the wedding-album PDF, so its pages are used publicly. Make sure the couple (Mayur & Shrisha) and the families shown have agreed to portfolio use.
6. Services page: the Basic package total says Rs 17,800 but the listed items sum to Rs 18,000. Confirm the intended figure.
7. Fonts: CSS names Playfair Display and Inter but never loads them (visitors see Georgia/Arial). Decide whether to self-host them.
8. The Album page now publishes the Pavan Plezer paper/extras price list and brochure styles at your request. Confirm those are the customer prices you want shown (see section 6).
9. Low-resolution sources: `emotion.jpg` (349 px wide) and the upside-down `goldenphoto4` are weak portfolio images; consider replacing them.

## 6. Round 2: Album page rebuilt (flipbook removed)

**Removed:** the old flip-book album (`Album.jsx`/`Album.css`, demo photos with made-up captions). The new page lives in `src/components/Album.jsx` + `Album.css`; all content (photos, prices, text) is in `src/albumData.js`.

**New page sections**
1. **Intro** with jump links.
2. **Signature Set** (your two product photos, switchable): Premium box, leather bag, calendar, 25 sheets of wavy glossy paper, high-quality premium look, **Rs 8,000/-**, with "Book this set" and a pre-filled WhatsApp enquiry.
3. **From a real wedding album:** 17 pages extracted from the album PDF (original 10800 px JPEGs, resized to 2400 px), chosen for strength and variety, with filters (All / Covers / Portraits / Rituals & Celebrations) and a full-screen viewer (native `<dialog>`: keyboard arrows, Esc, focus return, swipe-sideways on phones).
4. **Cover & box styles:** 8 pages from the brochure. Prices come from the style code using your own rule (middle digits x 100): SM110-01 Rs 11,000, SM70-02 Rs 7,000, SM60-04 Rs 6,000, AP35-02 Rs 3,500, FR28-01 Rs 2,800, UW22-03 Rs 2,200, TM16-02 Rs 1,600, OB10-10 Rs 1,000 (`src/pricing.js`, shared with `pricelist.jsx`, whose broken `PriceList.css` import casing is also fixed).
5. **Price guide** transcribed from the price list PDF (paper per sheet, extras, design services, size limit, courier and T&C notes).
6. **CTA** (book / WhatsApp / call). Home "View Album" links now go to `/album`; SEO title/description updated.

**Verified (headless Chromium, production build):** page renders with no console errors, no broken images, one `<h1>`, no horizontal overflow at 320-1440 px; filters give 17/3/10/4 items; lightbox arrows wrap, Esc closes and returns focus; thumbnails switch; regression sweep of 6 routes x 3 viewports clean; Album CSS does not affect the Home albums grid (class names are `ab-*`, Home keeps `.alb*`).

**Assumptions to confirm**
- Style prices follow the code rule from `pricelist.jsx`; the page says "Prices are per style" and does not state what a style includes.
- "Standard/Premium design Rs 80/100" have no unit in the PDF, so none is shown.
- Cover pages and spreads contain the real couple's names (it is their album).
- Brochure pages are the printer's catalogue images with their sample couples; make sure you may display them.
