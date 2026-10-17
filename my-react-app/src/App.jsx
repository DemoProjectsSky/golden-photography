import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Scene3D from './components/Scene3D.jsx'
import Navbar from './components/Navbar.jsx'
import Booking from './components/Booking.jsx'
import AboutPage from './components/AboutPage.jsx'
import ServicesPage from './components/Servicespage.jsx'
import ContactPage from './components/Contactpage.jsx'
import Album from './components/Album.jsx'
import { Hero, About, Albums, Services, Quote, WhyUs, Gallery, Testimonials, Social, CTA, Footer } from './components/Homesections.jsx'
import { IMG } from './images.js'

// in pages ka apna 3D scene hai, isliye global Scene3D wahan nahi chalega
const OWN_SCENE = ['/servicespage', '/contact']

function Home() {
  return (
    <>
      <Hero /><About /><Albums /><Services /><Quote /><WhyUs />
      <Gallery /><Testimonials /><Social /><CTA /><Booking />
    </>
  )
}

export default function App() {
  const loc = useLocation()

  // page badalne par: hash ho to wahan scroll, warna top pe; phir reveal animations ON
  useEffect(() => {
    const el = loc.hash && document.querySelector(loc.hash)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
    else {
      const d = document.documentElement
      d.style.scrollBehavior = 'auto'; window.scrollTo(0, 0)
      requestAnimationFrame(() => (d.style.scrollBehavior = ''))
    }
  }, [loc.pathname, loc.hash, loc.key])

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(x => x.isIntersecting && x.target.classList.add('on')),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.rv,.cr,.step').forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [loc.pathname])

  return (
    <>
      {loc.pathname === '/' && (
        <div className="hero-bg" role="img" aria-label={IMG.hero.alt} style={{ backgroundImage: `url(${IMG.hero.src})` }} />
      )}
      <div className="glow" />
      {!OWN_SCENE.includes(loc.pathname.toLowerCase()) && <Scene3D />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/album" element={<Album />} />
        <Route path="/Servicespage" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}