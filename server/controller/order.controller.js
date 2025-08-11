const orderService = require("../services/order.service");

// add order controller
async function addOrder(req,res,next) {
    const result = await orderService.addOrder(req.body);

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(201).json({msg: result.message});
}

// get all order controller
async function getOrder(req,res,next) {
    const result = await orderService.getOrder();

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(201).json({msg: result.message});
}

// get single order controller
async function singleOrder(req,res,next) {
    const result = await orderService.singleOrder(req.params.id);

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(201).json({msg: result.message});
}

module.exports = { addOrder, getOrder, singleOrder };