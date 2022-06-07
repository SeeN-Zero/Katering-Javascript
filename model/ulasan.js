const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  ulasan: {
    type: String,
    required: true
  }
})
const Ulasan = mongoose.model('Ulasan', userSchema)
module.exports = Ulasan
