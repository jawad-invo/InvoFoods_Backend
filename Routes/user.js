const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');
const csv = require('csv-parser');
const { now } = require('sequelize/dist/lib/utils');
const auth = require('../Middlewares/auth');
const userController = require('../Controllers/UserController');
const validate = require('../Middlewares/UserValidations');

/**
 * @swagger
 *  components:
 *      schema:
 *          User:
 *              type: object
 *              properties:
 *                  message:
 *                          type: string
 *                  user:
 *                          type: object
 */

/**
 * @swagger
 * /signup:
 *  post:
 *      Summary: To register a new user in the system.
 *      Description: The API get data from user and create its entry in the database.
 *      responses:
 *           200:
 *              description: Signup successfull. Verify email to proceed.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PetForm'
 */

router.post('/signup', [validate.signup], userController.create);

router.post('/login', [validate.login], userController.login);

router.post(
  '/verify',
  [validate.emailVerification],
  userController.verifyEmail
);

router.post(
  '/updatePassword',
  [
    validate.updatePassword,
    auth.getToken,
    auth.verifyToken,
    auth.updatePassword,
  ],
  userController.updatePassword
);

router.post('/test', (req, res) => {
  const flights = [];
  fs.createReadStream('flights.csv')
    .pipe(csv())
    .on('data', (row) => {
      const flight = {
        name: row.name,
        plane_number: parseInt(row.plane_number, 10),
        total_seats: parseInt(row.total_seats, 10),
        seats_left: parseInt(row.seats_left, 10),
        class_id: 1,
        createdAt: now(),
        updatedAt: now(),
      };
      flights.push(flight);
    })
    .on('end', () => {
      res.json(flights);
    });
});

module.exports = router;
