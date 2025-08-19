require('dotenv').config();
const express = require('express');
const app = express();

const cors = require("cors") 
app.use(cors())

app.use(express.json());

// sanitize middleware
const sanitize = require("sanitize");
app.use(sanitize.middleware)

// all routes
const routes = require("./routes/index")
app.use(routes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port http://0.0.0.0:${PORT}`);
});


module.exports = app;