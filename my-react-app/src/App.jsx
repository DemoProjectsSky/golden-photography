import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'
import Picture from './components/Picture.jsx'
import { IMG } from './images.js'
import { applyRouteMeta } from './seo.js'

const HomePage = lazy(() => import('./components/HomePage.jsx'))
const AboutPage = lazy(() => import('./components/AboutPage.jsx'))
const ServicesPage = lazy(() => import('./components/Servicespage.jsx'))
const ContactPage = lazy(() => import('./components/Contactpage.jsx'))
const Album = lazy(() => import('./components/Album.jsx'))
const NotFound = lazy(() => import('./components/NotFound.jsx'))
const Scene3D = lazy(() => import('./components/Scene3D.jsx'))

// Set at build time (see vite.config.js). Empty when the production URL is not known.
const SITE_URL = typeof __SITE_URL__ === 'string' ? __SITE_URL__ : ''

// These pages have their own 3D scene, so the global Scene3D is not mounted there.
const OWN_SCENE = ['/servicespage', '/contact']

function PageLoading() {
  return (
    <div className="page-loading" role="status" aria-label="Loading page">
      <span />
    </div>
  )
}

// The decorative 3D camera is skipped for people who asked for reduced motion or Save-Data,
// which also saves ~140 KB of JavaScript and the WebGL work on low-end devices.
function shouldSkipScene() {
  if (typeof window === 'undefined') return true
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection?.saveData
  return Boolean(reduced || saveData)
}

function DeferredScene() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (shouldSkipScene()) return undefined
    let idleId
    let timerId
    const start = () => setReady(true)

    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(start, { timeout: 2000 })
    else timerId = window.setTimeout(start, 500)

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timerId !== undefined) window.clearTimeout(timerId)
    }
  }, [])

  return ready ? <Suspense fallback={null}><Scene3D /></Suspense> : null
}

// Reveals `.rv/.cr/.step` blocks as they scroll into view.
// IMPORTANT: this component is rendered INSIDE the <Suspense> boundary, after <Routes>. React only
// commits it together with the lazily loaded page, so its effect runs when the page's elements
// exist. (Observing from App's own effect ran before the lazy page mounted, which left the whole
// page at opacity 0 on a cold load.)
function RevealOnScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    const els = document.querySelectorAll('.rv,.cr,.step')
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(e => e.classList.add('on'))
      return undefined
    }
    const io = new IntersectionObserver(
      es =>
        es.forEach(x => {
          if (x.isIntersecting) {
            x.target.classList.add('on')
            io.unobserve(x.target)
          }
        }),
      { threshold: 0.12 }
    )
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [pathname])
  return null
}

export default function App() {
  const loc = useLocation()

  // Per-page title, description, canonical and robots.
  useEffect(() => {
    applyRouteMeta(loc.pathname, SITE_URL)
  }, [loc.pathname])

  // On page change: scroll to the hash target if there is one, otherwise to the top.
  useEffect(() => {
    const el = loc.hash && document.querySelector(loc.hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
    else {
      const d = document.documentElement
      d.style.scrollBehavior = 'auto'
      window.scrollTo(0, 0)
      requestAnimationFrame(() => (d.style.scrollBehavior = ''))
    }
  }, [loc.pathname, loc.hash, loc.key])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {loc.pathname === '/' && (
        <div className="hero-bg" aria-hidden="true">
          {/* LCP candidate on the homepage: eager + high priority, never lazy */}
          <Picture src={IMG.hero.src} alt="" sizes="100vw" priority />
        </div>
      )}
      <div className="glow" />
      {!OWN_SCENE.includes(loc.pathname.toLowerCase()) && <DeferredScene />}
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/album" element={<Album />} />
            <Route path="/Servicespage" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <RevealOnScroll />
        </Suspense>
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
