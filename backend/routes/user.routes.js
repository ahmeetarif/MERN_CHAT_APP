const express = require('express');

const router = express.Router();

// MARK : Controllers
const {getUsers} = require('../controllers/user.controller.js');

router.get('/', getUsers);

module.exports = router;