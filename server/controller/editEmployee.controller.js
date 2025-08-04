const editEmployeeService = require('../services/editEmployee.service');

async function editEmployee(req, res, next) {
  const result = await editEmployeeService.editEmployee(req.params.id,req.body);

    if (result.error) {
        return res.status(result.status).json({ msg: result.error });
    }
    return res.status(result.status).json({ msg: result.message });
}

module.exports = { editEmployee };