import { useState } from 'react'
import './pricelist.css'
import { priceFromCode } from '../pricing.js'

// ---------- 1) Yahan apni price list edit karo ----------
// code format: PREFIX + PRICE + - + DESIGN NO.   (e.g. AP35-04)
// "middle number" x 100 = price in ₹   (35 -> ₹3,500, 110 -> ₹11,000)
const ITEMS = [
  { code: 'CC25-03', name: 'Box Set',        note: 'Printed lid, name & date' },
  { code: 'CB30-02', name: 'Album + Box',    note: 'Hard-cover album with slip box' },
  { code: 'AP35-04', name: 'Framed Print',   note: 'Framed wedding print' },
  { code: 'SM110-01', name: 'Premium Box Album', note: 'Wooden box, velvet cover' },
]

// ---------- 2) Code se price nikalne ka function ab ../pricing.js me hai (Album page bhi wahi use karta hai) ----------
const inr = (n) => '₹' + n.toLocaleString('en-IN') + '/-'

// ---------- 3) Component ----------
export default function PriceList() {
  const [q, setQ] = useState('')
  const res = priceFromCode(q)

  return (
    <section className="price-page">
      <div className="pl-head">
        <div className="pl-eyebrow">Pricing</div>
        <h2>How to Know <span className="pl-grad">Pricing?</span></h2>
        <div className="pl-rule" />
        <p>Har album / product ke code me beech ke digits hi uska price hain.</p>
      </div>

      {/* code ka breakup */}
      <div className="pl-decode">
        <div className="pl-code">
          <span className="a">AP</span><span className="b">35</span><span className="c">-04</span>
        </div>
        <ul>
          <li><i className="a" />Prefix — product type</li>
          <li><i className="b" />Beech ke digits — price (digits + 00)</li>
          <li><i className="c" />Last number — design no.</li>
        </ul>
        <div className="pl-eq">35 + 00 = <b>₹3,500/-</b></div>
      </div>

      {/* sample codes */}
      <div className="pl-grid">
        {ITEMS.map((it) => {
          const r = priceFromCode(it.code)
          return (
            <div className="pl-card" key={it.code}>
              <div className="pl-tag">{it.code}</div>
              <h3>{it.name}</h3>
              <p>{it.note}</p>
              <div className="pl-calc">{r.digits}+00 =</div>
              <div className="pl-price">{inr(r.price)}</div>
            </div>
          )
        })}
      </div>

      {/* live checker */}
      <div className="pl-check">
        <label htmlFor="pl-in">Apna code check karo</label>
        <input id="pl-in" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. CB30-02" autoComplete="off" spellCheck="false" />
        <div className="pl-out">
          {!q && <span className="dim">Code type karo, price yahan dikhega</span>}
          {q && !res && <span className="dim">Format: AP35-04</span>}
          {res && <span><b>{inr(res.price)}</b> &nbsp;·&nbsp; {res.digits}+00 &nbsp;·&nbsp; design {res.design}</span>}
        </div>
      </div>
    </section>
  )
}