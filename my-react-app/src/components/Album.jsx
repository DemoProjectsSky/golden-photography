import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as C from '../Content.js'
import Picture from './Picture.jsx'
import { ALBUM_INTRO, SIGNATURE, SPREADS, SPREAD_FILTERS, STYLES, PRICE_GUIDE } from '../albumData.js'
import { priceFromCode, inr } from '../pricing.js'
import './Album.css'

const waLink = text => `https://wa.me/${C.CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

// ---------------------------------------------------------------------------
// Full-screen viewer built on the native <dialog>: focus trap, Esc to close and
// focus restore come from the browser. Arrow keys and buttons move between photos.
// ---------------------------------------------------------------------------
function Lightbox({ items, index, onClose, onMove }) {
  const ref = useRef(null)
  const item = index === null ? null : items[index]

  useEffect(() => {
    const d = ref.current
    if (!d) return undefined
    if (index === null) {
      if (d.open) d.close()
      return undefined
    }
    if (!d.open) d.showModal()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [index])

  const onKey = e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); onMove(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); onMove(-1) }
  }

  return (
    <dialog
      ref={ref}
      className="ab-lb"
      aria-label="Album photo viewer"
      onClose={onClose}
      onKeyDown={onKey}
      onClick={e => { if (e.target === ref.current) onClose() }}
    >
      {item && (
        <div className="ab-lb-in">
          <button type="button" className="ab-lb-x" onClick={onClose} aria-label="Close viewer">×</button>
          <div className="ab-lb-img">
            <Picture src={item.src} alt={item.alt} sizes="100vw" priority />
          </div>
          <div className="ab-lb-bar">
            <button type="button" onClick={() => onMove(-1)} aria-label="Previous photo">←</button>
            <p><b>{item.title}</b><span>{index + 1} / {items.length}</span></p>
            <button type="button" onClick={() => onMove(1)} aria-label="Next photo">→</button>
          </div>
          <p className="ab-lb-hint">Swipe sideways to see the full page</p>
        </div>
      )}
    </dialog>
  )
}

function PriceTable({ title, unit = '', rows, extra }) {
  return (
    <div className="ab-pt">
      <h3>{title}</h3>
      <table>
        <tbody>
          {rows.map(([n, p]) => (
            <tr key={n}><th scope="row">{n}</th><td>{inr(p)}{unit}</td></tr>
          ))}
          {extra && extra.map(([n, p]) => (
            <tr key={n} className="ab-pt-extra"><th scope="row">{n}</th><td>+{inr(p)}{unit}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Album() {
  const [shot, setShot] = useState(0)
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)

  const visible = filter === 'All' ? SPREADS : SPREADS.filter(s => s.cat === filter)
  const move = useCallback(d => setOpen(i => (i === null ? i : (i + d + visible.length) % visible.length)), [visible.length])

  const styles = STYLES.map(s => ({ ...s, ...priceFromCode(s.code) })).sort((a, b) => b.price - a.price)
  const P = PRICE_GUIDE

  return (
    <div className="ab">
      {/* ---------- Intro ---------- */}
      <section className="sec ab-hero">
        <div className="rv">
          <div className="eyebrow">{ALBUM_INTRO.eyebrow}</div>
          <h1>Albums made to be <span className="gt">held</span>, not just viewed.</h1>
          <p className="sub">{ALBUM_INTRO.sub}</p>
          <div className="btns">
            <a className="pill" href="#signature">The Signature Set</a>
            <a className="pill ghost" href="#work">Our album work</a>
            <a className="pill ghost" href="#prices">Price guide</a>
          </div>
        </div>
      </section>

      {/* ---------- Signature set ---------- */}
      <section className="sec ab-sig" id="signature" aria-labelledby="sig-h">
        <div className="ab-sig-grid">
          <div className="ab-sig-media rv">
            <div className="ab-sig-main">
              <Picture
                key={SIGNATURE.images[shot].src}
                src={SIGNATURE.images[shot].src}
                alt={SIGNATURE.images[shot].alt}
                sizes="(min-width: 900px) 48vw, 100vw"
              />
            </div>
            <div className="ab-sig-thumbs" role="group" aria-label="Signature set photos">
              {SIGNATURE.images.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  aria-pressed={i === shot}
                  aria-label={`Show photo ${i + 1} of ${SIGNATURE.images.length}`}
                  onClick={() => setShot(i)}
                >
                  <Picture src={im.src} alt="" sizes="120px" />
                </button>
              ))}
            </div>
          </div>

          <div className="ab-sig-info rv">
            <span className="ab-badge">{SIGNATURE.badge}</span>
            <h2 id="sig-h">{SIGNATURE.title}</h2>
            <p className="ab-sig-blurb">{SIGNATURE.blurb}</p>
            <div className="ab-sig-price">
              <b>{inr(SIGNATURE.price)}/-</b>
              <span>{SIGNATURE.priceNote}</span>
            </div>
            <ul className="ab-ticks">
              {SIGNATURE.includes.map(t => <li key={t}>{t}</li>)}
            </ul>
            <div className="btns">
              <Link className="pill" to="/contact">Book this set</Link>
              <a
                className="pill ghost"
                href={waLink(`Hi ${C.BRAND}, I am interested in the Signature Album Set (${inr(SIGNATURE.price)}). Please share the details.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>
            <small className="ab-fine">{SIGNATURE.note}</small>
          </div>
        </div>
      </section>

      {/* ---------- Album work ---------- */}
      <section className="sec ab-work" id="work" aria-labelledby="work-h">
        <div className="head rv">
          <h2 className="h2s gt" id="work-h">From a real wedding album</h2>
          <p>Pages from a finished album, designed and printed by us. Tap any page to see it full size.</p>
        </div>

        <div className="ab-chips" role="group" aria-label="Filter album pages">
          {SPREAD_FILTERS.map(f => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => { setFilter(f); setOpen(null) }}>{f}</button>
          ))}
        </div>

        <ul className="ab-grid" key={filter}>
          {visible.map((s, i) => (
            <li key={s.id} className={`ab-item ${s.layout}`} style={{ '--i': i }}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`View larger: ${s.title}`}>
                <span className="ab-frame">
                  <Picture
                    src={s.src}
                    alt={s.alt}
                    sizes={s.layout === 'wide' ? '(min-width: 1200px) 1100px, 92vw' : '(min-width: 900px) 30vw, 92vw'}
                  />
                </span>
                <span className="ab-cap"><b>{s.title}</b><i>{s.cat}</i></span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Cover & box styles ---------- */}
      <section className="sec ab-styles" id="styles" aria-labelledby="styles-h">
        <div className="head rv">
          <h2 className="h2s gt" id="styles-h">Cover &amp; box styles</h2>
          <p>Pick the finish that suits your story. Each style has a code, and the price is shown on the card.</p>
        </div>
        <ul className="ab-style-grid">
          {styles.map(s => (
            <li key={s.code} className="ab-style">
              <div className="ab-style-img">
                <Picture src={s.src} alt={s.alt} sizes="(min-width: 1100px) 22vw, (min-width: 700px) 45vw, 92vw" />
              </div>
              <div className="ab-style-body">
                <div>
                  <h3>{s.name}</h3>
                  <span className="ab-code">Style {s.code}</span>
                </div>
                <b className="ab-style-price">{inr(s.price)}</b>
              </div>
            </li>
          ))}
        </ul>
        <p className="ab-fine ab-style-note">Prices are per style. Paper sheets and extras are listed below. Courier charges extra, as applicable.</p>
      </section>

      {/* ---------- Price guide ---------- */}
      <section className="sec ab-prices" id="prices" aria-labelledby="prices-h">
        <div className="head rv">
          <h2 className="h2s gt" id="prices-h">Paper, extras &amp; design: price guide</h2>
          <p>Build your album your way. Choose a paper, add the finishing touches, and we handle the design.</p>
        </div>
        <div className="ab-pgrid">
          <PriceTable title={P.paper.title} unit={P.paper.unit} rows={P.paper.items} extra={P.paper.extras} />
          <div className="ab-pstack">
            <PriceTable title={P.add.title} rows={P.add.items} />
            <PriceTable title={P.design.title} rows={P.design.items} />
          </div>
        </div>
        <ul className="ab-notes">
          {P.notes.map(n => <li key={n}>{n}</li>)}
        </ul>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="sec ab-cta">
        <div className="ab-cta-box rv">
          <h2>Ready to design your album?</h2>
          <p>Tell us about your wedding and we will suggest the right album, paper and box.</p>
          <div className="btns">
            <Link className="pill" to="/contact">Book a Shoot</Link>
            <a
              className="pill ghost"
              href={waLink(`Hi ${C.BRAND}, I would like to know more about your albums and prices.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
            <a className="pill ghost" href={`tel:${C.CONTACT.call}`}>Call us</a>
          </div>
        </div>
      </section>

      <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onMove={move} />
    </div>
  )
}
