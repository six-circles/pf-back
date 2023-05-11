const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  //mandar el user,
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
});

module.exports = model("Comments", commentsSchema);
