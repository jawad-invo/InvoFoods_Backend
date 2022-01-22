const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const scheduleController = require('../Controllers/ScheduleController');
router.use(bodyParser.urlencoded({ extended: true }));

const validate = require('../Middlewares/ScheduleValidation');
const auth = require('../Middlewares/auth');

router.post('/create', validate.createValidation, scheduleController.create);

router.post('/get', auth.getToken, auth.verifyToken, validate.getValidation, scheduleController.get);

router.post('/update', [validate.updateValidation], scheduleController.update);

router.post('/delete', [validate.deleteValidation], scheduleController.remove);

module.exports = router;