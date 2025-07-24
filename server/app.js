const express = require('express');
require('dotenv').config();
const app = express();

const cors = require("cors") 
app.use(cors())

app.use(express.json());

// all routes
const routes = require("./routes/index")
app.use(routes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;