import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../images.js'
import * as C from '../Content.js'
import { Photo, CTA, tilt, untilt } from './Homesections.jsx'

const delay = i => ({ transitionDelay: `${i * 0.08}s` })

// 1) Parallax: photo scroll ke saath halka sa upar-neeche sarakta hai
function useParallax(speed) {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const upd = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--py', `${(r.top + r.height / 2 - innerHeight / 2) * -speed}px`)
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd) }
    upd()
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [speed])
  return ref
}

// 2) Word-by-word heading reveal ("~word" = gradient word)
function Words({ text, as: Tag = 'h2' }) {
  return (
    <Tag className="wr">
      {text.split(' ').map((w, i) => {
        const g = w.startsWith('~')
        return (
          <span className="w" key={i}>
            <span className={g ? 'gt' : ''} style={{ transitionDelay: `${i * 0.09}s` }}>{g ? w.slice(1) : w}</span>
          </span>
        )
      })}
    </Tag>
  )
}

// 3) Count-up numbers
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf = 0, started = false
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return
      started = true
      const t0 = performance.now()
      const tick = now => {
        const p = Math.min((now - t0) / 1600, 1)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

// 4) Scroll pe ban-ti hui timeline line
function Timeline({ steps }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const upd = () => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height)))
    }
    upd()
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd)
    return () => { removeEventListener('scroll', upd); removeEventListener('resize', upd) }
  }, [])
  return (
    <div className="tl" ref={ref}>
      {steps.map(s => (
        <div className="step" key={s.n}><i className="gt">{s.n}</i><h3>{s.t}</h3><p>{s.d}</p></div>
      ))}
    </div>
  )
}

export default function AboutPage() {
  const A = C.ABOUT_PAGE
  const storyRef = useParallax(0.1)
  const bannerRef = useParallax(0.16)
  return (
    <>
      <section className="hero" data-p="0" data-cx="2.5" data-cy="0" data-cs="1" data-cz="0">
        <div className="rv">
          <div className="eyebrow">{A.label}</div>
          <Words as="h1" text={A.title} />
          <p className="sub">{A.sub}</p>
          <div className="btns">
            <Link className="pill" to="/#book">Book a Shoot</Link>
            <Link className="pill ghost" to="/Album">View Albums</Link>
          </div>
        </div>
      </section>

      {/* 5) Infinite marquee */}
      <div className="marq" aria-hidden="true">
        <div className="track">
          {[0, 1].map(k => (
            <div className="grp" key={k}>
              {A.marquee.concat(A.marquee).map((m, i) => <span key={i}>{m}<em>◆</em></span>)}
            </div>
          ))}
        </div>
      </div>

      <section className="sec" data-p="2">
        <div className="two">
          <div className="cr par" ref={storyRef}><Photo img={IMG.aboutPage.story} className="r45" /></div>
          <div className="rv">
            <div className="lbl">{A.story.label}</div>
            <Words text={A.story.title} />
            <p>{A.story.p1}</p>
            <p>{A.story.p2}</p>
          </div>
        </div>
      </section>

      <section className="sec" data-p="3">
        <div className="stats-row">
          {A.stats.items.map((s, i) => (
            <div className="rv" style={delay(i)} key={s.l}>
              <b className="gt"><Counter to={s.n} suffix={s.s} /></b><span>{s.l}</span>
            </div>
          ))}
        </div>
        {A.stats.sample && <small className="note center">Sample figures — replace with your real numbers</small>}
      </section>

      <section className="sec" data-p="1">
        <div className="head rv"><h2 className="h2s gt">{A.values.title}</h2><p>{A.values.sub}</p></div>
        <div className="svc-grid">
          {A.values.items.map((v, i) => (
            <div className="rv" style={delay(i)} key={v.t}>
              <div className="svc-card" onMouseMove={tilt} onMouseLeave={untilt}>
                <b className="gt">{String(i + 1).padStart(2, '0')}</b>
                <h3>{v.t}</h3><p>{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="quote banner" data-p="0">
        <div className="par" ref={bannerRef}><Photo img={IMG.aboutPage.wide} /></div>
        <div className="in rv"><h2>{A.banner}</h2></div>
      </section>

      <section className="sec" data-p="2">
        <div className="head center rv"><h2 className="h2s gt">{A.process.title}</h2><p>{A.process.sub}</p></div>
        <Timeline steps={A.process.steps} />
      </section>

      <CTA />
    </>
  )
}