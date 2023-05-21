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
        id: String,
        url: String,
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
    category: {
      type: String,
      required: true,
    },
    moreCharacteristics: {
      type: Object,
    },
    enable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
