const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const moment = require('moment')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: moment(new Date(Date.now())).format('ll')
  }
})

userSchema.plugin(passportLocalMongoose, { usernameLowerCase: true })
const User = mongoose.model('User', userSchema)
module.exports = User
