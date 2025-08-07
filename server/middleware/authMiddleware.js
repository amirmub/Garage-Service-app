const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function tokenVerify(req, res, next) {
  const authHeader = req.headers.authorization; // use lowercase 'authorization' header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "No token provided or token format is incorrect (expected Bearer <token>)" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ msg: "Token is invalid or expired" });
    }

    req.employee_role = decoded.employee_role; // Attach role to request
    next();
  });
}

// Middleware to check if the user is an admin (role 3)
function isAdmin(req, res, next) {
  const employee_role = req.employee_role;

  if (employee_role === 3) {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
}

module.exports = { tokenVerify, isAdmin };
