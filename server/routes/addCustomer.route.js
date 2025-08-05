const express = require('express');
const router = express.Router();

const addCustomerController  = require('../controller/addCustomer.controller');

// Route to add a new customer
router.post('/api/customer', addCustomerController.addCustomer);

module.exports = router;