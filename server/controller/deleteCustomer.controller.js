const deleteCustomerService = require("../services/deleteCustomer.service");

async function deleteCustomer(req, res, next) {
  const result = await deleteCustomerService.deleteCustomer(req.params.id);
  
  if (result.error) {
    return res.status(result.status).json({ msg: result.error });
  }
  return res.status(201).json({ msg: result.message });
}

module.exports = { deleteCustomer };
