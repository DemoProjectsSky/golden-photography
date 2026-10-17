// Content.js me sabse neeche paste karo (CONTACT aur FOOTER pehle se hain, wahi use hote hain)
export const CONTACT_PAGE = {
  title: "Let's talk about your day.",
  sub: "Tell us the occasion and the date. We'll tell you what we'd recommend.",
  hint: 'MOVE YOUR MOUSE TO TILT THE SCENE',
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