const getAllService = require("../services/getAllEmployee.service");

async function allEmployee(req,res,next) {
    const result = await getAllService.allEmployee(req.body);
    // const token = req.headers.token;//this line is to check the token is sended or not
    // console.log("token:",token);
    
     
    if (result.error) {
        return res.status(result.status).json({msg: result.error})
    }
    return res.status(result.status).json({msg: result.message})
}

module.exports = {allEmployee}