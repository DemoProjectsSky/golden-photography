import { MOODS } from '../Content.js'
export default function Moods() {
  return MOODS.map((m, i) => (
    <section key={m.title} className={m.side} data-p={i + 1} id={i === 0 ? 'albums' : undefined}>
      <div className="mood rv">
        <div className="lbl">{m.label}</div>
        <h2 className="gt">{m.title}</h2>
        <p>{m.text}</p>
        <div className="chips">{m.chips.map(c => <span key={c}>{c}</span>)}</div>
      </div>
    </section>
  ))
}