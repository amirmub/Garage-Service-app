const express = require('express');
const router = express.Router();

// install routes
const installRoutes = require('./install.routes');
router.use(installRoutes);

// add Employee routes
const addEmployeeRoutes = require('./addEmployee.routes');
router.use(addEmployeeRoutes);

// login route
const loginRoutes = require("./login.route");
router.use(loginRoutes)

// get all employee route
const getAllEmployee = require("./getAllEmployee.route");
router.use(getAllEmployee)

// delete employee route
const deleteEmployee = require("./deleteEmployee.route");
router.use(deleteEmployee)

// update employee route
const editEmployee = require("./editEmployee.route");
router.use(editEmployee)

// add customer route
const addCustomer = require("./addCustomer.route");
router.use(addCustomer)

module.exports = router;