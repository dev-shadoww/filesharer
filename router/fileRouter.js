const express = require('express');
const fileController = require('../controller/fileController');
const router = express.Router();

router
  .route('/')
  .get(fileController.getAllSendRequests)
  .post(fileController.uploadFile, fileController.createSendRequest);

router
  .route('/:id')
  .get(fileController.getSendRequest)
  .patch(fileController.updateSendRequest)
  .delete(fileController.deleteSendRequest);

module.exports = router;
