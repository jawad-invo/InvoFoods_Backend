const { check } = require('express-validator');
const { validationResult } = require('express-validator');

function sendResponse(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({ message: extractedErrors[0] });
}

exports.createValidation = [
  check('flight_id').notEmpty().isNumeric(),
  check('take_of_at').notEmpty().isDate(),
  check('land_in_at').notEmpty().isDate(),
  check('class_id').notEmpty().isNumeric(),
  check('user_id').notEmpty().isNumeric(),

  sendResponse,
];

exports.getValidation = [
  check('from').optional().isDate({ format: 'YYYY-MM-DD' }),
  check('to').optional().isDate({ format: 'YYYY-MM-DD' }),
  check('take_of_at').optional().isDate({ format: 'YYYY-MM-DD' }),
  check('place').optional().isString(),
  check('class').optional().isNumeric(),
  sendResponse,
];

exports.updateValidation = [
  check('id').notEmpty().isNumeric(),
  check('flight_id').notEmpty().isNumeric(),
  check('user_id').notEmpty().isNumeric(),
  sendResponse,
];

exports.deleteValidation = [
  check('id').notEmpty().isNumeric(),
  check('user_id').notEmpty().isNumeric(),
  sendResponse,
];
