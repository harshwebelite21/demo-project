const jwt = require("jsonwebtoken");
const { appConfig } = require("../config/appConfig");

// Middleware to check authentication status
exports.isAuthenticated = (req, res, next) => {
  try {
    const headerToken = req.header("Authorization").replace("Bearer ", "");
    const cookieToken = req.cookies.jwtToken;
    if (!cookieToken || !headerToken) {
      return res
        .status(403)
        .json({ error: "Access denied. Token not provided." });
    }

    jwt.verify(cookieToken, appConfig.jwtKey, (err) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token." });
      }

      next();
    });
  } catch (err) {
    console.log(err + "Error in Middleware");
  }
};
