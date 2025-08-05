const addCustomerService = require('../services/addCustomer.service');

async function addCustomer(req, res,next) {
    const result = await addCustomerService.addCustomer(req.body);
    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }
    return res.status(result.status).json({ message: result.message });

}
module.exports = { addCustomer };
