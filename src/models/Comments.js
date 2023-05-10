const { Schema, model } = require("mongoose");

const commentsSchema = new Schema({
  comments: [
    {
      //mandar el user,
      body: {
        type: String,
        required: true,
      },
      punctuation: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = model("Comments", commentsSchema);
