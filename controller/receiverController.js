const File = require('../model/fileModel');
const Message = require('../model/messageModel');

exports.getReceivedDocuments = async (req, res, next) => {
  try {
    const receivedDocuments = await File.find({ receiver: req.params.id });

    if (!receivedDocuments) {
      res.status(404).json({
        status: 'fail',
        message: 'Failed to fetch received documents.',
      });

      return next();
    }

    res.status(200).json({
      status: 'success',
      results: receivedDocuments.length,
      data: receivedDocuments,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Failed to fetch received documents.',
    });
  }

  next();
};

exports.getReceivedMessages = async (req, res, next) => {
  try {
    const receivedMessages = await Message.find({ receiver: req.params.id });

    if (!receivedMessages) {
      res.status(404).json({
        status: 'fail',
        message: 'Failed to fetch received messages.',
      });

      return next();
    }

    res.status(200).json({
      status: 'success',
      results: receivedMessages.length,
      data: receivedMessages,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Failed to fetch received messages.',
    });
  }

  next();
};
