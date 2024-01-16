const CartModel = require("../models/cart");
const productModel = require("../models/product");
const orderModel = require("../models/order");

// Create a Order
exports.cheakOut = async (req, res) => {
  try {
    // Find the Cart products Of the specific user
    const { cartProducts } = await CartModel.findOne(
      {
        userId: req.params.userId,
      },
      { products: 1, _id: 0 }
    ).lean();

    // Maping the the product Id from cart Products
    const allProductId = cartProducts.map((product) => product.productId);

    // Find the product details from the product Collection which id is in allProductId
    const allProduct = await productModel.find({ _id: { $in: allProductId } });

    // Finding the Total Amount of All Product in cart
    let totalBill = 0;
    allProduct.forEach((productCollectionProducts) => {
      cartProducts.forEach((cartProductData) => {
        if (productCollectionProducts._id == cartProductData.productId) {
          totalBill +=
            productCollectionProducts.price * cartProductData.quantity;
        }
      });
    });

    // Creating record in order table for history
    await orderModel.create({
      userId: req.params.userId,
      products: cartProducts,
      amount: totalBill,
    });

    // To Delete cart from the Cart collection After saving History in Order Table
    await CartModel.deleteOne({ userId: req.params.userId });
    res.status(201).send("Order Placed Succesfully");
  } catch (err) {
    res.status(400).send(" Error in Cheakout Process :" + err.message);
  }
};

// View the user data from Order
exports.getOrderHistory = async (req, res) => {
  try {
    const orderData = await orderModel
      .findOne({ userId: req.params.userId })
      .lean();
    res.status(201).send(orderData);
  } catch (err) {
    res.send(err.message + "Fetching data ").status(400);
  }
};
