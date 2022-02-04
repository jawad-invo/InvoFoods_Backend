const express = require('express');
const router = express.Router();
const mealController = require('../Controllers/MealController');

router.post('/create', mealController.create);
router.post('/get', mealController.get);
router.post('/update', mealController.update);
router.post('/delete', mealController.destroy);

module.exports = router;