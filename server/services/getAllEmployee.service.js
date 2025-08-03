const dbConnection = require("../config/db.config");

async function allEmployee() {
  try {
    const result = `SELECT * 
        FROM employee 
        INNER JOIN employee_info 
        ON employee.employee_id = employee_info.employee_id 
        INNER JOIN employee_role 
        ON employee.employee_id = employee_role.employee_id 
        INNER JOIN company_roles 
        ON employee_role.company_role_id = company_roles.company_role_id 
        ORDER BY employee.employee_id DESC 
        ;
        `;
    const rows = await dbConnection.query(result);
    return { message: rows, status: 200 };

  } catch (error) {
    console.error("Add Employee Error:", error.message);
    return { error: "Internal Server Error", status: 500 };
  }
}

module.exports = { allEmployee };
