import { useCallback, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import * as C from '../Content.js'
import { loadThree, startScene } from "./ServicesScene.js";
import { WhatsAppIcon } from './Icons.jsx'
import ServiceModal from './ServiceModal.jsx'
import { serviceSlug } from '../serviceSlug.js'

// har section ka rang-palette (sirf 3D lights ke liye, boxes/text solid rahenge)
const PALETTE = [
  ['#ff8a5c', '#ff5d8f', '#8b5cf6'],
  ['#22b8e6', '#4f7cff', '#9b6bff'],
  ['#1fcf9e', '#1aa7e0', '#6b7cff'],
  ['#ffb020', '#ff7a45', '#f0467a'],
]
const toRGB = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16))
const toHex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('')

const waLink = text => `https://wa.me/${C.CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

export default function ServicesPage() {
  const S = C.SERVICES_PAGE
  const [sp, setSp] = useSearchParams()
  const sel = S.items.find(x => serviceSlug(x.t) === sp.get('service'))
  const openService = x => setSp({ service: serviceSlug(x.t) })
  const closeService = useCallback(() => setSp({}, { replace: true }), [setSp])
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const hudRef = useRef(null)
  const vfRef = useRef(null)
  const flRef = useRef(null)
  const baRef = useRef(null)
  const rawRef = useRef(null)
  const hdRef = useRef(null)

  // 1) scroll tracking: HUD text, dots, 3D lights ka colour, 3D scene
  useEffect(() => {
    const root = rootRef.current
    const doc = document.documentElement
    const secs = [].slice.call(root.querySelectorAll('section'))
    const dl = [].slice.call(root.querySelectorAll('.dots a'))
    const hs = hudRef.current
    const shared = { d: secs[0].dataset, sp: 0, cur: PALETTE[0].map(toRGB) }
    let raf = 0, last = -1, dead = false, stopScene = () => {}

    const loop = () => {
      raf = requestAnimationFrame(loop)
      const hh = doc.scrollHeight - innerHeight
      const sy = hh > 0 ? scrollY / hh : 0
      shared.sp += (sy - shared.sp) * .07
      const mid = scrollY + innerHeight / 2
      let idx = 0
      secs.forEach((s, i) => { if (s.getBoundingClientRect().top + scrollY <= mid) idx = i })
      const d = secs[idx].dataset
      shared.d = d
      if (idx !== last) {
        last = idx
        hs.textContent = (d.n || '') + '  ƒ/' + (1.8 + idx * .6).toFixed(1) + '  1/' + (60 + idx * 45) + '  ISO ' + (100 + idx * 100)
        dl.forEach((a, k) => a.classList.toggle('on', d.k !== undefined && +d.k === k))
      }
      const pal = PALETTE[+d.p || 0]
      for (let c = 0; c < 3; c++) {
        const tgt = toRGB(pal[c])
        shared.cur[c] = shared.cur[c].map((v, j) => v + (tgt[j] - v) * .05)
        doc.style.setProperty('--g' + (c + 1), toHex(shared.cur[c]))
      }
    }
    loop()

    loadThree()
      .then(() => { if (!dead) stopScene = startScene(canvasRef.current, shared) })
      .catch(e => console.warn('three.js load nahi hua', e))

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      stopScene()
      ;['--g1', '--g2', '--g3'].forEach(p => doc.style.removeProperty(p))
    }
  }, [])

  // 2) Raw vs Edited slider
  useEffect(() => {
    const ba = baRef.current, raw = rawRef.current, hd = hdRef.current
    let idle = true, drag = false, raf = 0
    const setP = p => {
      p = Math.max(2, Math.min(98, p))
      raw.style.clipPath = `inset(0 ${100 - p}% 0 0)`
      hd.style.left = p + '%'
    }
    const mv = e => { const r = ba.getBoundingClientRect(); setP((e.clientX - r.left) / r.width * 100) }
    const down = e => { idle = false; drag = true; ba.setPointerCapture(e.pointerId); mv(e) }
    const move = e => { if (drag) mv(e) }
    const up = () => { drag = false }
    ba.addEventListener('pointerdown', down)
    ba.addEventListener('pointermove', move)
    ba.addEventListener('pointerup', up)
    ba.addEventListener('pointercancel', up)
    const sweep = () => {
      if (!idle) return
      setP(50 + 32 * Math.sin(performance.now() / 1300))
      raf = requestAnimationFrame(sweep)
    }
    sweep()
    return () => {
      cancelAnimationFrame(raf)
      ba.removeEventListener('pointerdown', down)
      ba.removeEventListener('pointermove', move)
      ba.removeEventListener('pointerup', up)
      ba.removeEventListener('pointercancel', up)
    }
  }, [])

  // 3) viewfinder cursor + shutter flash (sirf mouse par)
  useEffect(() => {
    const root = rootRef.current, vf = vfRef.current, fl = flRef.current
    let tm = 0, cursorRaf = 0
    let targetX = 0, targetY = 0, cursorX = 0, cursorY = 0

    const hideCursor = () => {
      document.body.classList.remove('vfo')
      vf.classList.remove('lock', 'click')
      cancelAnimationFrame(cursorRaf)
      cursorRaf = 0
    }
    const follow = () => {
      cursorX += (targetX - cursorX) * .24
      cursorY += (targetY - cursorY) * .24
      vf.style.left = `${cursorX - 30}px`
      vf.style.top = `${cursorY - 30}px`
      vf.style.width = '60px'
      vf.style.height = '60px'
      if (Math.abs(targetX - cursorX) > .1 || Math.abs(targetY - cursorY) > .1) {
        cursorRaf = requestAnimationFrame(follow)
      } else cursorRaf = 0
    }
    const pm = e => {
      if (e.pointerType !== 'mouse' || !root?.contains(e.target)) {
        hideCursor()
        return
      }
      document.body.classList.add('vfo')
      const t = e.target.closest?.('a,button,input,textarea,select,[role="button"],.ba,.rcard')
      if (t) {
        cancelAnimationFrame(cursorRaf)
        cursorRaf = 0
        const r = t.getBoundingClientRect()
        vf.style.cssText = `left:${r.left - 8}px;top:${r.top - 8}px;width:${r.width + 16}px;height:${r.height + 16}px`
        vf.classList.add('lock')
      } else {
        vf.classList.remove('lock')
        targetX = e.clientX
        targetY = e.clientY
        if (!cursorRaf) {
          cursorX = cursorX || targetX
          cursorY = cursorY || targetY
          cursorRaf = requestAnimationFrame(follow)
        }
      }
    }
    const pd = e => {
      if (e.pointerType !== 'mouse' || !root?.contains(e.target)) return
      vf.classList.add('click')
      fl.classList.add('go')
      clearTimeout(tm)
      tm = setTimeout(() => {
        vf.classList.remove('click')
        fl.classList.remove('go')
      }, 160)
    }
    const pl = e => {
      if (e.pointerType === 'mouse') hideCursor()
    }
    addEventListener('pointermove', pm)
    addEventListener('pointerdown', pd)
    root?.addEventListener('pointerleave', pl)
    return () => {
      removeEventListener('pointermove', pm)
      removeEventListener('pointerdown', pd)
      root?.removeEventListener('pointerleave', pl)
      cancelAnimationFrame(cursorRaf)
      clearTimeout(tm)
      hideCursor()
    }
  }, [])

  return (
    <div className="svp" ref={rootRef}>
      <canvas className="svp-canvas" ref={canvasRef} />
      <div className="grain" />
      <div className="vf" ref={vfRef}><i /><i /><i /><i /></div>
      <div className="fl" ref={flRef} />
      <div className="hud"><span ref={hudRef} /></div>

      {sel && <ServiceModal s={sel} onClose={closeService} />}

      {/* Intro */}
      <section id="top" data-n="Intro" data-p="0" data-prop="cam" data-cx="2.5" data-cy="0" data-cs="1" data-cz="0">
        <div className="rv">
          <h1>{S.title}</h1>
          <p className="sub">{S.sub}</p>
          <div className="btns">
            <a className="pill" href="#all">See our services</a>
            <Link className="lnk" to="/contact">Book a shoot</Link>
          </div>
        </div>
        <div className="hint">{S.hint}</div>
      </section>

      {/* Sab services ek ke baad ek, horizontal cards */}
      <section className="sec rail-sec" id="all" data-n="Services" data-p="1" data-prop="cam">
        <div className="rail-wrap rv">
          <div className="rail" role="list" aria-label="Services">
            {S.items.map((s, k) => {
              const priced = s.price && s.price !== 'Price on request'
              return (
                <article className="rcard" role="listitem" key={s.t}>
                  <span className="n">{String(k + 1).padStart(2, '0')}</span>
                  <h3>{s.t}</h3>
                  <p className="tg">{s.g}</p>
                  <p className={`rp${priced ? '' : ' ask'}`}>{s.price}{s.priceNote ? <small>{s.priceNote}</small> : null}</p>
                  <ul>{(s.hi || []).slice(0, 3).map(x => <li key={x}>{x}</li>)}</ul>
                  <div className="ra">
                    <button type="button" className="lnk dbtn" onClick={() => openService(s)}>Details</button>
                    <a className="wa-mini" href={waLink(`Hi, I'd like to know about ${s.t}.`)} target="_blank" rel="noreferrer">
                      <WhatsAppIcon size={16} /> WhatsApp
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Raw vs Edited */}
      <section className="sec center" data-n="Editing" data-p="3" data-prop="cam">
        <div className="rv">
          <h2>{S.edit.title}</h2>
          <p style={{ maxWidth: 460, margin: '10px auto 0' }}>{S.edit.sub}</p>
        </div>
        <div className="ba rv" ref={baRef}>
          <div className="scn"><div className="sun" /><div className="hill1" /><div className="hill2" /><div className="fig"><b /><b className="b2" /></div></div>
          <div className="raw" ref={rawRef}>
            <div className="scn"><div className="sun" /><div className="hill1" /><div className="hill2" /><div className="fig"><b /><b className="b2" /></div></div>
          </div>
          <span className="lb" style={{ left: 12 }}>Raw</span>
          <span className="lb" style={{ right: 12 }}>Edited</span>
          <div className="hd" ref={hdRef} />
        </div>
        <p className="rv fine">{S.edit.chips.join(' · ')}</p>
      </section>

      {/* Process: yeh sach me sequence hai, isliye numbers rakhe */}
      <section className="sec center" data-n="Process" data-p="2" data-prop="cam">
        <div className="rv" style={{ marginBottom: 40 }}>
          <h2>{S.process.title}</h2>
        </div>
        <div className="strip rv">
          {S.process.steps.map((p, i) => (
            <div className="fr" key={p.t}><i>{i + 1}</i><h3>{p.t}</h3><p>{p.d}</p></div>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section className="cta" id="contact" data-n="Booking" data-p="1" data-prop="cam">
        <div className="rv">
          <h2>Not sure which service you need?</h2>
          <p style={{ maxWidth: 440, margin: '12px auto 26px' }}>Tell us the occasion and the date. We'll tell you what we'd recommend.</p>
          <div className="btns" style={{ justifyContent: 'center' }}>
            <Link className="pill" to="/contact">Book a shoot</Link>
            <a className="lnk" href={`tel:${C.CONTACT.call}`}>Call us</a>
            <a className="lnk wa-lnk" href={waLink(C.CONTACT.waText)} target="_blank" rel="noreferrer"><WhatsAppIcon size={15} /> WhatsApp</a>
          </div>
        </div>
      </section>
    </div>
  )
}