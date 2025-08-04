const express = require("express");
const router = express.Router();

const deleteController = require("../controller/deleteEmployee.controller");

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.delete("/api/admin/delete/:id",[authMiddleware.tokenVerify,authMiddleware.isAdmin],deleteController.deleteEmployee);

module.exports = router
