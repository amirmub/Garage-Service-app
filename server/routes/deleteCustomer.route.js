const express = require("express");
const router = express.Router();

const deleteCustomerController = require("../controller/deleteCustomer.controller");

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.delete("/api/customer/delete/:id",authMiddleware.tokenVerify,deleteCustomerController.deleteCustomer);

module.exports = router
