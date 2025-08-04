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



async function editEmployee(employeeId, updatedData) {
  try {
    if (updatedData.employee) {
      const { sql, values } = buildUpdateQuery('employee', updatedData.employee, 'employee_id');
      await db.query(sql, [...values, employeeId]);
    }

    if (updatedData.employee_info) {
      const { sql, values } = buildUpdateQuery('employee_info', updatedData.employee_info, 'employee_id');
      await db.query(sql, [...values, employeeId]);
    }

    if (updatedData.employee_role) {
      const { sql, values } = buildUpdateQuery('employee_role', updatedData.employee_role, 'employee_id');
      await db.query(sql, [...values, employeeId]);
    }

    if (updatedData.employee_pass) {
      //  Hash the password before updating
      if (
        updatedData.employee_pass.employee_password_hashed &&
        typeof updatedData.employee_pass.employee_password_hashed === "string" &&
        updatedData.employee_pass.employee_password_hashed.trim() !== ""
      ) {
        const hashed = await bcrypt.hash(updatedData.employee_pass.employee_password_hashed, 10);
        updatedData.employee_pass.employee_password_hashed = hashed;
      }

      const { sql, values } = buildUpdateQuery('employee_pass', updatedData.employee_pass, 'employee_id');
      await db.query(sql, [...values, employeeId]);
    }

    return { status: 200, message: "Employee updated successfully" };
  } catch (error) {
    console.error("Error updating employee:", error);
    return { status: 500, message: "Internal server error", error };
  }
}


module.exports = { editEmployee };
