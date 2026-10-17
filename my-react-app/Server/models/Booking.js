const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  shootType: { type: String, required: true },
  date: { type: Date },
  message: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ['new', 'contacted', 'confirmed', 'closed'], default: 'new' },
}, { timestamps: true })
module.exports = mongoose.model('Booking', bookingSchema)