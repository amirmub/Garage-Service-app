const addEmployeeService = require("../services/addEmployee.service");

async function addEmployee(req,res,next) {
    const result = await addEmployeeService.addEmployee(req.body);
    const token = req.headers.token;
    //  console.log("Received token:", token);
    

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(201).json({msg: result.message});
}

module.exports = { addEmployee }
