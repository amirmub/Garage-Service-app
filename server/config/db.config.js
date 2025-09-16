// const mysql = require('mysql2/promise');

// // Create a connection to the database
// const dbConnection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: 10, // Optional: Set a connection limit
// });


// async function query(sql,params) {
//     const [row,fields] = await dbConnection.execute(sql,params)
//     return row
// }
    
// module.exports = { query }


const mysql = require("mysql2");
const url = require("url");

// Parse DATABASE_URL
const dbUrl = process.env.DATABASE_URL;
const params = url.parse(dbUrl);
const [user, password] = params.auth.split(":");

const dbConnection = mysql.createConnection({
  host: params.hostname,
  user: user,
  password: password,
  database: params.pathname.replace("/", ""),
  port: params.port,
});

dbConnection.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("Connected to Railway MySQL!");
  }
});

// Async query helper
async function query(sql, params) {
  const [rows, fields] = await dbConnection.promise().execute(sql, params);
  return rows;
}

module.exports = { query };
