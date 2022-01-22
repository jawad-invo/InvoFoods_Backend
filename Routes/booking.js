const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const BookingController = require('../Controllers/BookingController');
router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/BookingValidation');
const auth = require('../Middlewares/auth');

router.post('/create', [
    validate.create,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser
],
    BookingController.create);

router.post('/get', [
    validate.get,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser
],
    BookingController.getBookingDetails);

router.post('/update', [
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser
],
    BookingController.update);

router.post('/delete', [
    validate.destroy,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser
],
    BookingController.deleteBooking);

module.exports = router;