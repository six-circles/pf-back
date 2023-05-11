const { Schema, model } = require("mongoose");
const questionsSchema = new Schema({
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  body: {
    type: "string",
    required: true,
  },
  answer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});

module.exports = model("Questions", questionsSchema);
