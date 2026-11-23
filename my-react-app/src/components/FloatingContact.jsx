import * as C from '../Content.js'
import { WhatsAppIcon, InstagramIcon } from './Icons.jsx'

// Har page par screen ke kone me fixed rehta hai, scroll karne par bhi dikhta hai.
export default function FloatingContact() {
  const wa = `https://wa.me/${C.CONTACT.whatsapp}?text=${encodeURIComponent(C.CONTACT.waText)}`
  return (
    <div className="float-contact">
      <a className="fc ig" href={C.CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
        <InstagramIcon size={26} />
      </a>
      <a className="fc wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp ${C.CONTACT.whatsappDisplay}`}>
        <WhatsAppIcon size={30} />
      </a>
    </div>
  )
}
