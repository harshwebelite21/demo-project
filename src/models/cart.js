const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productId: {
        type: schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
