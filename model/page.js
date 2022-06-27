const mongoose = require('mongoose')
const pageSchema = new mongoose.Schema({
  setting: {
    type: String,
    immutable: true,
    required: true,
    unique: true,
    default: 'setting'
  },
  title: {
    type: String,
    required: true,
    default: 'Title'
  },
  logo: {
    data: Buffer,
    contentType: String
  },
  header: {
    type: String,
    required: true,
    default: 'Header'
  },
  subheader: {
    type: String,
    required: true,
    default: 'Subheader'
  },
  about: {
    type: String,
    required: true,
    default: 'About'
  },
  address: {
    type: String,
    required: true,
    default: 'Alamat'
  },
  number: {
    type: String,
    required: true,
    default: 'Hp'
  }

})

const Page = mongoose.model('Page', pageSchema)
module.exports = Page
