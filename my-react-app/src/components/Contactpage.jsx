import { useEffect, useRef, useState } from 'react'
import * as C from '../Content.js'
import { loadThree } from './Servicesscene.js'

// Default contact page content
const DEFAULT_P = {
  title: "Let's talk about your day.",
  sub: "Tell us the occasion and the date. We'll tell you what we'd recommend.",
  hint: 'MOVE YOUR MOUSE TO TILT THE SCENE',
  formTitle: 'Book a shoot',
  formSub: "Fill this in and we'll get back to you.",
  endpoint: '',
  faqTitle: 'Before you write',
  faq: [
    {
      q: 'How early should I book?',
      a: "As early as you can, especially for wedding dates. Send us your date and we'll let you know if we're free."
    },
    {
      q: 'What should I put in my enquiry?',
      a: 'The date, the venue or city, and the kind of shoot you want. A line about your style or ideas helps too.'
    },
    {
      q: 'Can I book more than one service?',
      a: "Yes. Many couples combine wedding photography with a film and an album. Mention it in your message and we'll plan it together."
    }
  ]
}

const FOOT = C.FOOTER || {
  phone: '',
  email: '',
  location: ''
}

const CON = C.CONTACT || {
  call: '',
  whatsapp: '',
  waText: 'Hi'
}

const NUMS = CON.numbers || [
  { display: FOOT.phone, call: CON.call }
]

const TYPES = C.SHOOT_TYPES || [
  'Wedding',
  'Pre-Wedding',
  'Portrait',
  'Event'
]

function startContactScene(canvas) {
  const T = window.THREE
  let raf = 0
  let dead = false
  let R
  const offs = []

  try {
    R = new T.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })

    R.setPixelRatio(Math.min(devicePixelRatio, 2))

    const S = new T.Scene()
    const camera = new T.PerspectiveCamera(45, 1, 0.1, 100)

    camera.position.z = 8

    S.add(new T.AmbientLight(0xffffff, 0.65))

    const k = new T.DirectionalLight(0xffffff, 0.8)
    k.position.set(3, 5, 6)
    S.add(k)

    const L1 = new T.DirectionalLight(0xff8a5c, 1.1)
    const L2 = new T.DirectionalLight(0x8b5cf6, 1.1)

    L1.position.set(6, 2, 4)
    L2.position.set(-6, -1, 4)

    S.add(L1, L2)

    const stage = new T.Group()
    S.add(stage)

    const std = (c, r, m) =>
      new T.MeshStandardMaterial({
        color: c,
        roughness: r,
        metalness: m,
        side: T.DoubleSide
      })

    const tex = (a, b) => {
      const c = document.createElement('canvas')
      c.width = c.height = 64

      const x = c.getContext('2d')
      const g = x.createLinearGradient(0, 0, 64, 64)

      g.addColorStop(0, a)
      g.addColorStop(1, b)

      x.fillStyle = g
      x.fillRect(0, 0, 64, 64)

      return new T.CanvasTexture(c)
    }

    // Envelope
    const env = new T.Group()
    stage.add(env)

    env.add(
      new T.Mesh(
        new T.BoxGeometry(2.6, 1.7, 0.1),
        std(0xf3e6d0, 0.7, 0)
      )
    )

    const pk = new T.Shape()

    pk.moveTo(-1.3, 0.85)
    pk.lineTo(0, -0.1)
    pk.lineTo(1.3, 0.85)
    pk.lineTo(1.3, -0.85)
    pk.lineTo(-1.3, -0.85)

    const front = new T.Mesh(
      new T.ShapeGeometry(pk),
      std(0xe8d4b4, 0.75, 0)
    )

    front.position.z = 0.058
    env.add(front)

    const lt = new T.Mesh(
      new T.PlaneGeometry(2.2, 1.3),
      new T.MeshBasicMaterial({
        map: tex('#fff8ec', '#f3e6d0')
      })
    )

    lt.position.set(0, -0.2, 0.053)
    env.add(lt)

    const ph = new T.Mesh(
      new T.PlaneGeometry(1.2, 0.7),
      new T.MeshBasicMaterial({
        map: tex('#ff8a5c', '#8b5cf6')
      })
    )

    ph.position.set(0, 0.1, 0.001)
    lt.add(ph)

    const fl = new T.Group()
    fl.position.set(0, 0.85, 0.07)
    env.add(fl)

    const fs = new T.Shape()

    fs.moveTo(-1.3, 0)
    fs.lineTo(1.3, 0)
    fs.lineTo(0, -0.95)

    fl.add(
      new T.Mesh(
        new T.ExtrudeGeometry(fs, {
          depth: 0.02,
          bevelEnabled: false
        }),
        std(0xd9a521, 0.3, 0.9)
      )
    )

    const seal = new T.Mesh(
      new T.CylinderGeometry(0.16, 0.16, 0.05, 32),
      std(0xff5d8f, 0.3, 0.3)
    )

    seal.rotation.x = Math.PI / 2
    seal.position.set(0, -0.78, 0.05)
    fl.add(seal)

    // Ring and sparkles
    const ring = new T.Mesh(
      new T.TorusGeometry(2.3, 0.025, 16, 120),
      std(0xd9a521, 0.25, 1)
    )

    ring.rotation.x = 1.2
    stage.add(ring)

    const sg = new T.BufferGeometry()
    const sa = []

    for (let i = 0; i < 70; i++) {
      sa.push(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      )
    }

    sg.setAttribute(
      'position',
      new T.Float32BufferAttribute(sa, 3)
    )

    const sp = new T.Points(
      sg,
      new T.PointsMaterial({
        color: 0xd9a521,
        size: 0.05,
        transparent: true,
        opacity: 0.7
      })
    )

    stage.add(sp)

    // Polaroids
    const pol = new T.Group()
    stage.add(pol)

    ;[
      ['#f6c177', '#e8825a'],
      ['#f3a6a0', '#c2677a'],
      ['#a9c5e8', '#6f8fc9'],
      ['#b7dcc8', '#6aa58a'],
      ['#cfc4e8', '#8f7bc4']
    ].forEach((c, i) => {
      const g = new T.Group()

      g.add(
        new T.Mesh(
          new T.PlaneGeometry(0.9, 1.1),
          new T.MeshBasicMaterial({
            color: 0xfffdf8,
            side: T.DoubleSide
          })
        )
      )

      const im = new T.Mesh(
        new T.PlaneGeometry(0.76, 0.76),
        new T.MeshBasicMaterial({
          map: tex(c[0], c[1]),
          side: T.DoubleSide
        })
      )

      im.position.set(0, 0.1, 0.004)
      g.add(im)

      g.userData.a = (i / 5) * Math.PI * 2
      pol.add(g)
    })

    let mx = 0
    let my = 0

    const reduce = matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const onMouse = e => {
      mx = e.clientX / innerWidth - 0.5
      my = e.clientY / innerHeight - 0.5
    }

    addEventListener('mousemove', onMouse)

    offs.push(() =>
      removeEventListener('mousemove', onMouse)
    )

    const size = () => {
      R.setSize(innerWidth, innerHeight, false)

      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()

      const w = innerWidth > 860

      stage.position.set(
        w ? 3.1 : 0,
        w ? 0 : 2.5,
        0
      )

      stage.scale.setScalar(w ? 1 : 0.6)
    }

    size()
    addEventListener('resize', size)
    offs.push(() => removeEventListener('resize', size))

    const clk = new T.Clock()

    const loop = () => {
      if (dead) return

      raf = requestAnimationFrame(loop)

      const t = reduce ? 0 : clk.getElapsedTime()

      env.rotation.y +=
        ((mx * 0.7 + Math.sin(t * 0.5) * 0.25) -
          env.rotation.y) * 0.06

      env.rotation.x +=
        ((my * 0.35 - 0.1) - env.rotation.x) * 0.06

      env.position.y = Math.sin(t * 1.2) * 0.12

      const o = 0.5 + 0.5 * Math.sin(t * 0.9)
      const r = Math.max(0, (o - 0.55) / 0.45)

      fl.rotation.x = 0.25 + o * 2.6
      lt.position.y = -0.2 + r * r * 0.8

      ring.rotation.z = t * 0.3
      sp.rotation.y = t * 0.05

      pol.children.forEach(g => {
        const a = g.userData.a + t * 0.35

        g.position.set(
          Math.cos(a) * 3.3,
          Math.sin(a * 2 + g.userData.a) * 0.9,
          Math.sin(a) * 3.3
        )

        g.lookAt(0, g.position.y, 0)
        g.rotation.z = 0.1
      })

      canvas.style.opacity = Math.max(
        0.15,
        1 - scrollY / (innerHeight * 0.8)
      )

      R.render(S, camera)
    }

    loop()
  } catch (e) {
    console.log('WebGL unavailable', e)
  }

  return () => {
    dead = true

    cancelAnimationFrame(raf)
    offs.forEach(f => f())

    try {
      R && R.dispose()
    } catch {
      // Ignore cleanup errors
    }
  }
}

const waLink = text =>
  `https://wa.me/${CON.whatsapp}?text=${encodeURIComponent(text)}`

const Ico = ({ d }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
)

const ICON = {
  call: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z',

  chat: 'M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z',

  mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',

  pin: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
}

// Email field added here
const EMPTY = {
  name: '',
  email: '',
  phone: '',
  type: TYPES[0],
  date: '',
  msg: ''
}

export default function ContactPage() {
  const P = {
    ...DEFAULT_P,
    ...(C.CONTACT_PAGE || {})
  }

  const canvasRef = useRef(null)

  const [f, setF] = useState(EMPTY)

  const [st, setSt] = useState({
    s: 'idle',
    m: ''
  })

  const set = k => e =>
    setF(prev => ({
      ...prev,
      [k]: e.target.value
    }))

  // Existing 3D scene
  useEffect(() => {
    let dead = false
    let stop = () => {}

    loadThree()
      .then(() => {
        if (!dead && canvasRef.current) {
          stop = startContactScene(canvasRef.current)
        }
      })
      .catch(e => console.warn('three.js load nahi hua', e))

    return () => {
      dead = true
      stop()
    }
  }, [])

  const submit = async e => {
    e.preventDefault()

    const first = f.name.trim().split(' ')[0]

    const text = `Hi, I am ${f.name}.
Email: ${f.email}
I am looking for ${f.type}${f.date ? ' on ' + f.date : ''}.
${f.msg}
Phone: ${f.phone}`

    setSt({
      s: 'sending',
      m: ''
    })

    // Submit to backend if endpoint is configured
    if (P.endpoint) {
      try {
        const r = await fetch(P.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(f)
        })

        if (!r.ok) {
          throw new Error('Could not submit enquiry')
        }

        setSt({
          s: 'ok',
          m: `Thank you, ${first}! We will get back to you soon.`
        })

        setF(EMPTY)
      } catch {
        setSt({
          s: 'err',
          m: 'Could not send right now. Please use WhatsApp or call us.'
        })
      }

      return
    }

    // WhatsApp fallback
    window.open(
      waLink(text),
      '_blank',
      'noopener'
    )

    setSt({
      s: 'ok',
      m: `Thank you, ${first}! WhatsApp has opened with your enquiry. Press send there and we will reply.`
    })
  }

  const cards = [
    ...NUMS.map(n => ({
      k: 'call',
      l: 'Call us',
      v: n.display,
      href: `tel:${n.call}`
    })),

    {
      k: 'mail',
      l: 'Email',
      v: FOOT.email,
      href: `mailto:${FOOT.email}`
    },

    {
      k: 'pin',
      l: 'Studio',
      v: FOOT.location
    }
  ]

  return (
    <main className="ctp">
      <canvas
        className="ctp-canvas"
        ref={canvasRef}
      />

      <section className="ctp-hero">
        <div className="rv">
          <h1>{P.title}</h1>

          <p className="sub">{P.sub}</p>

          <div className="ctp-cards">
            {cards.map(c => {
              const body = (
                <>
                  <i>
                    <Ico d={ICON[c.k]} />
                  </i>

                  <span>
                    <small>{c.l}</small>
                    <b>{c.v}</b>
                  </span>
                </>
              )

              return c.href ? (
                <a
                  className="ci"
                  key={c.k + c.v}
                  href={c.href}
                >
                  {body}
                </a>
              ) : (
                <div
                  className="ci"
                  key={c.k + c.v}
                >
                  {body}
                </div>
              )
            })}
          </div>
        </div>

        <div className="hint">{P.hint}</div>
      </section>

      <section className="ctp-form">
        <form
          className="ctp-box rv"
          onSubmit={submit}
        >
          <h2>{P.formTitle}</h2>

          <p className="t">{P.formSub}</p>

          <div className="grid">
            {/* Name */}
            <input
              required
              type="text"
              placeholder="Your name"
              aria-label="Your name"
              value={f.name}
              onChange={set('name')}
            />

            {/* NEW EMAIL BOX */}
            <input
              required
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              autoComplete="email"
              value={f.email}
              onChange={set('email')}
            />

            {/* Phone */}
            <input
              required
              type="tel"
              placeholder="Phone number"
              aria-label="Phone number"
              value={f.phone}
              onChange={set('phone')}
            />

            {/* Shoot type */}
            <select
              aria-label="Shoot type"
              value={f.type}
              onChange={set('type')}
            >
              {TYPES.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              aria-label="Date"
              value={f.date}
              onChange={set('date')}
            />

            {/* Message */}
            <textarea
              className="full"
              placeholder="Tell us about your day"
              aria-label="Message"
              value={f.msg}
              onChange={set('msg')}
            />

            {/* Submit */}
            <button
              className="full"
              type="submit"
              disabled={st.s === 'sending'}
            >
              {st.s === 'sending'
                ? 'Sending...'
                : 'Send enquiry'}
            </button>

            {/* WhatsApp */}
            <a
              className="alt full"
              href={waLink(
                `Hi, I am ${f.name || '(name)'}.
Email: ${f.email}
I am looking for ${f.type}${f.date ? ' on ' + f.date : ''}.
${f.msg}
Phone: ${f.phone}`
              )}
              target="_blank"
              rel="noreferrer"
            >
              Or send it on WhatsApp
            </a>
          </div>

          {st.m && (
            <p
              className={`msg ${st.s}`}
              role="status"
            >
              {st.m}
            </p>
          )}
        </form>
      </section>

      <section className="ctp-faq">
        <div className="rv">
          <h2>{P.faqTitle}</h2>

          {P.faq.map(q => (
            <details key={q.q}>
              <summary>{q.q}</summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}