const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const FlightController = require('../Controllers/FlightController');

router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/FlightValidation');
const auth = require('../Middlewares/auth');

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

router.post(
  '/get',
  [auth.getToken, auth.verifyToken, auth.verifyUser, auth.isAdmin],
  FlightController.get
);

router.post(
  '/update',
  [auth.getToken, auth.verifyToken, auth.verifyUser, auth.isAdmin],
  FlightController.update
);

router.post(
  '/delete',
  [auth.getToken, auth.verifyToken, auth.verifyUser, auth.isAdmin],
  FlightController.remove
);

module.exports = router;
