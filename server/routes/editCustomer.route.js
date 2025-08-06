const express = require('express');
const router = express.Router();

const editCustomerController = require('../controller/editCustomer.controller');

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.put('/api/customer/update/:id',[authMiddleware.tokenVerify], editCustomerController.editCustomer);

module.exports = router;
