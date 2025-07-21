const express = require("express");
const router = express.Router();

const addEmployeeController = require("../controller/addEmployee.controller")

router.post("/api/add-employee",addEmployeeController.addEmployee)

module.exports = router