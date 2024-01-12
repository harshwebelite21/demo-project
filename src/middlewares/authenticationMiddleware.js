const jwt = require("jsonwebtoken");

// Middleware to check authentication status
exports.isAuthenticated = (req, res, next) => {
  const headerToken = req.header("Authorization");
  const cookieToken = req.cookies.jwtToken;

  if (headerToken != cookieToken) {
    return res.send("Token are not match");
  }

  if (!cookieToken) {
    return res
      .status(403)
      .json({ error: "Access denied. Token not provided." });
  }

  jwt.verify(cookieToken, process.env.SECRETKEY, (err) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token." });
    }

    next();
  });
};
