const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = process.env.DB_URI;
mongoose.connect(db)
    .then(console.log('Connected'))
    .catch(err => console.log(err));

module.exports = mongoose;


