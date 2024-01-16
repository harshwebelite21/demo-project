const mongoose = require("mongoose");
const userSchema = require("./user");
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
        type: String,
        unique: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
