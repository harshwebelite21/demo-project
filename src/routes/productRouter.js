const express = require("express");

const productController = require("../controller/productController");
const route = express.Router();

// View Products
route.get("/", productController.getAllProducts);

// Add Product
route.post("/", productController.addProducts);

// Update Product Details
route.put("/:productid", productController.updateProduct);

// Delete Product
route.delete("/:productid", productController.deleteProduct);

module.exports = route;
