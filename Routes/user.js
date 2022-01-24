const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const bodyParser = require('body-parser');
const userController = require('../Controllers/UserController');

router.use(bodyParser.urlencoded({ extended: true }));
const validate = require('../Middlewares/UserValidations');

var fs = require('fs');
const csv = require('csv-parser');
const { now } = require('sequelize/dist/lib/utils');
var flights = [];


router.post('/signup', [
    validate.signup
],
    userController.create);

router.post('/login', [
    validate.login
],
    userController.login);

router.post('/verify', [
    validate.emailVerification
], userController.verifyEmail)


router.post('/updatePassword', [
    validate.updatePassword,
    auth.getToken,
    auth.verifyToken,
    auth.updatePassword
]
    , userController.updatePassword);


router.post('/test', (req, res) => {
    var flights = [];
    fs.createReadStream('flights.csv')
      .pipe(csv())
      .on('data', function (row) {
        const flight = {
          name: row.name,
          plane_number: parseInt(row.plane_number),
          total_seats: parseInt(row.total_seats),
          seats_left: parseInt(row.seats_left),
          class_id: 1,
          createdAt: now(),
          updatedAt: now()
        }
        flights.push(flight);
      }).on('end', function () {
          res.json(flights);
      })
})


module.exports = router;
