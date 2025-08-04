const db = require("../config/db.config");

async function deleteEmployee(employeeId) {
  try {
    // 1. Delete from employee_role
    await db.query("DELETE FROM employee_role WHERE employee_id = ?", [employeeId]);

    // 2. Delete from employee_info
    await db.query("DELETE FROM employee_info WHERE employee_id = ?", [employeeId]);

     // 2. Delete from employee_pass
    await db.query("DELETE FROM employee_pass WHERE employee_id = ?", [employeeId]);

    // 3. Delete from employee
    const result = await db.query("DELETE FROM employee WHERE employee_id = ?", [employeeId]);

    if (result.affectedRows === 0) {
      return { error: "Employee not found", status: 404 };
    }

    return { message: "Employee deleted successfully" };
  } catch (error) {
    console.error("Error deleting employee:", error);
    return { error: "Server error", status: 500 };
  }
}

module.exports = { deleteEmployee };
