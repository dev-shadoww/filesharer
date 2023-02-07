const express = require('express');

const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
const app = require('../app');

const router = express.Router();

router.route('/').get(viewController.overview);

router.route('/signUp').get(viewController.signup);
router.route('/login').get(viewController.logIn);

router.route('/how-it-works').get(viewController.howItWorks);

// router.use(authController.loggedIn);

router.route('/user-files/:id').get(viewController.loadDocuments);
router.route('/user-messages/:id').get(viewController.loadMessages);

router.route('/user-files/:user/:fileName').get(viewController.viewDetails);

module.exports = router;
