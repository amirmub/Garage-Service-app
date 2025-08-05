const dbConnection = require('../config/db.config');

async function addCustomer(customerData) {
    const {customer_first_name, customer_last_name, customer_email, customer_phone_number} = customerData;

    if (!customer_first_name || !customer_last_name || !customer_email || !customer_phone_number) {
        return { error: "Please fill all required fields.", status: 400 };
    }
    try {
        const existingRows = await dbConnection.query(
            "SELECT * FROM customer_identifier WHERE customer_email = ?",
            [customer_email]
        );
        if (existingRows.length > 0) {
            return { error: "Customer already exists", status: 400 };
        }

        const result = await dbConnection.query(
            "INSERT INTO customer_identifier (customer_email, customer_phone_number) VALUES (?, ?)",
            [customer_email, customer_phone_number]
        );

        if (result.affectedRows !== 1) {
            return { error: "Failed to insert customer", status: 500 };
        }

        const customer_id = result.insertId;
        await dbConnection.query(
            "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name) VALUES (?, ?, ?)",
            [customer_id, customer_first_name, customer_last_name]
        );

        return { message: "Customer added successfully", status: 201 };

    } catch (error) {
        console.error("Error adding customer:", error);
        return { error: "Internal server error", status: 500 };
    }
}

module.exports = { addCustomer };
