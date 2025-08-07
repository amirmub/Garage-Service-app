const express = require("express");
const router = express.Router();

const addVehicleController = require("../controller/addVehicle.controller");

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.post("/api/add-vehicle",authMiddleware.tokenVerify,addVehicleController.addVehicle)

module.exports = router;