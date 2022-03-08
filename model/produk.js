const mongoose = require("mongoose");
const produkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

const Produk = mongoose.model("Produk", produkSchema);
module.exports = Produk;