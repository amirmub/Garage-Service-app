const express = require("express");
const router = express.Router();

const loginController = require("../controller/login.controller");

router.post("/api/login", loginController.login);

module.exports = router;