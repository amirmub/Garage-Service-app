const dbConnection = require("../config/db.config");
const bcrypt = require("bcrypt");

async function login(loginData) {
  const { employee_email, employee_password } = loginData;

  if (!employee_email || !employee_password) {
    return { error: "Missing required fields", status: 400 };
  }

  try {
    const existedUser = await dbConnection.query(
      `SELECT employee.employee_id, employee_pass.employee_password_hashed
       FROM employee
       INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id
       WHERE employee.employee_email = ?`,
      [employee_email]
    );
    console.log(existedUser);
    
    if (!existedUser || existedUser.length === 0) {
      return { error: "Account doesn't exist", status: 400 };
    }

    console.log("User password:", existedUser[0].employee_password_hashed);

    const isMatch = await bcrypt.compare(employee_password, existedUser[0].employee_password_hashed);

    if (!isMatch) {
      return { error: "Incorrect password", status: 400 };
    }

    return { message: "Login successful", status: 200,
      data: {
        employee_id: existedUser[0].employee_id,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { login };
