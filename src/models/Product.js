const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
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
    comments: [
      {
        user: {
          type: String,
          required: true,
        },
        body: {
          type: String,
          required: true,
        },
        punctuation: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
