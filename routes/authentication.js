const express = require('express');
const router = express.Router();
const {authView, auth} = require('../controller/authController');

router.get('/auth', authView);
router.post('/auth', auth);

module.exports = router;
