const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
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
  amount: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
