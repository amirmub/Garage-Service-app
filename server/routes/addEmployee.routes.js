const express = require("express");
const router = express.Router();

const addEmployeeController = require("../controller/addEmployee.controller")
// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.post("/api/add-employee",[authMiddleware.tokenVerify,authMiddleware.isAdmin],addEmployeeController.addEmployee)

module.exports = router