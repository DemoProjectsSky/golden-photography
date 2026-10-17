import { DEFAULT_PACKAGES } from '../content.js'

const tilt = e => {
  const el = e.currentTarget, r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateZ(10px)`
}

export default function Packages() {
  const list = DEFAULT_PACKAGES
  return (
    <section data-p="0" id="pk">
      <div className="rv"><div className="lbl">Packages</div><h2>Choose your <span className="gt">frame</span></h2></div>
      <div className="pk rv">
        {list.map(p => (
          <div className="pc" key={p._id} onMouseMove={tilt} onMouseLeave={e => (e.currentTarget.style.transform = '')}>
            <h3>{p.name}</h3>
            <div className="pr">₹{Number(p.price).toLocaleString('en-IN')}</div>
            <ul>{p.features.map(f => <li key={f}>{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}