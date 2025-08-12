

// src/api/register.js
const express = require('express');
const { register } = require('../controllers/authControllers');
const router = express.Router();

router.post('/', register);
module.exports = router;

