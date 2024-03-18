const express = require('express');
const router = express.Router();

const { sendMessage, getMessages } = require('../controllers/message.controller.js');

router.get('/:id', getMessages)
router.post('/send/:id', sendMessage);

module.exports = router;