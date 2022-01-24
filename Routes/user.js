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
 * tags:
 *   name: User
 *   description: APIs for user functionalities
 */

/**
 * @swagger
 *  components:
 *     schemas:
 *          User:
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
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  age:
 *                      type: integer
 *                  verification:
 *                      type: integer
 *                  gender:
 *                      type: string
 *                  role:
 *                      type: string
 *              example:
 *                  id: 1
 *                  name: Jawad
 *                  email: Jawad@gmail.com
 *                  password: 1234567
 *                  gender: Male
 *                  age: 24
 *                  verification: 1234
 *                  role: user
 */

/**
 * @swagger
 * /api/user/signup:
 *  post:
 *      Summary: To register a new user in the system.
 *      tags:
 *        - User
 *      Description: The API get data from user and create its entry in the database.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *           200:
 *              description: Signup successfull. Verify email to proceed.
 */

router.post('/signup', [validate.signup], userController.create);

/**
 * @swagger
 *  components:
 *      Login:
 *          example:
 *              email: Jawad@gmail.com
 *              password: 1234567
 */

/**
 * @swagger
 * /api/user/login:
 *  post:
 *      Summary: To login a user into the system.
 *      tags:
 *        - User
 *      Description: The API log in a user into the system and assign JWT token to it.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Login'
 *      responses:
 *           200:
 *              description: JWT token is returned along with user data.
 */

router.post('/login', [validate.login], userController.login);

/**
 * @swagger
 *  components:
 *      Verify:
 *          example:
 *              email: Jawad@gmail.com
 *              verification_code: 1234
 */

/**
 * @swagger
 * /api/user/verify:
 *  post:
 *      Summary: To verify the OTP from the email.
 *      tags:
 *        - User
 *      Description: The API verify the email using OTP.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/Verify'
 *      responses:
 *           200:
 *              description: Verification Successfull.
 */

router.post(
  '/verify',
  [validate.emailVerification],
  userController.verifyEmail
);

/**
 * @swagger
 *  components:
 *      UpdatePassword:
 *          example:
 *              email: Jawad@gmail.com
 *              old_password: 123456
 *              new_password: 654321
 *              confirm_new_password: 654321
 */

/**
 * @swagger
 * /api/user/updatePassword:
 *  post:
 *      Summary: To Update the password of the user.
 *      tags:
 *        - User
 *      Description: The API update the password of the user.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/UpdatePassword'
 *      responses:
 *           200:
 *              description: Password Updated.
 */

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
