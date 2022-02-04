const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const auth = require('../Middlewares/auth');
const userController = require('../Controllers/UserController');
const validate = require('../Middlewares/UserValidations');

router.post('/signup', [validate.signup], userController.create);

router.post('/login', [validate.login], userController.login);

router.post(
  '/verify',
  [validate.emailVerification],
  userController.verifyEmail
);

router.post(
  '/updatePassword',
  [
    validate.updatePassword,
    auth.getToken,
    auth.verifyToken,
    auth.updatePassword,
  ],
  userController.updatePassword
);

module.exports = router;
