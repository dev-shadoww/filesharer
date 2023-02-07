const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, 'Sender name is not specified.'],
  },
  receiver: {
    type: String,
    required: [true, 'Receiver name is not specified.'],
  },
  message: {
    type: String,
    required: [true, 'Message is not specified.'],
    maxlength: [30, 'Max length for message is 30 characters.'],
    minlength: [1, 'Min length for message is 1 character.'],
  },
  sentAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = new mongoose.model('Message', messageSchema);

module.exports = Message;
