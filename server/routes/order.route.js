const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller")
// middleware function
const authMiddleware = require("../middleware/authMiddleware")

// add orders route
router.post("/api/order",[authMiddleware.tokenVerify,authMiddleware.isAdmin],orderController.addOrder);

// get orders route
router.get("/api/orders",[authMiddleware.tokenVerify,authMiddleware.isAdmin],orderController.getOrder);

module.exports = router