const express = require("express");

const cartController = require("../controller/cartController");
const route = express.Router();

// View Products
route.post("/", cartController.addToCart);

// Add Product
route.delete("/:userId", cartController.removeFromCart);

// View Cart
route.get("/:userId", cartController.findCart);

module.exports = route;
