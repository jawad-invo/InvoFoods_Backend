const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const bodyParser = require('body-parser');
const userController = require('../Controllers/UserController');
router.use(bodyParser.urlencoded({ extended: true }));
const models = require('../models');
const User = models.User;

const validate = require('../Middlewares/SignupValidation');

router.post('/signup', validate , userController.create);

router.post('/login', auth.verifyToken, userController.login);



module.exports = router;
