const Message = require('../model/messageModel');

exports.getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();

    res.status(200).json({
      message: 'success',
      results: messages.length,
      data: messages,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: `Messages fetch failed.`,
    });
  }

  next();
};

exports.createMessage = async (req, res, next) => {
  try {
    const newMessage = await Message.create(req.body);

    res.status(200).json({
      message: 'success',
      data: newMessage,
    });
  } catch (err) {
    res.status(404).json({
      message: 'fail',
      error: `Message creation failed.`,
    });
  }

  next();
};
