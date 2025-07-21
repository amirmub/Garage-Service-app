const express = require('express');
const router = express.Router();

// install routes
const installRoutes = require('./install.routes');
router.use(installRoutes);

// add Employee routes
const addEmployeeRoutes = require('./addEmployee.routes');
router.use(addEmployeeRoutes);



module.exports = router;