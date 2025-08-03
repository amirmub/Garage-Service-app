const express = require("express");
const router = express.Router();

const getAllEmployee = require("../controller/getAllEmployee.controller");

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.get("/api/admin/employee",[authMiddleware.tokenVerify,authMiddleware.isAdmin],getAllEmployee.allEmployee);

module.exports =  router;