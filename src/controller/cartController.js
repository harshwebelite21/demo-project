const cartModel = require("../models/cart");
const product = require("../models/product");

// Create a cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Cheak users cart availabele or not
    const isUserAvailable = await cartModel.findOne({ userId });
    // const isUserAvailable = await cartModel.exists({ userId });   returns only id;

    // If User is avalable then Added Proudcuts to same cart other wise create new cart
    if (isUserAvailable) {
      const allProductIdAvilableInCart = isUserAvailable.products.map(
        (product) => product.productId.toString()
      );

      console.log(allProductIdAvilableInCart);
      const promises = products.map(async (element) => {
        if (allProductIdAvilableInCart.includes(element.productId)) {
          console.log("yes");
          await cartModel.findOneAndUpdate(
            { userId, "products.productId": element.productId },
            { $inc: { "products.$.quantity": element.quantity } }
          );
          console.log(element.productId);
        } else {
          await cartModel.updateOne({ userId }, { $push: { products } });
        }
      });

      await Promise.all(promises);
      // }
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
