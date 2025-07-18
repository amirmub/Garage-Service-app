const mysql = require('mysql2/promise');

// Create a connection to the database
const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Optional: Set a connection limit
});

async function query(sql,params) {
    const [row,fields] = await dbConnection.execute(sql,params)
    return row
}
    
module.exports = { query }
