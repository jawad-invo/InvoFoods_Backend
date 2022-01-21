const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const BookingController = require('../Controllers/BookingController');
router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/BookingValidation');
const auth = require('../Middlewares/auth');
const middleware = require('../Middlewares/Booking');

router.post('/create', [
    validate.create,
    auth.getToken,
    auth.verifyToken,
    // middleware.checkSchedule
],
    BookingController.create);

router.post('/get', validate.get, BookingController.getBookingDetails);

router.post('/update', BookingController.update);

router.post('/delete', validate.destroy, BookingController.deleteBooking);

module.exports = router;