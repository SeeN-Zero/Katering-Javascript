const express = require('express');
const router = express.Router();
const {protectRoute} = require("../auth/authview");
const {viewUlasan, getCode, addUlasan, deleteUlasan} = require("../controller/ulasanController");

router.get('/ulasan', protectRoute, viewUlasan);
router.get('/token', protectRoute, getCode);
router.post('/addulasan', addUlasan);
router.get('/deleteulasan/:id', protectRoute, deleteUlasan);

module.exports = router;
