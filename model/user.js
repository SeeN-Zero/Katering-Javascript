const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

userSchema.plugin(passportLocalMongoose, {usernameLowerCase: true});
const User = mongoose.model("User", userSchema);
module.exports = User;