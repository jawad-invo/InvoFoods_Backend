
const check = require('express-validator').check;
module.exports = [
    check('name').notEmpty().isLength({ min: 2, max: 20 }).isString(),
    check('email').notEmpty().isEmail(),
    check('password').notEmpty().isLength({ min: 6, max: 30 }),
    check('gender').notEmpty().isIn(['Male', 'Femail']),
    check('age').notEmpty().isNumeric().isLength({ min: 1, max: 3 })
]