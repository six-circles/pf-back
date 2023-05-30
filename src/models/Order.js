const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  shoppingCart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});
module.exports = model("Order", orderSchema);
