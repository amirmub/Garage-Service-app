const dbConnection = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(loginData) {
  const { employee_email, employee_password } = loginData;

  if (!employee_email || !employee_password) {
    return { error: "Please fill all required fields.", status: 400 };
  }

  try {
    const existedUser = await dbConnection.query(
      `SELECT 
        employee.employee_id, 
        employee.employee_email, 
        employee_pass.employee_password_hashed,
        employee_info.employee_first_name,
        employee_role.company_role_id AS employee_role

      FROM employee
      INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id
      INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id
      INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id
      WHERE employee.employee_email = ?`,
      [employee_email],
    );

    // console.log(existedUser);
    
    if (!existedUser || existedUser.length === 0) {
      return { error: "Account doesn't exist", status: 400 };
    }

    const isMatch = await bcrypt.compare(employee_password, existedUser[0].employee_password_hashed);

    if (!isMatch) {
      return { error: "Incorrect password", status: 400 };
    }

    // Generate JWT with extended payload
    const secretKey = process.env.JWT_SECRET;

    const payload = {
      employee_email: existedUser[0].employee_email,
      employee_id: existedUser[0].employee_id,
      employee_role: existedUser[0].employee_role, 
      employee_first_name: existedUser[0].employee_first_name
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1y" });

    return {
      message: "Login successful",
      status: 200,
      data : token
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { login };
