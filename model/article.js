const mongoose = require('mongoose')
const moment = require('moment')
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: moment(new Date(Date.now())).format('ll')
  },
  author: {
    type: String,
    required: true
  }
})

const Article = mongoose.model('Article', articleSchema)
module.exports = Article
