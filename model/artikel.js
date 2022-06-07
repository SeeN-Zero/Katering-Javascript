const mongoose = require('mongoose')
const moment = require('moment')
const artikelSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  isi: {
    type: String,
    required: true
  },
  tanggal: {
    type: String,
    default: moment(new Date(Date.now())).format('ll')
  },
  author: {
    type: String,
    required: true
  }
})

const Artikel = mongoose.model('Artikel', artikelSchema)
module.exports = Artikel
