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
    image: [
      {
        type: String,
        required: true,
      },
    ],
    punctuations: {
      type: Number,
      default: 0,
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
    condition: {
      type: String,
      required: true,
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
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Questions",
      },
    ],
    categories: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
