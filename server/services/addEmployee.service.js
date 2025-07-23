const db = require("../config/db.config");
const bcrypt = require("bcrypt");

async function addEmployee(employeeData) {
  const {
    employee_email,
    employee_first_name,
    employee_last_name,
    employee_phone,
    active_employee,
    employee_password,
  } = employeeData;

  if (
    !employee_email ||
    !employee_first_name ||
    !employee_last_name ||
    !employee_phone ||
    !active_employee || 
    !employee_password
  ) {
    return { error: "Missing required fields", status: 400 };
  }

  const company_role_id = 1;

  if (employee_password.length < 8) {
    return { error: "Password must be at least 8 characters", status: 400 };
  }

  try {
    const hashedPassword = await bcrypt.hash(employee_password, 10);

    const checkQuery = await db.query(
      "SELECT * FROM employee WHERE employee_email = ?", [employee_email]);

    if (checkQuery.length > 0) {
        return { error: "Employee already exists", status: 400 };
    }

    const row = await db.query(
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)",
      [employee_email, active_employee]
    );

    if (row.affectedRows !== 1) {
      return { error: "Failed to insert employee", status: 500 };
    }

    const employee_id = row.insertId;

    await db.query(
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)",
      [employee_id, employee_first_name, employee_last_name, employee_phone]
    );

    await db.query(
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)",
      [employee_id, hashedPassword]
    );

    await db.query(
      "INSERT INTO employee_role (employee_id,company_role_id) VALUES (?,?)",
      [employee_id,company_role_id]
    );

    return { message: "Employee added successfully", status: 201 };
    
  } catch (error) {
    console.error("Add Employee Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { addEmployee };
