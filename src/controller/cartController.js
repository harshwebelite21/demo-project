const cartModel = require("../models/cart");

// Create a cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Cheak users cart availabele or not
    const isUserAvailable = await cartModel.findOne({ userId: userId });

    // If User is avalable then Added Proudcuts to same cart other wise create new cart
    if (isUserAvailable) {
      await cartModel.updateOne({ userId }, { $push: { products } });
    } else {
      await cartModel.create({ userId, products });
    }

    res.status(201).send("Data Added sucessfully In the cart");
  } catch (err) {
    res.status(400).send(" Error in cart Creation :" + err.message);
  }
};

//  Delete data from cart
exports.removeFromCart = async (req, res) => {
  try {
    // Delete data from cart using cart id
    await cartModel.findOneAndDelete({ userId: req.params.userId });
    res.status(200).send("data deleted sucessfully from cart");
  } catch (err) {
    res.status(400).send(err.message + "Data Deletion Unsucessufl from cart");
  }
};

// View the user data from cart
exports.findCart = async (req, res) => {
  try {
    const cartData = await cartModel
      .findOne({ userId: req.params.userId })
      .lean();
    res.status(200).send(cartData);
  } catch (err) {
    res.send(err.message + "Fetching data ").status(400);
  }
};
