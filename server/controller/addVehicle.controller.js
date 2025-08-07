const addVehicleService = require('../services/addVehicle.service');

async function addVehicle(req, res,next) {
    const result = await addVehicleService.addVehicle(req.body);
    // console.log("💡 req.body received:", req.body);
    
    
    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }
    return res.status(result.status).json({ message: result.message });

}
module.exports = { addVehicle };
