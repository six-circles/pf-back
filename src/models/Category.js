const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
