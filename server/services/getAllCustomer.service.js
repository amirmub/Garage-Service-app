const dbConnection = require("../config/db.config");

async function allCustomer() {
  try {
    const result = `SELECT * 
        FROM customer_identifier
        INNER JOIN customer_info 
        ON customer_identifier.customer_id = customer_info.customer_id 
        INNER JOIN customer_vehicle_info 
        ON customer_identifier.customer_id = customer_vehicle_info.customer_id 
        ORDER BY customer_identifier.customer_id DESC;
        `;
    const rows = await dbConnection.query(result);
    return { message: rows, status: 200 };

  } catch (error) {
    console.error("Add Customer Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { allCustomer };
