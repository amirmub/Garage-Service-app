const getAllService = require("../services/getAllCustomer.service");

async function allCustomer(req,res,next) {
    const result = await getAllService.allCustomer(req.body);

    if (result.error) {
        return res.status(result.status).json({msg: result.error})
    }
    return res.status(result.status).json({msg: result.message})
}

module.exports = {allCustomer}