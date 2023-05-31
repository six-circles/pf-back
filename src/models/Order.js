const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userComprador: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userVendedor: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    shoppingCart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    delivery: [
      {
        type: { type: String },
        status: {
          type: String,
          default: "El vendedor esta preparando tu pedido",
        },
        products: {
          type: Array,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = model("Order", orderSchema);
