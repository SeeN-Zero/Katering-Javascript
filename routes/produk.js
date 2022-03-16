const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {upload, viewProduk, addProduk, deleteProduk, updateProduk} = require('../controller/produkController')

router.get('/produk', protectRoute, viewProduk);
router.post('/produk/add', protectRoute, upload.single('image'), addProduk);
router.get('/produk/delete/:id', protectRoute, deleteProduk);
router.post('/produk/update/:id', protectRoute, upload.single('image'), updateProduk);

module.exports = router;
