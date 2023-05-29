const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  shoppingCart: [
    {
      type: String,
      ref: "Product",
    },
  ],
});
module.exports = model("Order", orderSchema);
