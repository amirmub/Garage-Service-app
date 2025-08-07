const express = require("express");
const router = express.Router();

const ServiceController = require("../controller/services.controller")
// middleware function
const authMiddleware = require("../middleware/authMiddleware")

// add service route
router.post("/api/add-service",[authMiddleware.tokenVerify,authMiddleware.isAdmin],ServiceController.addService)

// get all services route
router.get("/api/all-services",[authMiddleware.tokenVerify,authMiddleware.isAdmin],ServiceController.getAllServices);

// edit service route
router.put("/api/edit-service/:id",[authMiddleware.tokenVerify,authMiddleware.isAdmin],ServiceController.editService);

// delete service route
router.delete("/api/delete-service/:id",[authMiddleware.tokenVerify,authMiddleware.isAdmin],ServiceController.deleteService);


module.exports = router