const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    type: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      default: "El vendedor esta preparando tu pedido",
    },
    products: {
      type: Array,
      ref: "Product",
    },
    seller: {
      type: Object,
      ref: "User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Delivery", deliverySchema);
