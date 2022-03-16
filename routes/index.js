const express = require('express');
const router = express.Router();
const {viewIndex} = require('../controller/indexController');

router.get('/', viewIndex);

module.exports = router;
