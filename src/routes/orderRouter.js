const express = require("express");

const orderController = require("../controller/orderController");
const route = express.Router();

// Checkout
route.post("/:userid", orderController.checkOut);
// View Order History using user Specific userid
route.get("/:userid", orderController.getOrderHistory);

module.exports = route;
