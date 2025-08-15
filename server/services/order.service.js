const db = require("../config/db.config");
const crypto = require("crypto");


async function addOrder(orderData) {
  const { order_total_price, additional_request, order_services } = orderData;

  if (
    !order_total_price ||
    !order_services ||
    !Array.isArray(order_services) ||
    order_services.length === 0
  ) {
    return { error: "Please fill all required fields and provide at least one service.", status: 400 };
  }



  try {
    // Get most recent employee_id
    const employee = await db.query(
      "SELECT employee_id FROM employee ORDER BY employee_id DESC LIMIT 1"
    );
    if (!employee || employee.length === 0) {
      return { error: "No employees found", status: 404 };
    }
    const employee_id = employee[0].employee_id;

    // Get most recent customer_id
    const customer = await db.query(
      "SELECT customer_id FROM customer_identifier ORDER BY customer_id DESC LIMIT 1"
    );
    if (!customer || customer.length === 0) {
      return { error: "No customers found", status: 404 };
    }
    const customer_id = customer[0].customer_id;

    // Get most recent vehicle_id
    const vehicle = await db.query(
      "SELECT vehicle_id FROM customer_vehicle_info WHERE customer_id = ? ORDER BY vehicle_id DESC LIMIT 1",
      [customer_id]
    );
    if (!vehicle || vehicle.length === 0) {
      return { error: "No vehicles found for this customer", status: 404 };
    }
    const vehicle_id = vehicle[0].vehicle_id;

    // Generate unique hash
    const order_hash = crypto
      .createHash("sha256")
      .update(`${Date.now()}-${employee_id}-${customer_id}-${vehicle_id}`)
      .digest("hex")
      .slice(0, 24);

    // Insert into orders
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

     const allowedStatuses = ["Received", "In Progress", "Quality Check", "Ready for Pickup"];
     const defaultServiceStatus = "Received"; // default for service_completed

    // Insert into order_services with default service_completed = "Received"
    const placeholders = order_services.map(() => "(?, ?, ?)").join(", ");
    const values = [];
    order_services.forEach(({ service_id }) => {
      values.push(order_id, service_id, defaultServiceStatus);
    });

    await db.query(
      `INSERT INTO order_services (order_id, service_id, service_completed) VALUES ${placeholders}`,
      values
    );

    return {
      message: "Order added successfully",
      order_id,
      allowed_statuses: allowedStatuses,
      status: 201
    };

  } catch (error) {
    console.error("Add Order Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}



async function getOrder() {
  try {
const result = `
  SELECT 
    orders.order_id,
    orders.*,
    order_info.*,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'service_id', common_services.service_id,
        'service_name', common_services.service_name,
        'service_description', common_services.service_description,
        'service_completed', order_services.service_completed
      )
    ) AS services
  FROM orders
  INNER JOIN order_info 
    ON orders.order_id = order_info.order_id
  INNER JOIN order_services 
    ON orders.order_id = order_services.order_id
  INNER JOIN common_services
    ON order_services.service_id = common_services.service_id
  GROUP BY orders.order_id
  ORDER BY orders.order_id DESC;
`;


    const rows = await db.query(result);

    // Parse the JSON array string into JS array
   const formattedRows = rows.map(row => ({
  ...row,
  services: typeof row.services === "string" ? JSON.parse(row.services) : row.services || []
}));


    return { message: formattedRows, status: 200 };

  } catch (error) {
    console.error("Get Order Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

// function to get single order
async function singleOrder(order_hash) {
  if (!order_hash) {
    return { error: "Order hash is required", status: 400 };
  }

  try {
    const query = `
    SELECT 
      orders.*,
      order_info.*,
      customer_info.*,
      customer_identifier.*,
      customer_vehicle_info.*,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'service_id', common_services.service_id,
          'service_name', common_services.service_name,
          'service_description', common_services.service_description,
          'service_completed', order_services.service_completed
        )
      ) AS services
    FROM orders
    INNER JOIN order_info 
      ON orders.order_id = order_info.order_id
    LEFT JOIN customer_info 
      ON orders.customer_id = customer_info.customer_id
    LEFT JOIN customer_identifier 
      ON orders.customer_id = customer_identifier.customer_id
    LEFT JOIN customer_vehicle_info 
      ON orders.customer_id = customer_vehicle_info.customer_id
    INNER JOIN order_services 
      ON orders.order_id = order_services.order_id
    INNER JOIN common_services
      ON order_services.service_id = common_services.service_id
    WHERE orders.order_hash = ?
    GROUP BY orders.order_id;
  `;


    const rows = await db.query(query, [order_hash]);

    if (!rows || rows.length === 0) {
      return { error: "Order not found", status: 404 };
    }

    const order = rows[0];
    order.services = typeof order.services === "string" 
      ? JSON.parse(order.services) 
      : order.services || [];

    return { message: order, status: 200 };

  } catch (error) {
    console.error("Single Order Error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}


// function to update order
async function updateOrder(orderData,updatedOrder) {

  
}


module.exports = { addOrder, getOrder, singleOrder,updateOrder };
