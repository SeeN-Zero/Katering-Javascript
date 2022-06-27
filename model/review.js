const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Senna Annaba Ahmad'
  },
  content: {
    type: String,
    required: true,
    default: 'Keren Sih, Gak Nyesel!'
  }
})
const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
