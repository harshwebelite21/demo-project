const express = require("express");

const orderController = require("../controller/orderController");
const route = express.Router();

// Checkout
route.post("/:userId", orderController.checkOut);
// View Order History using user Specific userId
route.get("/:userId", orderController.getOrderHistory);

module.exports = route;
