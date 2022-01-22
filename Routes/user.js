const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const bodyParser = require('body-parser');
const userController = require('../Controllers/UserController');
router.use(bodyParser.urlencoded({ extended: true }));
const validate = require('../Middlewares/UserValidations');

router.post('/signup', [validate.signup], userController.create);

router.post('/login', [validate.login], userController.login);

router.post('/verify', [validate.emailVerification], userController.verifyEmail)


router.post('/updatePassword', [
    validate.updatePassword,
    auth.getToken,
    auth.verifyToken,
]
    , userController.updatePassword);




module.exports = router;
