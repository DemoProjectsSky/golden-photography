import { useEffect, useMemo, useRef, useState } from 'react'
import './Album.css'

// public/images/ me tumhari photos
const IMGS = [
  '/images/goldenphoto1.jpg',
  '/images/goldenphoto2.jpg',
  '/images/goldenphoto3.jpg',
  '/images/goldenphoto4.jpg',
  '/images/goldenphoto5.jpg',
  '/images/goldenphoto6.jpeg',
  '/images/goldenphoto7.jpg',
]

// k = image index, w/h = size (em), r = tilt (deg), cap = handwritten caption
function Ph({ k, w, h, r = 0, cap }) {
  return (
    <div className="ph" style={{ width: `${w}em`, height: `${h}em`, '--r': `${r}deg` }}>
      <img src={IMGS[k % IMGS.length]} alt={cap || 'album photo'} loading="lazy" />
      {cap && <i>{cap}</i>}
    </div>
  )
}
const Pg = ({ children }) => <div className="pg">{children}</div>

/*
  Har leaf = [cover-class, front page, back page]  →  1 leaf = 2 pages.
  Abhi 7 leaves = 14 pages. Aur pages chahiye? Bas ek aur [ '', <Pg>…</Pg>, <Pg>…</Pg> ] add kar do.
*/
const LEAVES = [
  // pages 1-2
  [
    'cv',
    <div className="pg">
      <small>PHOTOGRAPHY ALBUM</small>
      <div className="sun" />
      <h1>Golden<br />Hours</h1>
      <small>VOL. 01 · 2026</small>
    </div>,
    <Pg>
      <h2>Introduction</h2>
      <p>An attempt to capture the magic of light — one story in every frame.</p>
      <Ph k={0} w={17} h={14} r={-3} cap="Sunset, 6:42 pm" />
    </Pg>,
  ],
  // pages 3-4
  [
    '',
    <Pg><Ph k={1} w={23} h={17} r={-1.5} cap="First light" /><p>Dawn · Nashik</p></Pg>,
    <Pg><Ph k={2} w={16} h={11} r={3} cap="Blue hour" /><Ph k={3} w={16} h={11} r={-2.5} cap="Fields in sunlight" /></Pg>,
  ],
  // pages 5-6
  [
    '',
    <Pg>
      <div className="grid">
        <Ph k={4} w={11.5} h={9} r={-2} /><Ph k={5} w={11.5} h={9} r={2} />
        <Ph k={6} w={11.5} h={9} r={1.5} /><Ph k={2} w={11.5} h={9} r={-1.5} />
      </div>
    </Pg>,
    <Pg><Ph k={1} w={19} h={26} r={2} cap="Golden hour" /></Pg>,
  ],
  // pages 7-8
  [
    '',
    <Pg><Ph k={3} w={20} h={13} r={-2} cap="Golden evening" /><Ph k={5} w={15} h={10} r={3} cap="By the sea" /></Pg>,
    <Pg><blockquote>“Every photograph is a memory that time tried to take away.”</blockquote></Pg>,
  ],
  // pages 9-10
  [
    '',
    <Pg><small>CHAPTER 02</small><h2>Blue Hour</h2><Ph k={4} w={22} h={15} r={-1.5} cap="The colour before night" /></Pg>,
    <Pg><Ph k={2} w={14} h={9} r={2} /><Ph k={4} w={14} h={9} r={-2} /><Ph k={6} w={14} h={9} r={1.5} /></Pg>,
  ],
  // pages 11-12
  [
    '',
    <Pg><Ph k={5} w={23} h={12} r={-1} cap="The shoreline" /><p>The sound of waves and a setting sun.</p><Ph k={3} w={14} h={9} r={2} /></Pg>,
    <Pg><Ph k={0} w={18} h={22} r={-2} cap="A quiet evening" /><p>Some frames are simply felt.</p></Pg>,
  ],
  // pages 13-14
  [
    '',
    <Pg><Ph k={6} w={23} h={18} r={1.5} cap="Last light" /><p>The light fades, the memories remain.</p></Pg>,
    <Pg><div className="sun sm" /><h2>Thank You</h2><p>More stories coming soon.</p></Pg>,
  ],
]
const N = LEAVES.length
const TOTAL_PAGES = N * 2

export default function Album() {
  const [idx, setIdx] = useState(0)
  const [moving, setMoving] = useState(-1)
  const auto = useRef(true)
  const mvT = useRef(0)
  const tiltRef = useRef(null)
  const secRef = useRef(null)
  const dust = useMemo(
    () => Array.from({ length: 22 }, () => ({
      left: Math.random() * 100, top: 55 + Math.random() * 45,
      x: Math.random() * 120 - 60, d: 6 + Math.random() * 8, delay: Math.random() * 10,
    })), [])

  const go = (d) => {
    setIdx((cur) => {
      const nx = Math.max(0, Math.min(N, cur + d))
      if (nx !== cur) {
        setMoving(d > 0 ? cur : cur - 1)
        clearTimeout(mvT.current)
        mvT.current = setTimeout(() => setMoving(-1), 1300)
      }
      return nx
    })
  }
  const user = (d) => { auto.current = false; go(d) }

  // autoplay demo: user kuch bhi kare to ruk jata hai (nahi chahiye to is useEffect ko hata do)
  useEffect(() => {
    const iv = setInterval(() => { if (auto.current) go(1) }, 2800)
    const first = setTimeout(() => { if (auto.current) go(1) }, 900)
    return () => { clearInterval(iv); clearTimeout(first); clearTimeout(mvT.current) }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') user(1)
      if (e.key === 'ArrowLeft') user(-1)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  const tilt = (x, y) => {
    if (tiltRef.current) tiltRef.current.style.transform = `rotateX(${14 - y * 10}deg) rotateY(${x * 14}deg)`
  }
  useEffect(() => tilt(0, 0), [])

  // poori website pe: screen ke left half me click = pichla page, right half me click = agla page
  const onPageClick = (e) => {
    if (e.target.closest('button')) return // prev/next buttons ka apna handler hai
    user(e.clientX < innerWidth / 2 ? -1 : 1)
  }

  // mouse move: book tilt + cursor arrow (left/right) dikhao
  const onPageMove = (e) => {
    tilt(e.clientX / innerWidth - 0.5, e.clientY / innerHeight - 0.5)
    if (secRef.current) secRef.current.dataset.side = e.clientX < innerWidth / 2 ? 'l' : 'r'
  }

  const shift = idx === 0 ? -0.375 : idx === N ? 0.375 : 0
  const label = idx === 0 ? 'Cover' : idx === N ? 'The End' : `Pages ${idx * 2} – ${idx * 2 + 1}`

  /* data-p = Scene3D ka colour palette (0 orange-pink-purple, 1 cyan-blue-violet, 2 green-teal, 3 amber-orange-rose).
     Heading + glow isi palette se color lete hain, to camera scene ke saath hamesha match karenge. */
  return (
    <section className="album-page" data-p="3" ref={secRef}
      onMouseMove={onPageMove} onClick={onPageClick}>
      <div className="dust">
        {dust.map((p, i) => (
          <span key={i} style={{ left: `${p.left}%`, top: `${p.top}%`, '--x': `${p.x}px`, '--d': `${p.d}s`, animationDelay: `-${p.delay}s` }} />
        ))}
      </div>

      <div className="album-head">
        <div className="eyebrow">Portfolio</div>
        <h1>My <span className="grad">Album</span></h1>
        <div className="rule" />
        <p>A curated collection of timeless moments, beautifully captured. </p>
      </div>

      <div className="stage">
        <div className="tilt" ref={tiltRef}>
          <div className="slide" style={{ transform: `translateX(calc(var(--H) * ${shift}))` }}>
            <div className="shadow" />
            <div className="book">
              <div className="base" />
              {LEAVES.map(([cls, front, back], i) => {
                const flipped = i < idx
                const z = moving === i ? 100 : flipped ? i + 1 : N - i
                return (
                  <div key={i} className={`leaf${flipped ? ' f' : ''}${moving === i ? ' fl' : ''}`} style={{ zIndex: z }}>
                    <div className={`face ${cls}`}>
                      {front}
                      {i > 0 && <em className="pn r">{i * 2 + 1}</em>}
                    </div>
                    <div className="face b">
                      {back}
                      <em className="pn l">{i * 2 + 2}</em>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="ui">
        <button onClick={() => user(-1)} disabled={idx === 0} aria-label="Previous page">‹</button>
        <span className="lb">{label}</span>
        <button onClick={() => user(1)} disabled={idx === N} aria-label="Next page">›</button>
      </div>
    </section>
  )
}