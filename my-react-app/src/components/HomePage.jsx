import Booking from './Booking.jsx'
import { Hero, About, Albums, Services, Quote, WhyUs, Gallery, Testimonials, Social, CTA } from './Homesections.jsx'

export default function HomePage() {
  return (
    <>
      <Hero /><About /><Albums /><Services /><Quote /><WhyUs />
      <Gallery /><Testimonials /><Social /><CTA /><Booking />
    </>
  )
}