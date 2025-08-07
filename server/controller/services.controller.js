const Services = require("../services/services.service");

// add service controller
async function addService(req,res,next) {
    const result = await Services.addService(req.body);

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(201).json({msg: result.message});
}

// get all services controller
async function getAllServices(req, res, next) {
    const result = await Services.getAllServices();

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(200).json({msg: result.message, data: result.data});
}


// edit service controller
async function editService(req, res, next) {
      const result = await Services.editService(req.body,req.params.id);

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(200).json({msg: result.message, data: result.data});

}

// delete service controller
async function deleteService(req, res, next) {
    const result = await Services.deleteService(req.params.id);

    if (result.error) {
        return res.status(result.status).json({msg: result.error});
    }
    return res.status(200).json({msg: result.message});
}


module.exports = { addService, getAllServices, editService, deleteService }
