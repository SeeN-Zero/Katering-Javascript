const mongoose = require('mongoose')
const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    default: 'code'
  },
  number: {
    type: String,
    required: true,
    default: '102938'
  }
})
const Code = mongoose.model('Code', codeSchema)
module.exports = Code
