const check = require('express-validator').check;
const { validationResult } = require("express-validator");


exports.create = [
    check('user_id').notEmpty().isNumeric(),
    check('schedule_id').notEmpty().isNumeric(),
    check('state').notEmpty().isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.get = [
    check('user_id').notEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
]

exports.destroy = [
    check('id').notEmpty().isNumeric(),
    check('user_id').notEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
]