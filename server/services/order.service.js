const db = require("../config/db.config");
const crypto = require("crypto");

async function addOrder(orderData) {
  const { order_total_price, additional_request } = orderData;

  if (!order_total_price || !additional_request) {
    return { error: "Please fill all required fields.", status: 400 };
  }

  try {
    // Get the most recent employee_id
    const employee = await db.query(
      "SELECT employee_id FROM employee ORDER BY employee_id DESC LIMIT 1"
    );
    if (!employee || employee.length === 0) {
      return { error: "No employees found", status: 404 };
    }
    const employee_id = employee[0].employee_id;

    //  Get the most recent customer_id
    const customer = await db.query(
      "SELECT customer_id FROM customer_identifier ORDER BY customer_id DESC LIMIT 1"
    );
    if (!customer || customer.length === 0) {
      return { error: "No customers found", status: 404 };
    }
    const customer_id = customer[0].customer_id;

    // Get the most recent vehicle_id for that customer
    const vehicle = await db.query(
      "SELECT vehicle_id FROM customer_vehicle_info WHERE customer_id = ? ORDER BY vehicle_id DESC LIMIT 1",
      [customer_id]
    );
    if (!vehicle || vehicle.length === 0) {
      return { error: "No vehicles found for this customer", status: 404 };
    }
    const vehicle_id = vehicle[0].vehicle_id;


    // Generate a unique hash for this order
        const order_hash = crypto
        .createHash("sha256")
        .update(`${Date.now()}-${employee_id}-${customer_id}-${vehicle_id}`)
        .digest("hex")
        .slice(0, 24);

    // Insert into orders with hash
    const orderResult = await db.query(
      "INSERT INTO orders (employee_id, customer_id, vehicle_id, order_hash) VALUES (?, ?, ?, ?)",
      [employee_id, customer_id, vehicle_id, order_hash]
    );

    if (orderResult.affectedRows === 0) {
      return { error: "Failed to add order", status: 500 };
    }

    const order_id = orderResult.insertId;

    // Insert into order_info
    await db.query(
      "INSERT INTO order_info (order_id, order_total_price, additional_request) VALUES (?, ?, ?)",
      [order_id, order_total_price, additional_request]
    );

    return { message: "Order added successfully", order_id, status: 201 };

  } catch (error) {
    console.error("Add Order Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { addOrder };
