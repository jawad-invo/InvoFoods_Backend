const check = require('express-validator').check;
const { validationResult } = require("express-validator");


exports.create = [
    check('user_id')
        .notEmpty()
        .isNumeric(),
    check('schedule_id')
        .notEmpty()
        .isNumeric(),
    check('state')
        .notEmpty()
        .isString(),
    sendResponse
];

exports.get = [
    check('user_id')
        .notEmpty()
        .isNumeric(),
    sendResponse
]

exports.destroy = [
    check('id')
        .notEmpty()
        .isNumeric(),
    check('user_id')
        .notEmpty()
        .isNumeric(),
    sendResponse
]

function sendResponse(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array({ onlyFirstError: true }).map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ message: extractedErrors[0] });
}