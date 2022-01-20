const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const BookingController = require('../Controllers/BookingController');
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/create', validate, BookingController.create);

router.post('/get', BookingController.getBookingDetails);

router.post('/update', BookingController.update);

router.post('/delete', BookingController.deleteBooking);

module.exports = router;