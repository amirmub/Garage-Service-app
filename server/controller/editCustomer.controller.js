const editCustomerService = require('../services/editCustomer.service');

async function editCustomer(req, res, next) {
  const result = await editCustomerService.editCustomer(req.params.id,req.body);

    if (result.error) {
        return res.status(result.status).json({ msg: result.error });
    }
    return res.status(result.status).json({ msg: result.message });
}

module.exports = { editCustomer };