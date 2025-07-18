const express = require('express');
const router = express.Router();

const installRoutes = require('./install.routes');
router.use(installRoutes);

module.exports = router;