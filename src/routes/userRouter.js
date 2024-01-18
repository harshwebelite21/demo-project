const express = require("express");

const userController = require("../controller/userController");
const { isAuthenticated } = require("../middlewares/authenticationMiddleware");
const route = express.Router();

// Always Keep Generic Routes on top
// Login authRoute
route.post("/login", userController.login);
// Logout authRoute
route.get("/logout", isAuthenticated, userController.logout);
// Add New User or Signup
route.post("/signup", userController.signup);

// Update User Data
route.put("/:userId", isAuthenticated, userController.updatedata);
// Delete User Data
route.delete("/:userId", isAuthenticated, userController.deletedata);
// View Perticular user
route.get("/:userId", isAuthenticated, userController.viewuser);

module.exports = route;
