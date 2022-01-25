const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const BookingController = require('../Controllers/BookingController');

router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/BookingValidation');
const auth = require('../Middlewares/auth');

/**
 * @swagger
 *  components:
 *     schemas:
 *          Booking:
 *              type: object
 *              required:
 *                - user_id
 *                - schedule_id
 *                - total_seats
 *              properties:
 *                  id:
 *                     type: integer
 *                  user_id:
 *                      type: integer
 *                  schedule_id:
 *                      type: integer
 *              example:
 *                  id: 1
 *                  user_id: LEL 2
 *                  schedule_id: 30
 */

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: APIs for user Bookings
 */

/**
 * @swagger
 * /api/booking/create:
 *  post:
 *      Summary: Allow the user to create new booking.
 *      tags:
 *        - Bookings
 *      Description: The API create a new entry for the plane.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Booking'
 *      responses:
 *           200:
 *              description: Booking schema is returned in the response.
 */

router.post(
  '/create',
  [validate.create, auth.getToken, auth.verifyToken, auth.verifyUser],
  BookingController.create
);

/**
 * @swagger
 *  components:
 *      Bookings:
 *          example:
 *              user_id: 2
 */

/**
 * @swagger
 * /api/booking/get:
 *  post:
 *      Summary: To get the available bookings of the user.
 *      tags:
 *        - Bookings
 *      Description: This API return the available bookings according to the user id.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Booking'
 *      responses:
 *           200:
 *              description: Booking schema is returned in the response.
 */

router.post(
  '/get',
  [validate.get, auth.getToken, auth.verifyToken, auth.verifyUser],
  BookingController.getBookingDetails
);

router.post(
  '/update',
  [auth.getToken, auth.verifyToken, auth.verifyUser],
  BookingController.update
);

/**
 * @swagger
 *  components:
 *      Bookings:
 *          example:
 *              user_id: 2
 *              id: 1
 */

/**
 * @swagger
 * /api/booking/delete:
 *  post:
 *      Summary: To delete the booking of the user.
 *      tags:
 *        - Bookings
 *      Description: This API delete the booking.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Booking'
 *      responses:
 *           200:
 *              description: Delete response is returned in the response.
 */
router.post(
  '/delete',
  [validate.destroy, auth.getToken, auth.verifyToken, auth.verifyUser],
  BookingController.deleteBooking
);

module.exports = router;
