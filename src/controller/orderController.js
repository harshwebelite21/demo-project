const cartModel = require("../models/cart");
const productModel = require("../models/product");
const orderModel = require("../models/order");

// Create a Order
exports.checkOut = async (req, res) => {
  try {
    // Find the Cart products Of the specific user
    const cartProducts = await cartModel
      .findOne(
        {
          userid: req.params.userid,
        },
        { products: 1, _id: 0 }
      )
      .lean();

    // Mapping the the product Id from cart Products
    const allproductId = cartProducts.products.map(
      (product) => product.productid
    );

    // Find the product details from the product Collection which id is in allproductId
    const allProduct = await productModel.find({ _id: { $in: allproductId } });

    // Finding the Total Amount of All Product in cart
    let totalBill = 0;
    allProduct.forEach(({ _id, price }) => {
      const matchingProduct = cartProducts.products.find(({ productid }) =>
        _id.equals(productid)
      );

      if (matchingProduct) {
        totalBill += price * matchingProduct.quantity;
      }
    });

    // Creating record in order table for history
    await orderModel.create({
      userid: req.params.userid,
      products: cartProducts.products,
      amount: totalBill,
    });

    // To Delete cart from the Cart collection After saving History in Order Table
    await cartModel.deleteOne({ userid: req.params.userid });
    res.status(201).send("Order Placed Successfully");
  } catch (err) {
    res.status(400).send(" Error in Checkout Process :" + err.message);
  }
};

// View the user data from Order
exports.getOrderHistory = async (req, res) => {
  try {
    const orderData = await orderModel
      .findOne({ userid: req.params.userid })
      .lean();
    res.status(200).send(orderData);
  } catch (err) {
    res.send(err.message + "Fetching data ").status(400);
  }
};
