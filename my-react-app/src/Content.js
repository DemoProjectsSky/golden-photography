// Saara text yahin se edit karo
export const STUDIO = 'GOLDEN PHOTOGRAPHY'
export const BRAND = 'Golden Photography'

export const HERO = {
  label: 'CAPTURING MOMENTS • CREATING MEMORIES',
  sub: 'From intimate moments to grand celebrations, we capture the emotions, details, and memories that make your story unforgettable.',
}
export const ABOUT = {
  label: 'CAPTURING THE REAL YOU',
  title: 'More Than Just a Photograph.',
  p1: 'Photography is about preserving the feeling behind a moment. We focus on authentic emotions, natural expressions, and the little details that make every story unique.',
  p2: 'Every frame is thoughtfully captured to tell a story that you can relive for years to come.',
  btn: 'Discover Our Story',
}
export const ALBUMS = {
  title: 'FEATURED ALBUMS',
  sub: "A glimpse into the stories we've had the privilege to capture.",
  items: [
    { t: 'Weddings', d: 'Timeless moments from beautiful celebrations.' },
    { t: 'Pre-Weddings', d: 'Love, laughter, and everything in between.' },
    { t: 'Engagements', d: 'The beginning of something beautiful.' },
    { t: 'Events & Celebrations', d: 'Memories from moments worth celebrating.' },
  ],
}
export const SERVICES = {
  title: 'WHAT WE CAPTURE',
  sub: 'Photography and visual storytelling crafted around your most meaningful moments.',
  btn: 'Explore Services',
  items: [
    { t: 'WEDDING PHOTOGRAPHY', d: 'Authentic candid and timeless photographs that capture every emotion of your celebration.' },
    { t: 'PRE-WEDDING PHOTOGRAPHY', d: 'Cinematic and natural couple portraits that reflect your personality and connection.' },
    { t: 'PORTRAIT PHOTOGRAPHY', d: 'Creative and professional portraits designed to capture your personality and confidence.' },
    { t: 'EVENT PHOTOGRAPHY', d: 'Every important moment, detail, and celebration captured beautifully.' },
    { t: 'CINEMATIC FILMS', d: 'Beautiful moving stories created through cinematic photography and videography.' },
  ],
}
export const QUOTE = {
  title: 'Some moments deserve to be remembered forever.',
  sub: "We don't just capture how it looked. We capture how it felt.",
}
export const WHY = {
  title: 'WHY CHOOSE US',
  sub: 'Because your memories deserve more than ordinary photographs.',
  items: [
    { t: 'AUTHENTIC MOMENTS', d: 'We capture genuine emotions and natural expressions instead of forced poses.' },
    { t: 'CREATIVE STORYTELLING', d: 'Every photograph becomes part of a meaningful visual story.' },
    { t: 'ATTENTION TO DETAIL', d: 'From expressions to the smallest details, nothing important goes unnoticed.' },
    { t: 'PROFESSIONAL EXPERIENCE', d: 'A comfortable, organized, and professional experience from the first conversation to final delivery.' },
  ],
}
export const GALLERY = {
  title: 'A GLIMPSE OF OUR WORK',
  sub: 'Real moments. Genuine emotions. Beautifully preserved.',
  btn: 'Explore All Albums',
}
export const TESTIMONIALS = {
  title: 'WORDS FROM OUR CLIENTS',
  sub: 'Memories fade, but the right photograph brings them back.',
  sample: true, // sample reviews dikha raha hai — real reviews aate hi false kar do
  items: [
    { q: 'Every photograph feels like a memory brought back to life. The team made us feel completely comfortable throughout the shoot.', n: 'Rahul & Priya' },
    { q: "They captured all the little moments we didn't even notice on the day. We absolutely loved the final photographs.", n: 'Ananya & Rohan' },
    { q: 'Professional, creative, and incredibly easy to work with. Our photographs turned out beautiful.', n: 'Sneha & Aditya' },
  ],
}
export const SOCIAL = {
  title: 'FOLLOW THE JOURNEY',
  sub: 'Behind the scenes, recent stories, and our latest work.',
  btn: 'Follow on Instagram',
  instagram: 'https://www.instagram.com/g_o_l_u__09?srtk=MWlyeWU3aHhocWppZA%3D%3D', // apna real Instagram link yahan daalo
}
export const CTA = {
  title: "LET'S CREATE SOMETHING BEAUTIFUL",
  sub: "Your moments deserve to be remembered. Let's turn them into photographs you'll cherish forever.",
}
export const FOOTER = {
  tagline: 'Capturing moments. Creating memories.',
  phone: '+91 85540 31167 / +91 72195 65332',
  email: 'abhishekbagade5454@gmail.com',
  location: 'Jawaharnagar Petrol Pump Thana, Bhandara',
  social: [['Instagram', 'https://www.instagram.com/g_o_l_u__09?srtk=MWlyeWU3aHhocWppZA%3D%3D']],
}

// Packages.jsx / Booking.jsx ke liye (unchanged)
export const DEFAULT_PACKAGES = [
  { _id: 'a', name: 'STARTER', price: 9999, features: ['2 hour shoot', '30 edited photos', 'Online gallery'] },
  { _id: 'b', name: 'SIGNATURE', price: 24999, features: ['Full day coverage', '150 edited photos', 'Highlight reel'] },
  { _id: 'c', name: 'CINEMATIC', price: 49999, features: ['2 photographers', 'Wedding film + album', 'Drone coverage'] },
]
export const SHOOT_TYPES = ['Wedding', 'Pre-Wedding', 'Post-Wedding', 'Engagement', 'Portrait', 'Maternity', 'Birthday', 'Baby Shower', 'Event', 'Corporate', 'Commercial Ad', 'Cinematic Film', 'Other']

// ===== About page =====
export const ABOUT_PAGE = {
  label: 'ABOUT US',
  title: 'We Tell Stories ~Through Light.',
  sub: 'A passionate team of photographers and filmmakers dedicated to preserving the real emotions behind every celebration.',
  marquee: ['Weddings', 'Pre-Weddings', 'Engagements', 'Portraits', 'Events', 'Cinematic Films'],
  story: {
    label: 'OUR STORY',
    title: 'It Started With a Camera and a ~Feeling.',
    p1: 'I am a passionate photographer who believes that every picture carries a unique story. My goal is to freeze moments that speak, evoke emotions, and stay timeless for years. With years of experience in portrait, wedding, product, and travel photography — I bring a blend of creativity, precision, and emotion into every shot.',
    p2: "Golden Shoot Photography is not just a brand — it's a vision to create art that feels alive. I focus on natural lighting, modern composition techniques, and soulful editing to create visuals that truly stand out."
  },
  stats: {
    sample: true, // sample figures — apne real numbers daalke false kar do
    items: [
      { n: 8, s: '+', l: 'Years of Experience' },
      { n: 450, s: '+', l: 'Events Captured' },
      { n: 300, s: '+', l: 'Happy Couples' },
      { n: 12, s: '', l: 'Cities Covered' },
    ],
  },
  values: {
    title: 'WHAT WE BELIEVE',
    sub: 'The principles behind every photograph we take.',
    items: [
      { t: 'AUTHENTICITY', d: 'We guide gently and let real emotions lead, so your photographs feel like you.' },
      { t: 'STORYTELLING', d: 'We think in sequences, from the first glance to the last goodbye, not just single pictures.' },
      { t: 'CRAFT', d: 'Light, composition and careful editing are never left to chance.' },
      { t: 'COMFORT', d: 'Relaxed people make beautiful photographs, so we keep every shoot easy and unhurried.' },
    ],
  },
  banner: 'Every celebration is different. So is every photograph.',
  process: {
    title: 'HOW WE WORK',
    sub: 'A simple, comfortable journey from first hello to final delivery.',
    steps: [
      { n: '01', t: 'Say Hello', d: 'Tell us about your day, your style and your ideas. We listen first.' },
      { n: '02', t: 'Plan Together', d: 'We shape the shoot: locations, timings and the must-have moments.' },
      { n: '03', t: 'The Shoot', d: 'Relaxed direction, natural light and plenty of room for candid moments.' },
      { n: '04', t: 'Edit With Care', d: 'Every photograph is colour-graded and retouched to a consistent, timeless look.' },
      { n: '05', t: 'Delivery', d: 'Your gallery and album arrive on time, ready to share and cherish.' },
    ],
  },
}

// ===== Contact (Call / WhatsApp / Contact page) =====
export const CONTACT = {
  call: '+918554031167',      // main number: Services page ka Call button yahi use karta hai
  whatsapp: '918554031167',   // main WhatsApp number: bina + ke, country code ke saath
  waText: "Hi, I'd like to know about your photography services.",
  // Contact page par dono number alag-alag cards me dikhte hain (order badalna ho to yahin badlo)
  numbers: [
    { display: '+91 85540 31167', call: '+918554031167' },
    { display: '+91 72195 65332', call: '+917219565332' },
  ],
}

// ===== Services page =====
// price: card par dikhta hai. Jin services ka rate abhi nahi mila unme ASK use hua hai.
// Rate aate hi price: 'From ₹X / day' likh do.
const ASK = 'Price on request'

export const SERVICES_PAGE = {
  title: 'Photography and film for the days that matter.',
  sub: 'Weddings, pre-weddings, portraits, events, films and albums. Pick what you need, or tell us the occasion and we will suggest the rest.',
  items: [
    { p: 'rings', t: 'Wedding Photography', g: 'The whole day, start to finish.',
      price: '₹3,500 / day', priceNote: 'Traditional photos',
      d: 'Rituals, families and the quiet moments in between, shot candidly and delivered in the order the day happened.',
      hi: ['Traditional coverage of every ritual', 'Candid coverage available as an option', 'Online gallery, album optional'],
      more: 'We stay out of the way so people keep behaving naturally. Before the day we go through your event list, the families and the shots that matter most, so nothing is left to chance.',
      i: ['Full-day coverage of every event you book', 'Decor, jewellery and small details', 'Family and group portraits', 'Colour-graded, retouched photos', 'Google Drive access for your photos'],
      b: ['Haldi', 'Mehendi', 'Sangeet', 'Wedding day'] },
    { p: 'film', t: 'Traditional Video', g: 'Every ritual, recorded in full.',
      price: '₹4,500 / day', priceNote: 'Reels ₹3,000 / day (2+ reels)',
      d: 'Complete video coverage of your ceremonies, so you can relive the whole day, plus short reels for sharing.',
      hi: ['Full coverage of rituals and events', 'Short reels for social media', 'Clean, steady, well-lit footage'],
      more: 'Traditional video follows the day as it happens, from the first ritual to the last. Add reels if you want quick, shareable clips alongside the full video.',
      i: ['Full-day video coverage', 'Edited ceremony video', 'Reels (2 or more) as an add-on', 'Delivered as digital files'],
      b: ['Weddings', 'Engagements', 'Receptions', 'Family functions'] },
    { p: 'cam', t: 'Candid Photography', g: 'The moments nobody poses for.',
      price: '₹5,000 / day',
      d: 'Natural expressions, stolen glances and small moments, photographed without interrupting the day.',
      hi: ['Unposed, natural photographs', 'Works alongside traditional coverage', 'Edited for a consistent look'],
      more: 'Candid work is about being there without being noticed. We watch for the laughter, the tears and the in-between moments that posed photographs miss.',
      i: ['Full-day candid coverage', 'Emotion and detail shots', 'Colour-graded, retouched photos', 'Private online gallery'],
      b: ['Weddings', 'Pre-weddings', 'Family events', 'Celebrations'] },
    { p: 'film', t: 'Cinematic Videography', g: 'Your day, as a short film.',
      price: '₹8,000 / day', priceNote: 'Highlight film 3–4 min + 1 reel',
      d: 'Video shot and graded like a film, with music and sound that fit the mood of your day.',
      hi: ['Cinematic highlight film of 3 to 4 minutes', 'One reel for social media', 'Colour grading and sound design'],
      more: 'The cinematic highlight gives you the look and feel of a movie trailer for your day. Pair it with a drone add-on for scale and a full album for the stills.',
      i: ['Cinematic highlight film (3 to 4 minutes)', 'One reel for social media', 'Colour grading, music and sound design', 'Delivered in HD'],
      b: ['Weddings', 'Pre-weddings', 'Events', 'Brand stories'] },
    { p: 'heart', t: 'Pre-Wedding Photography', g: 'A shoot that feels like a day out.',
      price: ASK,
      d: 'Relaxed couple portraits at a location that suits you, ready for save-the-dates, invitations and your wedding display.',
      hi: ['A planning call before the shoot', 'Outdoor, heritage or studio locations', 'Outfit changes, with styling tips'],
      more: 'Most couples feel awkward for the first ten minutes. We keep the mood easy and only step in with direction when it helps, so the photos look like the two of you.',
      i: ['Location suggestions based on your taste', 'Posed portraits and candid walking frames', 'Photos sized for invitations and displays', 'Edited photos in a private gallery'],
      b: ['Save-the-dates', 'Invitations', 'Wedding display'] },
    { p: 'rings', t: 'Post-Wedding Photography', g: 'The couple shoot after the big day.',
      price: ASK,
      d: 'A calm, unhurried shoot once the wedding rush is over, with time for portraits in your wedding outfits.',
      hi: ['Relaxed shoot after the wedding', 'Portraits in your wedding outfits', 'Indoor or outdoor locations'],
      more: 'After the rituals and the crowd, a post-wedding shoot lets the two of you slow down and enjoy being newly married in front of the camera.',
      i: ['Couple portraits at a location you like', 'Posed and candid frames', 'Edited photos in a private gallery'],
      b: ['Newly married couples', 'Wedding outfits', 'Anniversaries'] },
    { p: 'drone', t: 'Drone & FPV Coverage', g: 'The view from above.',
      price: '₹5,000 / day', priceNote: 'FPV drone ₹7,000 / day',
      d: 'Aerial shots of the venue, the procession and the crowd, with dynamic FPV flights for a more cinematic feel.',
      hi: ['Standard drone coverage', 'FPV drone for fast, cinematic moves', 'Planned around weather and local rules'],
      more: 'Drone shots add scale to the venue and the procession. FPV flights glide through spaces and follow the action for a film-like look. Flying depends on local permissions and weather.',
      i: ['Aerial shots of venue and procession', 'FPV flights as an upgrade', 'Footage edited into your video', 'Delivered in HD'],
      b: ['Weddings', 'Pre-weddings', 'Events', 'Commercial shoots'] },
    { p: 'album', t: 'Albums & Photo Delivery', g: 'Photos you can hold.',
      price: '₹6,000', priceNote: 'Pendrive 64GB ₹1,000',
      d: 'A custom album of 90 to 110 photos on 20 sheets, designed so the story reads page by page.',
      hi: ['20 sheets, 90 to 110 photos', 'Matte or glossy, heavy paper', 'Lifetime Google Drive access for photos'],
      more: 'Choose a matte or glossy finish on heavy paper, with a bag or cover pages. More options are available. Your photos are also kept on Google Drive for lifetime access, and an original 64GB pendrive is available as an add-on.',
      i: ['Album of 20 sheets (90 to 110 photos)', 'Matte or glossy, heavy paper', 'Bag or cover page options', 'Google Drive access, lifetime (photos only)', 'Original 64GB pendrive: ₹1,000 extra'],
      b: ['Wedding albums', 'Family albums', 'Pendrive copies'] },
    { p: 'ring', t: 'Portrait Photography', g: 'You, at your most comfortable.',
      price: ASK,
      d: 'Portraits for individuals, couples and families, with guidance on where to stand and what to do with your hands.',
      hi: ['Studio or outdoor sessions', 'Posing guidance throughout', 'Natural retouching'],
      more: 'Most people dislike being photographed until someone tells them exactly what to do. We do that, then retouch gently so you still look like yourself.',
      i: ['Individual, couple and family portraits', 'Wardrobe and background advice', 'Retouched final images in a private gallery'],
      b: ['Individuals', 'Couples', 'Families', 'Professionals'] },
    { p: 'heart', t: 'Maternity Shoot', g: 'A quiet celebration of the wait.',
      price: ASK,
      d: 'Soft, comfortable portraits for expecting parents, shot at your pace with posing help throughout.',
      hi: ['Indoor, outdoor or studio', 'Gentle posing guidance', 'Partner and family frames welcome'],
      more: 'We keep the session short, relaxed and comfortable, with plenty of breaks, so you can enjoy it and the photographs look natural.',
      i: ['Solo and couple portraits', 'Outfit and location suggestions', 'Natural retouching', 'Private online gallery'],
      b: ['Expecting parents', 'Couples', 'Family portraits'] },
    { p: 'party', t: 'Birthday Shoot', g: 'Another year, beautifully kept.',
      price: ASK,
      d: 'Birthday parties and celebrations covered with candid moments, cake cutting, decor and family portraits.',
      hi: ['Candid party coverage', 'Cake cutting and key moments', 'Decor and family portraits'],
      more: 'From kids birthdays to milestone celebrations, we cover the fun without taking over the party.',
      i: ['Coverage of the key moments', 'Group and family portraits', 'Decor and detail shots', 'Edited gallery'],
      b: ['Kids birthdays', 'Milestone birthdays', 'Surprise parties'] },
    { p: 'party', t: 'Baby Shower', g: 'The joy before the arrival.',
      price: ASK,
      d: 'Rituals, games, decor and family moments from your baby shower, captured warmly and naturally.',
      hi: ['Rituals, games and decor', 'Candid family moments', 'Group portraits'],
      more: 'Baby showers are full of small, happy details. We capture the rituals, the laughter and the people who came to celebrate with you.',
      i: ['Coverage of the full function', 'Family and group portraits', 'Decor and detail shots', 'Edited gallery'],
      b: ['Godh bharai', 'Baby showers', 'Family gatherings'] },
    { p: 'party', t: 'Event Photography', g: 'Every guest, without the fuss.',
      price: ASK,
      d: 'Engagements, anniversaries and gatherings covered quietly, so people stay relaxed and the pictures look it.',
      hi: ['Candid coverage of key moments', 'Group and family portraits', 'Venue, decor and detail shots'],
      more: 'We arrive early to check the light and the venue, then work around the programme instead of interrupting it. A quick preview of the best frames follows soon after the event.',
      i: ['Coverage of the key moments of the programme', 'Group and family portraits', 'Venue, decor and detail shots', 'Quick preview, then the full edited gallery'],
      b: ['Engagements', 'Anniversaries', 'Family functions', 'Celebrations'] },
    { p: 'cam', t: 'Corporate Shoot', g: 'Professional, on brand, on time.',
      price: ASK,
      d: 'Office events, team portraits, headshots and conferences, photographed cleanly and delivered fast.',
      hi: ['Team and leadership portraits', 'Conferences and office events', 'Quick turnaround'],
      more: 'We work around your schedule with minimal disruption, and deliver consistent, professional images you can use on your website, LinkedIn and presentations.',
      i: ['Headshots and team portraits', 'Event and conference coverage', 'Workplace and product detail shots', 'Edited images for web and print'],
      b: ['Headshots', 'Conferences', 'Office events', 'Team photos'] },
    { p: 'cam', t: 'Commercial Ads', g: 'Visuals that sell.',
      price: ASK,
      d: 'Photo and video for brands, products and advertising, planned around your message and your audience.',
      hi: ['Product and brand photography', 'Ad films and short promo videos', 'Planned around your campaign'],
      more: 'Tell us what you are selling and where the ad will run. We plan the look, the shots and the format, then shoot and edit it for your channel.',
      i: ['Product and lifestyle photography', 'Short ad films and promo reels', 'Editing and colour grading', 'Formats for social media and print'],
      b: ['Product shoots', 'Brand films', 'Social media ads', 'Promos'] },
  ],
  pricing: {
    title: 'Packages and rates',
    sub: 'A simple starting point. Rates are per day unless noted, and we can mix and match for your event.',
    base: {
      title: 'Basic package',
      items: [
        { t: 'Traditional photos', v: '₹3,500 / day' },
        { t: 'Traditional video', v: '₹4,500 / day' },
        { t: 'Reels (2+ reels)', v: '₹3,000 / day' },
        { t: 'Album: 20 sheets, 90 to 110 photos', v: '₹6,000' },
        { t: 'Google Drive access (lifetime, photos only)', v: 'Included' },
        { t: 'Original 64GB pendrive', v: '₹1,000' },
      ],
      totalLabel: 'Package total',
      total: '₹17,800',
    },
    options: {
      title: 'Add-on options',
      items: [
        { t: 'Candid photos', v: '₹5,000 / day' },
        { t: 'Cinematic highlight (3 to 4 min video + 1 reel)', v: '₹8,000 / day' },
        { t: 'Drone', v: '₹5,000 / day' },
        { t: 'FPV drone', v: '₹7,000 / day' },
      ],
    },
    note: 'Rates may change with location, number of days and customisation. Message us for a quote.',
  },
  edit: {
    title: 'Raw on the left, finished on the right.',
    sub: 'Drag the slider. We fix colour, balance the exposure and clean up skin. We do not overdo it.',
    chips: ['Colour grading', 'Skin retouching', 'Exposure balance', 'One consistent look'],
  },
  process: {
    title: 'How a booking works',
    steps: [
      { t: 'Enquire', d: 'Send us your date, venue and the kind of shoot you want.' },
      { t: 'Plan', d: 'We agree on locations, timings and the moments you cannot miss.' },
      { t: 'Shoot', d: 'Natural light, simple direction and room for candid moments.' },
      { t: 'Deliver', d: 'Edited photos in a private online gallery.' },
    ],
  },
}

// ===== Contact page =====
export const CONTACT_PAGE = {
  title: "Let's talk about your day.",
  sub: "Tell us the occasion and the date. We'll tell you what we'd recommend.",
  formTitle: 'Book a shoot',
  formSub: "Fill this in and we'll get back to you.",
  endpoint: '', // Express/Nodemailer ka URL daalo (POST, JSON). Khali ho to WhatsApp khulega.
  faqTitle: 'Before you write',
  faq: [
    { q: 'How early should I book?', a: "As early as you can, especially for wedding dates. Send us your date and we'll let you know if we're free." },
    { q: 'What should I put in my enquiry?', a: 'The date, the venue or city, and the kind of shoot you want. A line about your style or ideas helps too.' },
    { q: 'Can I book more than one service?', a: "Yes. Many couples combine wedding photography with a film and an album. Mention it in your message and we'll plan it together." },
  ],
}