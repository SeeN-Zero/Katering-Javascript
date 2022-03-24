const mongoose = require("mongoose");
const artikelSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    isi: {
        type: String,
        required: true,
    },
    tanggal: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
    },
});

const Artikel = mongoose.model("Artikel", artikelSchema);
module.exports = Artikel;