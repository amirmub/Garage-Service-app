const installService = require("../services/install.service")

async function install(req,res,next) {
    const installMessage = await installService.install();
    if (installMessage === 200) {
        res.status(200).json({ msg : installMessage})
    }
    else{
         res.status(500).json({ msg : installMessage})
    }
}

module.exports = { install }