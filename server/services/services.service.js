const db = require("../config/db.config");

// Function to add a new service
async function addService(serviceData) {
  const { service_name,service_description} = serviceData;

  if ( !service_name || !service_description) {
    return { error: "Please fill all required fields.", status: 400 };
  }

  try {

    const employeeResult = await db.query(
      "INSERT INTO common_services (service_name, service_description) VALUES (?, ?)",
      [service_name, service_description]
    );

    return { message: "Service added successfully", status: 201 };
    
  } catch (error) {
    console.error("Add Employee Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}


// Function to get all services
async function getAllServices() {
  try {
    const rows = await db.query("SELECT * FROM common_services");

    return { message: "Services retrieved successfully", data: rows, status: 200 };
    
  } catch (error) {
    console.error("Get All Services Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}

// Function to edit a service
async function editService(serviceData, serviceId) {
  const { service_name, service_description } = serviceData;

  if (!service_name || !service_description) {
    return { error: "Please fill all required fields.", status: 400 };
  }

  try {
    const result = await db.query(
      "UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?",
      [service_name, service_description, serviceId]
    );

    if (result.affectedRows === 0) {
      return { error: "Service not found", status: 404 };
    }

    return { message: "Service updated successfully", status: 200 };
    
  } catch (error) {
    console.error("Edit Service Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}


// Function to delete a service
async function deleteService(serviceId) {
  try {
    //  Check if the service is used in any orders
    const rows = await db.query(
      "SELECT COUNT(*) AS count FROM order_services WHERE service_id = ?",
      [serviceId]
    );

    if (rows[0].count > 0) {
      // Service is in use, cannot delete
      return {
        error: "Cannot delete service. It is currently used in existing orders.",
        status: 400,
      };
    }

    // Safe to delete
    await db.query("DELETE FROM common_services WHERE service_id = ?", [serviceId]);

    return {
      message: "Service deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Delete Service Error:", error.message);

    // Handle foreign key error specifically (extra safety)
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      return {
        error: "Cannot delete service. It is referenced in orders.",
        status: 400,
      };
    }

    return { error: "Internal Server Error", status: 500 };
  }
}


module.exports = { addService, getAllServices, editService, deleteService };
