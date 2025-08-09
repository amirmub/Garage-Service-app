const express = require("express");
const router = express.Router();

const addVehicleController = require("../controller/Vehicle.controller");

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

// add vehicle route
router.post("/api/add-vehicle",authMiddleware.tokenVerify,addVehicleController.addVehicle);

// get all vehicles route
router.get("/api/vehicles",authMiddleware.tokenVerify,addVehicleController.getAllVehicles);

module.exports = router;