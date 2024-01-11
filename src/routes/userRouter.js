const express = require("express");

const controller = require("../controller/controller");
const route = express.Router();

// Add New User
route.post("/adduser", controller.adddata);

// Update Data
route.put("/update/:userId", controller.updatedata);

// Delete Data
route.delete("/delete/:userId", controller.deletedata);

// View Perticular user
route.get("/viewuser/:userId", controller.viewuser);

module.exports = route;
