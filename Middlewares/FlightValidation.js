const check = require('express-validator').check;
const { validationResult } = require("express-validator");

exports.create = [
    check('name')
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 40 }),
    check('plane_number')
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 40 }),
    check('total_seats')
        .notEmpty().isNumeric(),
    check('seats_left')
        .notEmpty()
        .isNumeric(),
    check('class_id')
        .notEmpty()
        .isNumeric(),
    sendResponse
];

exports.destroy = [
    check('id')
        .notEmpty()
        .isNumeric(),
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