const express = require("express");

const cartController = require("../controller/cartController");
const route = express.Router();

// Add New Item To cart
route.post("/", cartController.addToCart);

// Remove the  user Cart
route.delete("/:userId", cartController.removeFromCart);

// Remove the Specific Item From cart
route.post("/removeSpecificItem", cartController.removeSpecificItem);

// Decrement the quantity from cart
route.post("decrementQuantity",cartController.decrementQuantity)

// View the user specific Cart
route.get("/:userId", cartController.findCart);

module.exports = route;
