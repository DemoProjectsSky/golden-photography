import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="hero" data-p="0">
      <div className="rv">
        <div className="eyebrow">ERROR 404</div>
        <h1>Page not <span className="gt">found.</span></h1>
        <p className="sub">The page you are looking for may have moved or never existed. Let's get you back to the photographs.</p>
        <div className="btns">
          <Link className="pill" to="/">Back to Home</Link>
          <Link className="pill ghost" to="/album">View Albums</Link>
        </div>
      </div>
    </section>
  )
}
