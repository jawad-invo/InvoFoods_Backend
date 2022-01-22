
const check = require('express-validator').check;
const { validationResult } = require("express-validator");
const models = require('../models');
const User = models.User;

exports.signup = [
    check('name')
        .notEmpty()
        .isLength({ min: 2, max: 20 })
        .isString(),
    check('email')
        .notEmpty()
        .isEmail()
        .custom(value => {
            return User.findOne({where:{email:value}}).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        }),
    check('password')
        .notEmpty()
        .isLength({ min: 6, max: 30 }),
    check('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    check('gender')
        .notEmpty()
        .isIn(['Male', 'Female']),
    check('age')
        .notEmpty()
        .isNumeric()
        .isLength({ min: 1, max: 3 }),
    sendResponse
];

exports.login = [
    check('email')
        .notEmpty()
        .isEmail(),
    check('password')
        .notEmpty(),
    sendResponse
]

exports.updatePassword = [
    check('email')
        .notEmpty()
        .isEmail(),
    check('new_password')
        .notEmpty()
        .isLength({ min: 6, max: 30 }),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    check('old_password')
        .notEmpty()
        .isLength({ min: 6, max: 30 }),
    sendResponse
];

exports.emailVerification = [
    check('verification_code')
        .notEmpty()
        .isNumeric()
        .isLength(4)
        .withMessage("Verification code must be of 4 digits"),
    check('email')
        .notEmpty()
        .isEmail(),
    sendResponse
];


function sendResponse(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ message: extractedErrors[0] });
}


