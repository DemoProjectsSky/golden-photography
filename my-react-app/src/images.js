// Photos ko client/public/images/ folder me isi naam se rakho (jpg). Text/logo/watermark wali photo mat lagao.
const p = f => `/images/${f}`
export const IMG = {
  
  hero: { src: p('hero.jpg'), alt: 'Couple sharing a quiet moment during golden hour at their wedding' },
about: {
  src: p('aboutgolden.avif'),
  alt: 'Photographer capturing beautiful moments during a wedding session'
},
 albums: [
  {
    src: p('marraiagefolden.jpeg'),
    alt: 'Bride and groom exchanging vows during a wedding ceremony'
  },
  {
    src: p('preweddinggolden.jpeg'),
    alt: 'Couple laughing together during a pre-wedding shoot outdoors'
  },
  {
    src: p('engagementgolden.jpg'),
    alt: 'Couple showing their engagement rings close together'
  },
  {
    src: p('haldi.avif'),
    alt: 'Guests celebrating together at an evening event'
  },
],
  quote: { src: p('quote.jpg'), alt: 'Wide cinematic view of a couple embracing at their wedding' },
  why: { src: p('whyusgolden.JPG'), alt: 'Photographer guiding a couple during a relaxed portrait session' },
  gallery: [
    { src: p('bride.JPG'), alt: 'Portrait of a bride in soft natural light', r: 'r34' },
    { src: p('bridegolden.jpg'), alt: 'Portrait of a groom adjusting his sleeve', r: 'r11' },
    { src: p('candid.jpg'), alt: 'Candid moment of a couple laughing together', r: 'r43' },
    { src: p('cermony.jpg'), alt: 'Wedding ceremony with guests watching', r: 'r11' },
    { src: p('details.jpg'), alt: 'Wedding details including flowers and jewellery', r: 'r34' },
    { src: p('rings.jpg'), alt: 'Wedding rings resting on a bouquet', r: 'r43' },
    { src: p('walking.jpg'), alt: 'Couple walking hand in hand along a path', r: 'r34' },
    { src: p('family.jpg'), alt: 'Family celebrating together at a wedding', r: 'r11' },
    { src: p('emotion.jpg'), alt: 'Emotional candid moment between a bride and her father', r: 'r45' },
  ],
  social: [
    { src: p('candid.jpg'), alt: 'Wedding candid of guests laughing' },
    { src: p('couple.jpeg'), alt: 'Couple portrait in warm evening light' },
    { src: p('bridedetails.JPG'), alt: 'Close up of bridal details' },
    { src: p('bridegolden.jpg'), alt: 'Groom portrait outdoors' },
    { src: p('cermony.jpg'), alt: 'Moment from a wedding ceremony' },
    { src: p('cinematic.jpg'), alt: 'Cinematic shot of a couple at sunset' },
  ],
  cta: { src: p('cta.jpg'), alt: 'Emotional cinematic photograph of a couple at their wedding' },
  aboutPage: {
    story: { src: p('about-story.jpg'), alt: 'Photographer quietly capturing a candid moment at a celebration' },
    wide: { src: p('quote.jpg'), alt: 'Wide landscape view of a couple standing together at golden hour' },
  },
}