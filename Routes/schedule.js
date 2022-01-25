const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const scheduleController = require('../Controllers/ScheduleController');

router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/ScheduleValidation');
const auth = require('../Middlewares/auth');

/**
 * @swagger
 *  components:
 *     schemas:
 *          Schedule:
 *              type: object
 *              required:
 *                - name
 *                - email
 *                - password
 *                - age
 *                - gender
 *              properties:
 *                  id:
 *                     type: integer
 *                  flight_id:
 *                      type: integer
 *                  take_of_at:
 *                      type: date
 *                  land_in_at:
 *                      type: date
 *                  class_id:
 *                      type: integer
 *                  place:
 *                      type: string
 *                  user_id:
 *                      type: integer
 *              example:
 *                  flight_id: Jawad
 *                  take_of_at: Jawad@gmail.com
 *                  land_in_at: 1234567
 *                  class_id: Male
 *                  place: 24
 *                  user_id: 1234
 */

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: APIs for schedule management
 */

/**
 * @swagger
 * /api/schedule/create:
 *  post:
 *      Summary: To create a new schedule for flights.
 *      tags:
 *        - Flights
 *      Description: The API create a new schedule of a flight.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Schedule'
 *      responses:
 *           200:
 *              description: Schedule schema is returned in the response.
 */

router.post(
  '/create',
  [
    validate.createValidation,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser,
    auth.isAdmin,
  ],
  scheduleController.create
);

/**
 * @swagger
 *  components:
 *      GetSchedule:
 *          example:
 *              from: Jawad
 *              to: Jawad@gmail.com
 *              take_of_at: 1234567
 *              place: Male
 *              class_id: 24
 */

/**
 * @swagger
 * /api/schedule/get:
 *  post:
 *      Summary: To get the available flight schedules
 *      tags:
 *        - Flights
 *      Description: This API return the available flight schedules according to the applied filters.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/GetSchedule'
 *      responses:
 *           200:
 *              description: Schedule schema is returned in the response.
 */

router.post(
  '/get',
  [auth.getToken, auth.verifyToken, validate.getValidation],
  scheduleController.get
);

/**
 * @swagger
 *  components:
 *      UpdateSchedule:
 *          example:
 *              id: 1
 *              flight_id: 2
 */

/**
 * @swagger
 * /api/schedule/update:
 *  post:
 *      Summary: To update any schedule - By Admin role only
 *      tags:
 *        - Flights
 *      Description: This API allows the admin to update any schedule.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/UpdateSchedule'
 *      responses:
 *           200:
 *              description: Schedule schema is returned in the response.
 */

router.post(
  '/update',
  [
    validate.updateValidation,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser,
    auth.isAdmin,
  ],
  scheduleController.update
);

/**
 * @swagger
 *  components:
 *      DeleteSchedule:
 *          example:
 *              id: 1
 *              user_id: 2
 */

/**
 * @swagger
 * /api/schedule/delete:
 *  post:
 *      Summary: To delete any schedule - By Admin role only
 *      tags:
 *        - Flights
 *      Description: This API allows the admin to updelete date any schedule.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/DeleteSchedule'
 *      responses:
 *           200:
 *              description: Schedule schema is returned in the response.
 */

router.post(
  '/delete',
  [
    validate.deleteValidation,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser,
    auth.isAdmin,
  ],
  scheduleController.remove
);

module.exports = router;
