const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is not specified.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is not specified.'],
    validator: [validator.isEmail, 'Email is not valid.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is not specified.'],
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Enter password once again to confirm.'],
  //   validator: {
  //     validate: function (currentElement) {
  //       // Only works on save
  //       return currentElement === this.password;
  //     },
  //   },
  // },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (
  passedPassword,
  userPassword
) {
  return await bcrypt.compare(passedPassword, userPassword);
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
