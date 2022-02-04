const express = require('express');
const router = express.Router();
const invoiceController = require('../Controllers/InvoiceController');

router.post('/create', invoiceController.create);
router.post('/get', invoiceController.get);
router.post('/update', invoiceController.update);
router.post('/delete', invoiceController.destroy);

module.exports = router;