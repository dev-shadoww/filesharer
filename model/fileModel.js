const mongoose = require('mongoose');

const slugify = require('slugify');

const fileSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, 'Sender name is not specified.'],
  },
  receiver: {
    type: String,
    required: [true, 'Receiver name is not specified.'],
  },
  name: {
    type: String,
    required: [true, 'File name not specified.'],
    unique: true,
  },
  file: {
    type: String,
  },
  locationOfFile: {
    type: String,
    required: [true, 'File location not specified.'],
  },
  type: {
    type: String,
    enum: ['txt', 'jpeg', 'png'],
    default: 'jpeg',
    required: [true, 'File type not specified.'],
  },
  compressionType: {
    type: String,
    enum: ['gzip', 'rar', 'zip'],
    default: 'gzip',
    required: [true, 'Compression type not specified.'],
  },
  message: {
    type: String,
    required: [true, 'Message is not specified.'],
  },
  sentAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
  },
});

fileSchema.pre('save', function (next) {
  const valueForSlug = this.receiver + '-' + this.name;
  this.slug = slugify(valueForSlug, { lower: true });
  console.log(this.slug);
  next();
});

const File = new mongoose.model('File', fileSchema);

module.exports = File;
