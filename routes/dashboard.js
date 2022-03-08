const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {upload, viewDash, addProduk, deleteProduk} = require('../controller/produkController')

router.get('/dash', protectRoute, viewDash);
router.post('/dash', protectRoute, upload.single('image'), addProduk);
router.get('/dash/delete/:id', protectRoute, deleteProduk);

module.exports = router;
