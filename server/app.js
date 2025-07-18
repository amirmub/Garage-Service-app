const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Welcome to the Garage Service API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;