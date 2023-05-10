const { Schema, model } = require("mongoose");
const questionsSchema = new Schema({
  body: {
    type: "string",
    required: true,
  },
});

module.exports = model("Questions", questionsSchema);
