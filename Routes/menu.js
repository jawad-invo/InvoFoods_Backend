const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/MenuController');


router.post('/create', menuController.create);
router.post('/get', menuController.get);
router.post('/update', menuController.update);
router.post('/delete', menuController.destroy);

module.exports = router;
