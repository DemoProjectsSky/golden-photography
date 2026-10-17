import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../images.js'
import * as C from '../Content.js'

export const tilt = e => {
  const el = e.currentTarget, r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`
}
export const untilt = e => { e.currentTarget.style.transform = '' }
const delay = i => ({ transitionDelay: `${i * 0.08}s` })

export function Photo({ img, className = '' }) {
  const [bad, setBad] = useState(false)
  return (
    <div className={`ph ${className}`}>
      {bad
        ? <span className="ph-note">Add photo: {img.src}</span>
        : <img src={img.src} alt={img.alt} loading="lazy" onError={() => setBad(true)} />}
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" data-p="0" id="home" data-cx="2.5" data-cy="0" data-cs="1" data-cz="0">
      <div className="rv">
        <div className="eyebrow">{C.HERO.label}</div>
        <h1>Your Story,<br /><span className="gt">Beautifully Captured.</span> </h1>
        <p className="sub">{C.HERO.sub}</p>
        <div className="btns">
          <Link className="pill" to="/album">View Albums</Link>
          <Link className="pill ghost" to="/contact">Book a Shoot</Link>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="sec" id="about" data-p="2">
      <div className="two">
        <div className="rv"><Photo img={IMG.about} className="r45" /></div>
        <div className="rv">
          <div className="lbl">{C.ABOUT.label}</div>
          <h2 className="gt">{C.ABOUT.title}</h2>
          <p>{C.ABOUT.p1}</p>
          <p>{C.ABOUT.p2}</p>
          <Link className="pill" to="/about">{C.ABOUT.btn}</Link>
        </div>
      </div>
    </section>
  )
}

export function Albums() {
  return (
    <section className="sec" id="albums" data-p="3">
      <div className="head rv"><h2 className="h2s gt">{C.ALBUMS.title}</h2><p>{C.ALBUMS.sub}</p></div>
      <div className="alb-grid">
        {C.ALBUMS.items.map((a, i) => (
          <div className="rv" style={delay(i)} key={a.t}>
            <div className="alb" onMouseMove={tilt} onMouseLeave={untilt}>
              <Photo img={IMG.albums[i]} className="r34" />
              <h3>{a.t}</h3><p>{a.d}</p>
              <a href="#gallery">View Album →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section className="sec" id="services" data-p="1">
      <div className="head rv"><h2 className="h2s gt">{C.SERVICES.title}</h2><p>{C.SERVICES.sub}</p></div>
      <div className="svc-grid">
        {C.SERVICES.items.map((s, i) => (
          <div className="rv" style={delay(i)} key={s.t}>
            <div className="svc-card" onMouseMove={tilt} onMouseLeave={untilt}>
              <b className="gt">{String(i + 1).padStart(2, '0')}</b>
              <h3>{s.t}</h3><p>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rv" style={{ marginTop: 40 }}>
        <Link className="pill" to="/servicespage">{C.SERVICES.btn}</Link>
      </div>
    </section>
  )
}

export function Quote() {
  return (
    <section className="quote" data-p="0">
      <Photo img={IMG.quote} />
      <div className="in rv"><h2>{C.QUOTE.title}</h2><p>{C.QUOTE.sub}</p></div>
    </section>
  )
}

export function WhyUs() {
  return (
    <section className="sec" id="why" data-p="2">
      <div className="two">
        <div className="rv">
          <h2 className="h2s gt">{C.WHY.title}</h2>
          <p>{C.WHY.sub}</p>
          {C.WHY.items.map((w, i) => (
            <div className="pt" key={w.t}>
              <i className="gt">{String(i + 1).padStart(2, '0')}</i>
              <div><h3>{w.t}</h3><p>{w.d}</p></div>
            </div>
          ))}
        </div>
        <div className="rv"><Photo img={IMG.why} className="r45" /></div>
      </div>
    </section>
  )
}

export function Gallery() {
  return (
    <section className="sec" id="gallery" data-p="3">
      <div className="head rv"><h2 className="h2s gt">{C.GALLERY.title}</h2><p>{C.GALLERY.sub}</p></div>
      <div className="gal">
        {IMG.gallery.map((g, i) => (
          <div className="rv" style={delay(i % 3)} key={g.src}><Photo img={g} className={g.r} /></div>
        ))}
      </div>
      <div className="rv" style={{ marginTop: 40 }}><a className="pill" href="#albums">{C.GALLERY.btn}</a></div>
    </section>
  )
}

export function Testimonials() {
  const T = C.TESTIMONIALS
  return (
    <section className="sec" id="reviews" data-p="1">
      <div className="head rv">
        <h2 className="h2s gt">{T.title}</h2><p>{T.sub}</p>
        {T.sample && <small className="note">Sample reviews — replace with real client feedback</small>}
      </div>
      <div className="svc-grid t3">
        {T.items.map((t, i) => (
          <div className="rv" style={delay(i)} key={t.n}>
            <div className="svc-card" onMouseMove={tilt} onMouseLeave={untilt}>
              <p className="tq">“{t.q}”</p><b>— {t.n}</b>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Social() {
  return (
    <section className="sec center" id="social" data-p="0">
      <div className="head rv center"><h2 className="h2s gt">{C.SOCIAL.title}</h2><p>{C.SOCIAL.sub}</p></div>
      <div className="soc">
        {IMG.social.map((s, i) => (
          <div className="rv" style={delay(i % 3)} key={s.src}><Photo img={s} className="r11" /></div>
        ))}
      </div>
      <div className="rv" style={{ marginTop: 36 }}>
        <a className="pill" href={C.SOCIAL.instagram} target="_blank" rel="noreferrer">{C.SOCIAL.btn}</a>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="quote cta" data-p="2">
      <Photo img={IMG.cta} />
      <div className="in rv">
        <h2>{C.CTA.title}</h2><p>{C.CTA.sub}</p>
        <div className="btns" style={{ justifyContent: 'center', marginTop: 28 }}>
          <Link className="pill" to="/contact">Book a Shoot</Link>
          <a className="pill ghost light" href="#footer">Contact Us</a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const F = C.FOOTER
  const links = [
    ['Home', '/'],
    ['Albums', '/album'],
    ['About', '/about'],
    ['Services', '/servicespage'],
    ['Contact', '/contact'],
  ]
  return (
    <footer className="site" id="footer">
      <div className="fgrid">
        <div><div className="logo">{C.STUDIO}</div><p>{F.tagline}</p></div>
        <div>
          <h4>Quick Links</h4>
          {links.map(([n, h]) => <Link key={n} to={h}>{n}</Link>)}
        </div>
        <div>
          <h4>Services</h4>
          {C.SERVICES.items.map(s => (
            <Link key={s.t} to="/servicespage">
              {s.t.toLowerCase().replace(/\b\w/g, ch => ch.toUpperCase())}
            </Link>
          ))}
        </div>
        <div><h4>Contact</h4><span>{F.phone}</span><span>{F.email}</span><span>{F.location}</span></div>
        <div>
          <h4>Social</h4>
          {F.social.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noreferrer">{n}</a>)}
        </div>
      </div>
      <div className="copy">© 2026 {C.BRAND}. All Rights Reserved.</div>
    </footer>
  )
}