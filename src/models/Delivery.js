const { Schema, model } = require("mongoose");

const deliverySchema = new Schema(
  {
    type: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      required: true,
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
