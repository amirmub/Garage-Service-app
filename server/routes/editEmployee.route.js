const express = require('express');
const router = express.Router();
const editEmployeeController = require('../controller/editEmployee.controller');

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.put('/api/admin/update/:id', [authMiddleware.tokenVerify,authMiddleware.isAdmin],editEmployeeController.editEmployee);

module.exports = router;
