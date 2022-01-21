const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const BookingController = require('../Controllers/BookingController');
router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/BookingValidation');

router.post('/create', validate.create, BookingController.create);

router.post('/get', validate.get, BookingController.getBookingDetails);

router.post('/update', BookingController.update);

router.post('/delete', validate.destroy, BookingController.deleteBooking);

module.exports = router;