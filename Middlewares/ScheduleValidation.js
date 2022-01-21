
const check = require('express-validator').check;
module.exports = createValidation = [
    check('flight_id').notEmpty().isNumeric(),
    check('take_of_at').notEmpty().isDate(),
    check('land_in_at').notEmpty().isDate(),
    check('class_id').notEmpty().isNumeric()
]