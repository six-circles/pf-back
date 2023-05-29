const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  shoppingCart: [
    {
      type: Object,
      required: true,
    },
  ],
});
module.exports = model("Order", orderSchema);
