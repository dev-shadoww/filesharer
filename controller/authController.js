const { promisify } = require('util');

const User = require('../model/userModel');

const jwt = require('jsonwebtoken');

let loggedInUser;

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    loggedInUser = newUser._id;

    res.status(200).json({
      status: 'success',
      id: newUser._id,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Failed to sign up.',
    });
  }

  next();
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        status: 'fail',
        message: 'Email or Password is incorrect.',
      });

      return next();
    }

    const user = await User.findOne({ email }).select('+password');

    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      res.status(404).json({
        status: 'fail',
        message: 'Email or Password is incorrect.',
      });

      return next();
    }

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: `No user with this email ${email}.`,
      });

      return next();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });

    loggedInUser = user._id;

    res.status(200).json({
      status: 'success',
      id: user._id,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Failed to login.',
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      res.status(404).json({
        status: 'fail',
        message: 'User not logged in.',
      });

      return next();
    }

    const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await findById(decoded.id);

    if (!currentUser) {
      res.status(404).json({
        status: 'fail',
        message: 'No user found.',
      });

      return next();
    }

    req.user = currentUser;
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Failed to signIn.',
    });
  }
};

exports.loggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      res.locals.user = loggedInUser = currentUser;
      return next();
    }
    next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Failed to signIn.',
    });
  }
};

exports.getLoggedInUser = function () {
  return loggedInUser;
};
