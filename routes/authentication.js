const express = require('express');
const router = express.Router();
const {authView, auth, updateView, updateUser, logout} = require('../controller/authController');
const {protectRoute, redirectRoute} = require("../auth/authview");

router.get('/auth', redirectRoute, authView);
router.post('/auth', redirectRoute, auth);
router.get('/accsetting', protectRoute, updateView);
router.post('/logout', protectRoute, logout);
router.post('/accsetting', protectRoute, updateUser);

module.exports = router;
