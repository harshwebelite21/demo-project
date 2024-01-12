const express = require("express");

const userController = require("../controller/userController");
const { isAuthenticated } = require("../middlewares/authenticationMiddleware");
const route = express.Router();

// Add New User
route.post("/", isAuthenticated, userController.adddata);

// Always Keep Generic Routes on top

// Login authRoute
route.post("/login", userController.login);
// Logout authRoute
route.get("/logout", userController.logout);

// Update Data
route.put("/:userId", isAuthenticated, userController.updatedata);

// Delete Data
route.delete("/:userId", isAuthenticated, userController.deletedata);
// View Perticular user
route.get("/:userId", isAuthenticated, userController.viewuser);

module.exports = route;
