const mongoose = require("mongoose");
const cartModel = require("../models/cart");
const product = require("../models/product");

// Create a cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Check users cart available or not
    const availableUser = await cartModel.findOne({ userId });
    // const availableUser = await cartModel.exists({ userId });   returns only id;

    // If User is available then Added Products to same cart other wise create new cart
    if (availableUser) {
      // To save the all userId which is saved in user's specific cart
      const allproductIdAvilableInCart = availableUser.products.map(
        ({ productId }) => productId.toString()
      );

      // Create promises for all changes and last they all are resolved
      const promises = products.map(async (element) => {
        if (allproductIdAvilableInCart.includes(element.productId.toString())) {
          await cartModel.findOneAndUpdate(
            {
              userId,
              "products.productId": new mongoose.Types.ObjectId(
                element.productId
              ),
            },
            { $inc: { "products.$.quantity": element.quantity } }
          );
        } else {
          await cartModel.updateOne(
            { userId },
            {
              $push: {
                products: {
                  productId: new mongoose.Types.ObjectId(element.productId),
                  quantity: element.quantity,
                },
              },
            }
          );
        }
      });

      //Resolve all promises at one time
      await Promise.all(promises);
    } else {
      console.log("hii");
      await cartModel.create({ userId, products });
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
    await cartModel.findOneAndDelete({ userId: req.params.userId });
    res.status(200).send("data deleted successfully from cart");
  } catch (err) {
    res.status(400).send(err.message + "Data Deletion Unsuccessful from cart");
  }
};

// View the user data from cart
exports.findCart = async (req, res) => {
  try {
    const cartData = await cartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      // {
      //   $unwind: {
      //     path: "$user",
      //   },
      // },
      // {
      //   $unwind: {
      //     path: "$products",
      //   },
      // },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      // {
      //   $unwind: {
      //     path: "$product",
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$userId",
      //     user: {
      //       $first: {
      //         _id: "$user._id",
      //         name: "$user.name",
      //         birthdate: "$user.birthdate",
      //         email: "$user.email",
      //         age: "$user.age",
      //       },
      //     },
      //     products: {
      //       $push: {
      //         productId: "$products.productId",
      //         quantity: "$products.quantity",
      //         product: {
      //           _id: "$product._id",
      //           name: "$product.name",
      //           description: "$product.description",
      //           price: "$product.price",
      //         },
      //       },
      //     },
      //   },
      // },
    ]);
    console.log(cartData);
    res.status(200).send(cartData);
  } catch (err) {
    res.send(err.message + "Fetching data ").status(400);
  }
};

// To remove the specific item from cart

exports.removeSpecificItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    const updatedCart = await cartModel
      .updateOne(
        {
          userId,
          "products.productId": productId,
        },
        { $pull: { products: { productId } } },
        { new: true }
      )
      .populate("userId");
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
    const { productId } = req.params;
    const { userId } = req.body;
    const decrementedData = await cartModel
      .updateOne(
        {
          userId,
          "products.productId": productId,
        },
        {
          $inc: { "products.$.quantity": -1 },
        },
        { new: true }
      )
      .populate("userId");
    if (!decrementedData || decrementedData.modifiedCount < 1) {
      return res.status(404).json({ error: "Cart or item not found." });
    }
    res.json("Item Decremented from your Cart");
  } catch (err) {
    console.error("Error in Decrement the count of item from cart:", err);
    res.status(500).json({ err: "Internal Server Error" });
  }
};
