const { Schema, model } = require("mongoose");
const answerSchema = new Schema({
  body: {
    type: "string",
    required: true,
  },
  question: [
    {
      type: Schema.Types.ObjectId,
      ref: "Questions",
    },
  ],
});

module.exports = model("Answer", answerSchema);
