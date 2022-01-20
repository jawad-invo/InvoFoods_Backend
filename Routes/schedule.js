const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const scheduleController = require('../Controllers/ScheduleController');
router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/ScheduleValidation');

router.post('/create', validate, scheduleController.create);

router.post('/get', scheduleController.get);

router.post('/update', scheduleController.update);

router.post('/delete', scheduleController.remove);

module.exports = router;