const db = require("../config/db.config");
const bcrypt = require("bcrypt");

// Helper function to build SQL UPDATE query dynamically
function buildUpdateQuery(tableName, data, idColumn) {
  const keys = Object.keys(data);
  if (keys.length === 0) throw new Error("No data to update");

  const setClause = keys.map(key => `${key} = ?`).join(", ");
  const values = keys.map(key => data[key]);

  const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${idColumn} = ?`;
  return { sql, values };
}

async function editCustomer(customerId, updatedData) {
  try {
    if (updatedData.customer_identifier) {
      const { sql, values } = buildUpdateQuery('customer_identifier', updatedData.customer_identifier, 'customer_id');
      await db.query(sql, [...values, customerId]);
    }

    if (updatedData.customer_info) {
      const { sql, values } = buildUpdateQuery('customer_info', updatedData.customer_info, 'customer_id');
      await db.query(sql, [...values, customerId]);
    }

    return { status: 200, message: "Customer updated successfully" };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { status: 500, message: "Internal server error", error };
  }
}


module.exports = { editCustomer };
