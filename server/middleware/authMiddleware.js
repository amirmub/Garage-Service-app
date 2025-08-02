const jwt = require("jsonwebtoken");

// to verify the token
function tokenVerify(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(400).json({ msg: "there is no token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.status(401).json({ msg: "token not verified" });
    }
    const result = req.employee_role = decoded.employee_role;
    // console.log(result); // to check the role is sent or not // and also pass the below function
    
    next();
  });

}



// next to check the user is admin or not. only access by admin this function 
function isAdmin(req,res,next) {
    // from the above function this role
    const employee_role = req.employee_role;
    if (employee_role === 3) {
        next();
    }
    else{
         return res.status(403).json({ msg: "You are not admin"});
    }

}

module.exports = { tokenVerify,isAdmin };
