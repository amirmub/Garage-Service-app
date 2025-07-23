const loginService = require("../services/login.service")

async function login(req,res,next) {
    const result = await loginService.login(req.body);

    if (result.error) {
        return res.status(result.status).json({ msg : result.error})
    }
     return res.status(result.status).json({ msg : result.message , info : result.data})
}

module.exports = { login }