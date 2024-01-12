const express = require("express");

const controller = require("../controller/userController");
const route = express.Router();

// Add New User
route.post("/", controller.adddata);

// Update Data
route.put("/:userId", controller.updatedata);

// Delete Data
route.delete("/:userId", controller.deletedata);

// View Perticular user
route.get("/:userId", controller.viewuser);

module.exports = route;
