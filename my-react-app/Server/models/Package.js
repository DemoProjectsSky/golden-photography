const mongoose = require('mongoose')
const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [String],
  order: { type: Number, default: 0 },
})
module.exports = mongoose.model('Package', packageSchema)