// src/api/login.js
const express = require('express');
const { login, logout } = require('../controllers/authControllers');
const router = express.Router();

router.post('/', login);
router.post('/logout', logout);
module.exports = router;
