const cartModel = require("../models/cart");
const product = require("../models/product");

// Create a cart
exports.addToCart = async (req, res) => {
  try {
    const { userid, products } = req.body;

    // Check users cart available or not
    const availableUser = await cartModel.findOne({ userid });
    // const availableUser = await cartModel.exists({ userid });   returns only id;

    // If User is available then Added Products to same cart other wise create new cart
    if (availableUser) {
      // To save the all userid which is saved in user's specific cart
      const allproductIdAvilableInCart = availableUser.products.map(
        ({ productid }) => productid.toString()
      );

      // Create promises for all changes and last they all are resolved
      const promises = products.map(async (element) => {
        if (allproductIdAvilableInCart.includes(element.productid)) {
          await cartModel.findOneAndUpdate(
            { userid, "products.productid": element.productid },
            { $inc: { "products.$.quantity": element.quantity } }
          );
        } else {
          await cartModel.updateOne({ userid }, { $push: { products } });
        }
      });

      //Resolve all promises at one time
      await Promise.all(promises);
    } else {
      await cartModel.create({ userid, products });
    }

    res.status(201).send("Data Added successfully In the cart");
  } catch (err) {
    res.status(400).send(" Error in cart Creation :" + err.message);
  }
};

//  Delete data from cart
exports.removeFromCart = async (req, res) => {
  try {
    // Delete data from cart using cart id
    await cartModel.findOneAndDelete({ userid: req.params.userid });
    res.status(200).send("data deleted successfully from cart");
  } catch (err) {
    res.status(400).send(err.message + "Data Deletion Unsuccessful from cart");
  }
};

// View the user data from cart
exports.findCart = async (req, res) => {
  try {
    const cartData = await cartModel
      .findOne({ userid: req.params.userid })
      .lean();
    res.status(200).send(cartData);
  } catch (err) {
    res.send(err.message + "Fetching data ").status(400);
  }
};

// To remove the specific item from cart

exports.removeSpecificItem = async (req, res) => {
  try {
    const { productid } = req.params;
    const { userid } = req.body;
    const updatedCart = await cartModel.updateOne(
      {
        userid,
        "products.productid": productid,
      },
      { $pull: { products: { productid } } },
      { new: true }
    );
    if (!updatedCart || updatedCart.modifiedCount < 1) {
      return res.status(404).json({ error: "Cart or item not found." });
    }

    res.send("Item Removed from your Cart");
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};

exports.reduceQuantity = async (req, res) => {
  try {
    const { productid } = req.params;
    const { userid } = req.body;
    const decrementedData = await cartModel.updateOne(
      {
        userid,
        "products.productid": productid,
      },
      {
        $inc: { "products.$.quantity": -1 },
      },
      { new: true }
    );
    if (!decrementedData || decrementedData.modifiedCount < 1) {
      return res.status(404).json({ error: "Cart or item not found." });
    }
    res.json("Item Decremented from your Cart");
  } catch (err) {
    console.error("Error in Decrement the count of item from cart:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};
