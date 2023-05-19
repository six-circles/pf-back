const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },
    birthday: {
      type: String,
    },
    punctuation: {
      type: Number,
    },
    totalSales: {
      type: Number,
    },
    shoppingCart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favorites",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
