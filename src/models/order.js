const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = require("./user");

const orderSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: userSchema,
  },
  products: [
    {
      productId: {
        type: String,
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
