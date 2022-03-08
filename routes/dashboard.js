const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {indexView} = require("../controller/indexController");

router.get('/dash', protectRoute, indexView);

module.exports = router;
