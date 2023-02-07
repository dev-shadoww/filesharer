const express = require('express');

const messageController = require('../controller/messageController');

const router = express.Router();

router
  .route('/')
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);

module.exports = router;
