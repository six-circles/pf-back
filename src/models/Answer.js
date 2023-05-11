const { Schema, model } = require("mongoose");
const answerSchema = new Schema({
  body: {
    type: "string",
    required: true,
  },
  quesiton: [
    {
      type: Schema.Types.ObjectId,
      ref: "question",
    },
  ],
});

module.exports = model("Answer", answerSchema);
