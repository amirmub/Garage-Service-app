const express = require('express');
const router = express.Router();

const addCustomerController  = require('../controller/addCustomer.controller');

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

// Route to add a new customer
router.post('/api/customer', authMiddleware.tokenVerify, addCustomerController.addCustomer);

module.exports = router;