const File = require('../model/fileModel');
const Message = require('../model/messageModel');
const User = require('../model/userModel');

const authController = require('../controller/authController');

exports.loadDocuments = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const documents = await File.find({ receiver: user.username });

    if (!documents) {
      res.status(404).render('error');
    }

    res.status(200).render('loadDocuments', {
      documents,
      currentUser: authController.getLoggedInUser(),
    });
  } catch (err) {
    res.status(404).render('error');
  }
};

exports.loadMessages = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const messages = await Message.find({ receiver: user.username });

    if (!messages) {
      res.status(404).render('error');
    }

    res.status(200).render('loadMessages', {
      messages,
      currentUser: authController.getLoggedInUser(),
    });
  } catch (err) {
    res.status(404).render('error');
  }
};

exports.viewDetails = async (req, res) => {
  try {
    const fileName = String(req.params.fileName).split('-')[1];
    const user = String(req.params.fileName).split('-')[0];

    const document = await File.findOne({
      name: fileName,
      receiver: user,
    });

    res.status(200).render('fileDetailsCard', {
      document,
    });
  } catch (err) {
    res.status(404).render('error');
  }
};

exports.howItWorks = (req, res) => {
  try {
    res.status(200).render('howItWorks');
  } catch (err) {
    res.status(404).render('error');
  }
};

exports.signup = (req, res) => {
  try {
    res.status(200).render('signUp');
  } catch (err) {
    res.status(404).render('error');
  }
};

exports.logIn = (req, res) => {
  try {
    res.status(200).render('logIn');
  } catch (err) {
    res.status(404).render('error');
  }
};

exports.overview = (req, res) => {
  try {
    res.status(200).render('overview', {
      currentUser: authController.getLoggedInUser(),
    });
  } catch (err) {
    res.status(404).render('error');
  }
};
