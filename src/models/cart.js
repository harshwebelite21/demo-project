const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
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
});

module.exports = mongoose.model("art", cartSchema);
