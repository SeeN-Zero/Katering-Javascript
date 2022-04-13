const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
});
const Code = mongoose.model("Code", userSchema);
module.exports = Code;