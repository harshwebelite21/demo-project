const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = new schema({
  userid: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productid: {
        type: schema.Types.ObjectId,
        ref: "Product",
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
