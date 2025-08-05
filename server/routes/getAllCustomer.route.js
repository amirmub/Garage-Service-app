const express = require("express");
const router = express.Router();

const getAllCustomer = require("../controller/getAllCustomer.controller");

// middleware function
const authMiddleware = require("../middleware/authMiddleware")

router.get("/api/customers",[authMiddleware.tokenVerify,authMiddleware.isAdmin],getAllCustomer.allCustomer);

module.exports =  router;