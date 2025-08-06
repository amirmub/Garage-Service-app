const db = require("../config/db.config");

async function deleteCustomer(customerId) {
  try {
    // 1. Delete from customer_info
    await db.query("DELETE FROM customer_info WHERE customer_id = ?", [customerId]);

    // 3. Delete from customer_identifier
    const result = await db.query("DELETE FROM customer_identifier WHERE customer_id = ?", [customerId]);

    if (result.affectedRows === 0) {
      return { error: "Customer not found", status: 404 };
    }

    return { message: "Customer deleted successfully" };
  } catch (error) {
    console.error("Error deleting Customer:", error);
    return { error: "Server error", status: 500 };
  }
}

module.exports = { deleteCustomer };
