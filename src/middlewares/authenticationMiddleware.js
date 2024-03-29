const jsonWebToken = require("../utils/jwt");

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
    jsonWebToken.verifyJwtToken(cookieToken);
    next();
  } catch (err) {
    console.log(err + "Error in Middleware");
  }
};
