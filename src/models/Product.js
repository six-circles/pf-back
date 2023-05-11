const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    punctuations: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // mandar los comments
    // mandar las questions
    // mandar las responses
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
