const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const FlightController = require('../Controllers/FlightController');
router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/FlightValidation');


router.post('/create', validate.create, FlightController.create);

router.post('/get', FlightController.get);

router.post('/update', FlightController.update);

router.post('/delete', FlightController.remove);

module.exports = router;