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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    punctuation: {
      type: Number,
    },
    totalSales: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
