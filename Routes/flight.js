const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const FlightController = require('../Controllers/FlightController');

router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/FlightValidation');
const auth = require('../Middlewares/auth');

/**
 * @swagger
 *  components:
 *     schemas:
 *          Plane:
 *              type: object
 *              required:
 *                - name
 *                - plane_number
 *                - total_seats
 *                - seats_left
 *                - class_id
 *              properties:
 *                  name:
 *                     type: string
 *                  plane_number:
 *                      type: integer
 *                  total_seats:
 *                      type: integer
 *                  seats_left:
 *                      type: integer
 *                  class_id:
 *                      type: integer
 *              example:
 *                  name: Emirates
 *                  plane_number: LEL 5328
 *                  total_seats: 200
 *                  seats_left: 150
 *                  class_id: 3
 */

/**
 * @swagger
 * tags:
 *   name: Planes
 *   description: APIs for planes management
 */

/**
 * @swagger
 * /api/flight/create:
 *  post:
 *      Summary: To enter a new plane record in the system.
 *      tags:
 *        - Planes
 *      Description: The API create a new entry for the plane.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Plane'
 *      responses:
 *           200:
 *              description: Plane schema is returned in the response.
 */

router.post(
  '/create',
  [
    validate.create,
    auth.getToken,
    auth.verifyToken,
    auth.verifyUser,
    auth.isAdmin,
  ],
  FlightController.create
);

/**
 * @swagger
 *  components:
 *      Planes:
 *          example:
 *              id: 2
 *              user_id: 2
 */

/**
 * @swagger
 * /api/flight/get:
 *  post:
 *      Summary: To get the available planes.
 *      tags:
 *        - Planes
 *      Description: This API return the available planes according to the applied id.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Plane'
 *      responses:
 *           200:
 *              description: Plane schema is returned in the response.
 */

router.post(
  '/get',
  [auth.getToken, auth.verifyToken, auth.verifyUser, auth.isAdmin],
  FlightController.get
);

/**
 * @swagger
 *  components:
 *      Planes:
 *          example:
 *              name: Emirates
 *              user_id: 2
 *              id: 2
 */

/**
 * @swagger
 * /api/flight/update:
 *  post:
 *      Summary: To update the plane.
 *      tags:
 *        - Planes
 *      Description: This API update the plane data in the system.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Plane'
 *      responses:
 *           200:
 *              description: Plane update response is returned in the response.
 */

router.post(
  '/update',
  [auth.getToken, auth.verifyToken, auth.verifyUser, auth.isAdmin],
  FlightController.update
);

/**
 * @swagger
 *  components:
 *      Planes:
 *          example:
 *              user_id: 2
 *              id: 2
 */

/**
 * @swagger
 * /api/flight/delete:
 *  post:
 *      Summary: To delete the plane.
 *      tags:
 *        - Planes
 *      Description: This API delete the plane data from the system.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Plane'
 *      responses:
 *           200:
 *              description: Delete response is returned in the response.
 */

router.post(
  '/delete',
  [auth.getToken, auth.verifyToken, auth.verifyUser, auth.isAdmin],
  FlightController.remove
);

module.exports = router;
