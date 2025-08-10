const orderService = require("../services/order.service");

// add order controller
async function addOrder(req,res,next) {
    const result = await orderService.addOrder(req.body);

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(201).json({msg: result.message});
}

module.exports = { addOrder };