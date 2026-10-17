import { HERO } from '../content.js'
export default function Hero() {
  return (
    <section className="hero" data-p="0" id="home">
      <div className="rv">
        <div className="eyebrow">{HERO.eyebrow}</div>
        <h1>Every frame<br />holds a <span className="gt">story</span>.</h1>
        <p className="sub">{HERO.sub}</p>
        <a className="pill" href="/Album">View our work</a>
      </div>
     
    </section>
  )
}