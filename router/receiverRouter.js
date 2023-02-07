const express = require('express');

const receiverController = require('../controller/receiverController');

const router = express.Router();

router.route('/documents/:id').get(receiverController.getReceivedDocuments);

router.route('/messages/:id').get(receiverController.getReceivedMessages);

module.exports = router;
