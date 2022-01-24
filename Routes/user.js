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
