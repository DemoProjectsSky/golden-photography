// All photos live in assets-src/images (originals, not deployed) and are converted to
// responsive AVIF/WebP variants by `npm run images` -> public/images/optimized + src/image-manifest.json.
// Keep alt text descriptive of what is actually in each photo.
const p = f => `/images/${f}`

export const IMG = {
  // Hero is a faint decorative backdrop behind the headline, so it carries an empty alt.
  hero: { src: p('goldenphoto5.jpg'), alt: '' },
  about: { src: p('aboutgolden.avif'), alt: 'A sunflower glowing against the evening sun' },
  albums: [
    { src: p('marraiagefolden.jpeg'), alt: 'Bride and groom performing a wedding ritual together' },
    { src: p('preweddinggolden.jpeg'), alt: 'Couple embracing in a grassy field during a pre-wedding shoot' },
    { src: p('engagementgolden.jpg'), alt: 'Couple holding their rings up close together' },
    { src: p('haldi.avif'), alt: 'Women in yellow celebrating at a haldi ceremony' },
  ],
  quote: { src: p('goldenphoto7.jpg'), alt: 'Mountain lake at dusk with the peaks reflected in still water' },
  why: { src: p('whyusgolden.JPG'), alt: 'Black and white portrait of a woman standing in a dim doorway' },
  gallery: [
    { src: p('bride.JPG'), alt: 'Smiling bride in jewellery resting her head on her hand', r: 'r34' },
    { src: p('bridegolden.jpg'), alt: 'Groom in a white sherwani and red stole walking outdoors', r: 'r11' },
    { src: p('candid.jpg'), alt: 'Couple choosing bangles at a market stall', r: 'r43' },
    { src: p('cermony.jpg'), alt: 'Bride and groom embracing as petals fall around them', r: 'r11' },
    { src: p('details.jpg'), alt: 'Woman in a yellow outfit and sunglasses blowing a kiss', r: 'r34' },
    { src: p('rings.jpg'), alt: 'Couple showing off their rings and henna-decorated hands', r: 'r43' },
    { src: p('walking.jpg'), alt: 'Older couple sharing an umbrella on a rainy street', r: 'r34' },
    { src: p('family.jpg'), alt: 'Family of three posing together against a brick wall', r: 'r11' },
    { src: p('emotion.jpg'), alt: 'Boy sharing his food with a street dog', r: 'r45' },
  ],
  social: [
    { src: p('couple.jpeg'), alt: 'Couple embracing in a warm evening portrait' },
    { src: p('cinematic.jpg'), alt: 'Street food vendor cooking over a flaming pan' },
    { src: p('preweddinggolden.jpeg'), alt: 'Couple in a pre-wedding portrait on a grassy hillside' },
    { src: p('engagementgolden.jpg'), alt: 'Close-up of an engagement ring exchange' },
    { src: p('haldi.avif'), alt: 'Haldi ceremony with guests in bright yellow' },
    { src: p('marraiagefolden.jpeg'), alt: 'Wedding ritual with the couple seated together' },
  ],
  cta: { src: p('cta.jpg'), alt: 'Wooden jetty stretching over a lake towards a colourful sunset' },
  aboutPage: {
    story: { src: p('candid.jpg'), alt: 'A candid moment between a couple at a bangle stall' },
    wide: { src: p('goldenphoto2.jpg'), alt: 'Meadow of yellow flowers under a golden evening sky' },
  },
}
