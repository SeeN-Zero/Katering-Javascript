const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {
    viewArtikel,
    addArtikel,
    updateArtikel,
    deleteArtikel,
    viewArtikelAdd,
    viewArtikelEdit
} = require("../controller/artikelController")

router.get('/artikel', protectRoute, viewArtikel);
router.get('/artikelAdd', protectRoute, viewArtikelAdd);
router.get('/artikelEdit/:id', protectRoute, viewArtikelEdit);
router.post('/artikelAdd/add', protectRoute, addArtikel);
router.get('/artikel/delete/:id', protectRoute, deleteArtikel);
router.post('/artikelEdit/update/:id', protectRoute, updateArtikel);

module.exports = router;
