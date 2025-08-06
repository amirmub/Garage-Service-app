const express = require('express');
const router = express.Router();

// install routes
const installRoutes = require('./install.routes');
router.use(installRoutes);

// login route
const loginRoutes = require("./login.route");
router.use(loginRoutes);



// add Employee routes
const addEmployeeRoutes = require('./addEmployee.routes');
router.use(addEmployeeRoutes);

// get all employee route
const getAllEmployee = require("./getAllEmployee.route");
router.use(getAllEmployee)

// update employee route
const editEmployee = require("./editEmployee.route");
router.use(editEmployee)

// delete employee route
const deleteEmployee = require("./deleteEmployee.route");
router.use(deleteEmployee);




// add customer route
const addCustomer = require("./addCustomer.route");
router.use(addCustomer)

// add customer route
const getAllCustomer = require("./getAllCustomer.route");
router.use(getAllCustomer)

// add customer route
const editCustomer = require("./editCustomer.route");
router.use(editCustomer)

module.exports = router;