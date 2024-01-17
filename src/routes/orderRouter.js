const express = require("express");

const orderController = require("../controller/orderController");
const route = express.Router();

// Cheakout
route.post("/:userId", orderController.checkOut);
// View Cart
route.get("/:userId", orderController.getOrderHistory);

module.exports = route;
