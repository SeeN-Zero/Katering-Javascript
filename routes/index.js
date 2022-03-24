const express = require('express');
const router = express.Router();
const {viewIndex, artikelBlogView} = require('../controller/indexController');

router.get('/', viewIndex);
router.get('/showArtikel/:id', artikelBlogView);

module.exports = router;
