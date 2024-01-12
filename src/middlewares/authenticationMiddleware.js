const jwt = require("jsonwebtoken");

// Middleware to check authentication status
exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwtToken;
  console.log(token);
  if (!token) {
    return res
      .status(403)
      .json({ error: "Access denied. Token not provided." });
  }

  jwt.verify(token, process.env.SECRETKEY, (err) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }

    next();
  });
};
