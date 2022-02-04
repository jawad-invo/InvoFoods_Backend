const express = require('express');
const router = express.Router();
const subscriberController = require('../Controllers/SubscriberController');

router.post('/create', subscriberController.create);
router.post('/get', subscriberController.get);
router.post('/update', subscriberController.update);
router.post('/delete', subscriberController.destroy);

module.exports = router;