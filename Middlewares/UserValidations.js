
const check = require('express-validator').check;
const { validationResult } = require("express-validator");


exports.signup = [
    check('name').notEmpty().isLength({ min: 2, max: 20 }).isString(),
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isLength({ min: 6, max: 30 }),
    check('gender').notEmpty().isIn(['Male', 'Femail']),
    check('age').notEmpty().isNumeric().isLength({ min: 1, max: 3 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.login = [
    check('email').notEmpty().isEmail(),
    check('password').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
]

exports.updatePassword = [
    check('id').notEmpty().isNumeric(),
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isLength({ min: 6, max: 30 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
