const { Schema, model } = require("mongoose");
const questionsSchema = new Schema({
  userName: {
    type: "string",
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  body: {
    type: "string",
    required: true,
  },
  answer: { type: "string" },
});

module.exports = model("Questions", questionsSchema);
