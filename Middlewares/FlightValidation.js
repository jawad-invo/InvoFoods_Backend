const check = require('express-validator').check;
const { validationResult } = require("express-validator");

exports.create = [
    check('name').notEmpty().isString().isLength({ min: 1, max: 40 }),
    check('plane_number').notEmpty().isString().isLength({ min: 1, max: 40 }),
    check('total_seats').notEmpty().isNumeric(),
    check('seats_left').notEmpty().isNumeric(),
    check('class_id').notEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.destroy = [
    check('id').notEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];