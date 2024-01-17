const mongoose = require("mongoose");
const userSchema = require("./user");
const productModel = require("./product");
const schema = mongoose.Schema;

const cartSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: userSchema,
    unique: true,
  },
  products: [
    {
      productId: {
        type: schema.Types.ObjectId,
        unique: true,
        ref: productModel,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
