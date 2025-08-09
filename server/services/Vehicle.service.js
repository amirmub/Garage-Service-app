const dbConnection = require('../config/db.config');

// function to add a vehicle
async function addVehicle(vehicleData) {
    const {
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
    } = vehicleData;

    if (!vehicle_year || !vehicle_make || !vehicle_model || !vehicle_type || !vehicle_mileage || !vehicle_tag || !vehicle_serial || !vehicle_color) {
        return { error: "Please fill all required fields.", status: 400 };
    }

    try {
        // Step 1: Get the last inserted customers_id
        const rows = await dbConnection.query(`
            SELECT customer_id 
            FROM customer_identifier 
            ORDER BY customer_id DESC 
            LIMIT 1
        `);

        if (!rows || rows.length === 0) {
            return { error: "No customer found. Please add a customer first.", status: 400 };
        }

        const customer_id = rows[0].customer_id;

        // Step 2: Insert into customer_vehicle_info
        const result = await dbConnection.query(
            `INSERT INTO customer_vehicle_info 
            (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                customer_id,
                vehicle_year,
                vehicle_make,
                vehicle_model,
                vehicle_type,
                vehicle_mileage,
                vehicle_tag,
                vehicle_serial,
                vehicle_color
            ]
        );

        if (result.affectedRows !== 1) {
            return { error: "Failed to insert vehicle", status: 500 };
        }

        return { message: "Vehicle added successfully", status: 201 };

    } catch (error) {
        console.error("Error adding vehicle:", error);
        return { error: "Internal server error", status: 500 };
    }
}

// function to get all vehicles
async function getAllVehicles() {
    try {
        const rows = await dbConnection.query(`
            SELECT * FROM customer_vehicle_info
            ORDER BY vehicle_id DESC;
        `);

        if (!rows || rows.length === 0) {
            return { error: "No vehicles found", status: 404 };
        }

        return { message: rows, status: 200 };

    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return { error: "Internal server error", status: 500 };
    }
}

module.exports = { addVehicle, getAllVehicles };
