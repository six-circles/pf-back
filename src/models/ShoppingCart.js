const { Schema, model } = require("mongoose");

const shoppingCartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = model("ShoppingCart", commentsSchema);
