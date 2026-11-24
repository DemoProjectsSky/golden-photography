import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import * as C from '../Content.js'
import { WhatsAppIcon } from './Icons.jsx'

const waLink = text => `https://wa.me/${C.CONTACT.whatsapp}?text=${encodeURIComponent(text)}`

// Service ki poori details, page ke uppar (overlay) khulti hai. Close: X, Esc ya bahar click.
export default function ServiceModal({ s, onClose }) {
  const closeRef = useRef(null)
  const hasPrice = s.price && s.price !== 'Price on request'

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = e => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', key)
    closeRef.current && closeRef.current.focus()
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', key) }
  }, [onClose])

  return createPortal(
    <div className="sm-back" onClick={onClose}>
      <div className="sm" role="dialog" aria-modal="true" aria-label={s.t} onClick={e => e.stopPropagation()}>
        <button type="button" className="sm-x" ref={closeRef} onClick={onClose} aria-label="Close details">×</button>
        <h2>{s.t}</h2>
        <p className="sm-tag">{s.g}</p>
        {s.price && (
          <p className={`sm-price${hasPrice ? '' : ' ask'}`}>
            <b>{s.price}</b>{s.priceNote && <span>{s.priceNote}</span>}
          </p>
        )}
        <p>{s.d}</p>
        {s.more && <p>{s.more}</p>}
        {(s.hi || []).length > 0 && <ul>{s.hi.map(x => <li key={x}>{x}</li>)}</ul>}
        {(s.i || []).length > 0 && (<><h4>What you get</h4><ul>{s.i.map(x => <li key={x}>{x}</li>)}</ul></>)}
        {(s.b || []).length > 0 && <p className="sm-for"><b>Covers</b> {s.b.join(', ')}</p>}
        <div className="sm-acts">
          <Link className="pill" to="/contact" onClick={onClose}>Book a shoot</Link>
          <a className="sm-wa" href={waLink(`Hi, I'd like to know more about ${s.t}.`)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
          <a className="sm-wa" href={`tel:${C.CONTACT.call}`}>Call us</a>
        </div>
      </div>
    </div>,
    document.body
  )
}
