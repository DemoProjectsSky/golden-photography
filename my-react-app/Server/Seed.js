require('dotenv').config()
const mongoose = require('mongoose')
const Package = require('./models/Package')
const data = [
  { name: 'STARTER', price: 9999, order: 1, features: ['2 hour shoot', '30 edited photos', 'Online gallery'] },
  { name: 'SIGNATURE', price: 24999, order: 2, features: ['Full day coverage', '150 edited photos', 'Highlight reel'] },
  { name: 'CINEMATIC', price: 49999, order: 3, features: ['2 photographers', 'Wedding film + album', 'Drone coverage'] },
]
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Package.deleteMany({}); await Package.insertMany(data)
  console.log('Packages seeded'); process.exit(0)
}).catch(e => { console.error(e.message); process.exit(1) })