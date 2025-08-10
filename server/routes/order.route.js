const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller")
// middleware function
const authMiddleware = require("../middleware/authMiddleware")

// add orders route
router.post("/api/order",[authMiddleware.tokenVerify,authMiddleware.isAdmin],orderController.addOrder);

module.exports = router