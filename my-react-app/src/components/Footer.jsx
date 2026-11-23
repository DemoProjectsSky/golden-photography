import { Link } from 'react-router-dom'
import * as C from '../Content.js'
import { WhatsAppIcon, InstagramIcon } from './Icons.jsx'

export default function Footer() {
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
        <div>
          <h4>Contact</h4>
          {C.CONTACT.numbers.filter(n => n.call !== `+${C.CONTACT.whatsapp}`).map(n => <a key={n.call} href={`tel:${n.call}`}>{n.display}</a>)}
          <a href={`mailto:${F.email}`}>{F.email}</a>
          <span>{F.location}</span>
        </div>
        <div>
          <h4>Social</h4>
          <div className="soc-icons">
            <a className="si wa" href={`https://wa.me/${C.CONTACT.whatsapp}?text=${encodeURIComponent(C.CONTACT.waText)}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${C.CONTACT.whatsappDisplay}`} title={`WhatsApp ${C.CONTACT.whatsappDisplay}`}>
              <WhatsAppIcon size={22} />
            </a>
            <a className="si ig" href={C.CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={22} />
            </a>
          </div>
        </div>
      </div>
      <div className="copy">© 2026 {C.BRAND}. All Rights Reserved.</div>
    </footer>
  )
}