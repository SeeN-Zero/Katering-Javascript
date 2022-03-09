const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {upload, viewDash, addProduk, deleteProduk, updateProduk, viewUpdate} = require('../controller/produkController')

router.get('/dash', protectRoute, viewDash);
router.post('/dash', protectRoute, upload.single('image'), addProduk);
router.get('/dash/delete/:id', protectRoute, deleteProduk);
router.get('/dash/update/:id', protectRoute, viewUpdate);
router.post('/dash/update/:id', protectRoute, upload.single('image'), updateProduk);


module.exports = router;
