const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    title: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
