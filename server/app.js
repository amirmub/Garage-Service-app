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
app.use(routes);

app.get("/",(req,res) => {
  res.status(200).json({msg:"Welcome to Garage Service App"});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
  console.log(`Server is running on port: ${PORT}`);
});


module.exports = app;