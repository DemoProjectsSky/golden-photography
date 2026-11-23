import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { STUDIO } from '../Content.js'

const LINKS = [
  ['Home', '/'],
  ['Albums', '/album'],
  ['About', '/about'],
  ['Services', '/servicespage'],
  ['Contact', '/contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const path = loc.pathname.toLowerCase()
  const active = name =>
    (name === 'About' && path === '/about') ||
    (name === 'Albums' && path === '/album') ||
    (name === 'Services' && path === '/servicespage') ||
    (name === 'Contact' && path === '/contact') ||
    (name === 'Home' && loc.pathname === '/' && !loc.hash)
  return (
    <nav aria-label="Main">
      <Link className="logo" to="/">{STUDIO}</Link>
      <div id="nav-links" className={'links' + (open ? ' open' : '')}>
        {LINKS.map(([name, to]) => (
          <Link key={name} to={to} className={active(name) ? 'active' : ''} aria-current={active(name) ? 'page' : undefined} onClick={() => setOpen(false)}>{name}</Link>
        ))}
      </div>
      <div className="nav-right">
        <Link className="pill" to="/#book">Book a Shoot</Link>
        <button type="button" className="burger" aria-label="Menu" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>{open ? '\u2715' : '\u2630'}</button>
      </div>
    </nav>
  )
}