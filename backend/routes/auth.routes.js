const express = require("express");
const { signup, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;