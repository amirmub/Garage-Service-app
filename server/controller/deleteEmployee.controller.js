const deleteService = require("../services/deleteEmployee.service");

async function deleteEmployee(req, res, next) {
  const result = await deleteService.deleteEmployee(req.params.id);
  
  if (result.error) {
    return res.status(result.status).json({ msg: result.error });
  }
  return res.status(201).json({ msg: result.message });
}

module.exports = { deleteEmployee };
