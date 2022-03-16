const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {upload, viewPageSetting, updatePage} = require('../controller/pageController');

router.get('/pagesetting', protectRoute, viewPageSetting);
router.post('/pagesetting/update/:id', protectRoute, upload.single('logo'), updatePage);

module.exports = router;
