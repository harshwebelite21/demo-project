const express = require("express");

const cartController = require("../controller/cartController");
const route = express.Router();

// Add New Item To cart
route.post("/", cartController.addToCart);

// Remove the  user Cart
route.delete("/:userid", cartController.removeFromCart);

// Remove the Specific Item From cart
route.patch("/items/:productid", cartController.removeSpecificItem);

// Decrement the quantity from cart
route.patch("/reduce-quantity/:productid",cartController.reduceQuantity)

// View the user specific Cart
route.get("/:userid", cartController.findCart);

module.exports = route;
