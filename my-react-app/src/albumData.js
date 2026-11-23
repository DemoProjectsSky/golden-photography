// All content for the Album page lives here, so prices and photos can be edited without touching the layout.

export const ALBUM_INTRO = {
  eyebrow: 'ALBUMS',
  title: 'Albums made to be held, not just viewed.',
  sub: 'Your wedding story, printed on premium paper and presented in boxes and bags you will be proud to hand down. Browse our album work, pick a style, and see the prices before you ask.',
}

// ---------- Signature set (photos + details supplied by the studio) ----------
export const SIGNATURE = {
  badge: 'Signature Set',
  title: 'Premium Box, Leather Bag & Calendar Set',
  price: 8000,
  priceNote: 'Complete set',
  blurb: 'A high-quality, premium-looking album set that arrives as a gift: the album in its own box, a leather carry bag, and a calendar to match.',
  includes: [
    'Premium album box',
    'Leather carry bag',
    'Calendar',
    '25 sheets of wavy glossy paper',
    'High-quality, premium look',
  ],
  note: 'Names and dates in the photos are samples. Your album is made with your own details.',
  images: [
    { src: '/images/set-leather-box.jpg', alt: 'Cream album with an acrylic photo panel, shown with a mustard leather box and a dark leather carry bag' },
    { src: '/images/set-grey-bag.jpg', alt: 'Grey album with a photo window and gold foil names, shown with a grey leather bag and an open box with a ribbon' },
  ],
}

// ---------- Album work: real spreads from a finished wedding album ----------
export const SPREAD_FILTERS = ['All', 'Covers', 'Portraits', 'Rituals & Celebrations']

// layout: 'std' = 3:2 page (one third of a row), 'wide' = 3:1 double-page spread (full row)
export const SPREADS = [
  { id: 'cover', cat: 'Covers', layout: 'std', title: 'Album cover', alt: 'Album cover page with three portraits of the bride and groom' },
  { id: 'royal-couple', cat: 'Covers', layout: 'std', title: 'Royal couple', alt: 'Opening page with a bride and groom embracing and a framed wedding day portrait' },
  { id: 'couple-closeup', cat: 'Covers', layout: 'std', title: 'Closing page', alt: 'Closing page with a close portrait of the couple framed by soft floral artwork' },
  { id: 'bride-groom-mist', cat: 'Rituals & Celebrations', layout: 'wide', title: 'Bride & groom in the mist', alt: 'Spread of the bride and groom in garlands with a misty floor effect' },
  { id: 'varmala', cat: 'Rituals & Celebrations', layout: 'wide', title: 'Varmala ceremony', alt: 'Spread showing the varmala garland exchange between the couple and their family' },
  { id: 'colour-baraat', cat: 'Rituals & Celebrations', layout: 'wide', title: 'Baraat in colour', alt: 'Spread of the baraat dancing through bright pink colour smoke' },
  { id: 'baraat-fireworks', cat: 'Rituals & Celebrations', layout: 'wide', title: 'Baraat by night', alt: 'Spread of the groom arriving at night with sparklers and a dancing crowd' },
  { id: 'bride-makeup', cat: 'Portraits', layout: 'wide', title: 'Bridal look', alt: 'Spread of the bride in a pink lehenga with a close portrait of her jewellery and makeup' },
  { id: 'bride-portraits', cat: 'Portraits', layout: 'wide', title: 'Bride', alt: 'Spread of portraits of the bride in a pink and gold lehenga' },
  { id: 'bride-beauty', cat: 'Portraits', layout: 'wide', title: 'Bride beauty', alt: 'Spread of the bride in white with green leaves and a close portrait of her earring' },
  { id: 'bride-gown', cat: 'Portraits', layout: 'wide', title: 'Reception gown', alt: 'Spread of the bride in a champagne gown, smiling and twirling' },
  { id: 'groom-portraits', cat: 'Portraits', layout: 'wide', title: 'Groom', alt: 'Black and white portraits of the groom in an embroidered jacket' },
  { id: 'romantic-couple', cat: 'Portraits', layout: 'wide', title: 'Romantic couple', alt: 'Spread of the couple in soft circular and framed layouts' },
  { id: 'bride-and-groom', cat: 'Portraits', layout: 'wide', title: 'Bride and groom', alt: 'Spread with the couple in a circular frame and arched frames' },
  { id: 'couple-embrace', cat: 'Portraits', layout: 'wide', title: 'The embrace', alt: 'Spread of the couple embracing against a warm golden background' },
  { id: 'bw-romantic', cat: 'Portraits', layout: 'wide', title: 'Romantic moment', alt: 'Black and white spread of the couple sharing a quiet moment' },
  { id: 'bw-wedding', cat: 'Portraits', layout: 'wide', title: 'Wedding in monochrome', alt: 'Black and white spread of the couple with the word Wedding in large type' },
].map(s => ({ ...s, src: `/images/album-${s.id}.jpg` }))

// ---------- Cover & box styles (from the product brochure). Price comes from the code, see pricing.js ----------
export const STYLES = [
  { code: 'SM110-01', name: 'Velvet Box Album', file: 'sm110-01', alt: 'Dark velvet-look album with a photo window, shown in a wooden box' },
  { code: 'SM70-02', name: 'Embossed Emblem Album', file: 'sm70-02', alt: 'Warm kraft-tone album with an embossed emblem next to its keepsake box' },
  { code: 'SM60-04', name: 'Framed Sage Album', file: 'sm60-04', alt: 'Sage green album with a framed cover design' },
  { code: 'AP35-02', name: 'Framed Photo Cover', file: 'ap35-02', alt: 'Framed photo cover with a minimal printed title' },
  { code: 'FR28-01', name: 'Terracotta Emblem Cover', file: 'fr28-01', alt: 'Terracotta album cover with a printed circular photo emblem' },
  { code: 'UW22-03', name: 'Open Presentation Box', file: 'uw22-03', alt: 'Open presentation box showing a wedding photo inside' },
  { code: 'TM16-02', name: 'Grey Window Cover', file: 'tm16-02', alt: 'Grey album cover with a photo window and printed names' },
  { code: 'OB10-10', name: 'Carry Bag', file: 'ob10-10', alt: 'Olive and white carry bag for an album' },
].map(s => ({ ...s, src: `/images/style-${s.file}.jpg` }))

// ---------- Paper & extras (from the printing price list) ----------
export const PRICE_GUIDE = {
  paper: {
    title: 'Album paper',
    unit: '/sheet',
    items: [
      ['Rollin Gloss/Matt Tearable', 56],
      ['Rollin Gloss/Matt Lead Tearable', 58],
      ["Silk'en Storia", 76],
      ['Fotomatt', 70],
      ['Slimy Shiny/Smooth No Tearable', 64],
      ['Rich Shiny/Smooth No Tearable', 70],
      ['Duplex Shiny/Smooth No Tearable', 90],
      ['Silver Shiny/Smooth No Tearable', 84],
      ['Jewel Metallica No Process', 100],
      ['Line Soria No Process (Special Edition)', 90],
      ['Banana Fiber (Limited Edition)', 140],
      ['Texture Paper (Special Edition)', 90],
      ['Transparent paper', 50],
    ],
    extras: [
      ['Glitter & 3D process (extra charge)', 100],
      ['Veluotte process (extra charge)', 10],
    ],
  },
  add: {
    title: 'Extras',
    items: [
      ['Photo cover with matt canvas', 500],
      ['Photo cover with glitter or 3D canvas', 550],
      ['Emboss charge (max 12x18)', 250],
      ['Mini album', 250],
      ['Board calendar (semi wooden)', 200],
      ['Calendar (6x8)', 120],
      ['Calendar (8x12)', 250],
      ['Calendar (12x18)', 350],
      ['Mobile book (E-album)', 80],
    ],
  },
  design: {
    title: 'Design services',
    items: [
      ['Standard design', 80],
      ['Premium design', 100],
    ],
  },
  notes: ['Applicable up to size 12x36.', 'Courier charges extra, as applicable.', 'Terms & conditions apply.'],
}
