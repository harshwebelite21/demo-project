const express = require("express");

const cartController = require("../controller/cartController");
const route = express.Router();

// Add New Item To cart
route.post("/", cartController.addToCart);

// Remove the  user Cart
route.delete("/:userId", cartController.removeFromCart);

// Remove the Specific Item From cart

// View the user specific Cart
route.get("/:userId", cartController.findCart);

module.exports = route;
