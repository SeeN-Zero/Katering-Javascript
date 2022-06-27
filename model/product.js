const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    data: Buffer,
    contentType: String
  }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
