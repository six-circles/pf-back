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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Delivery", deliverySchema);
