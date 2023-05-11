const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  punctuation: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = model("Comments", commentsSchema);
