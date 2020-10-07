const mongoose = require("mongoose");

const { Schema } = mongoose;

const Paragraph = mongoose.model(
  "paragraph",
  new Schema({
    content: String,
    likes: { type: Number, default: 0 },
    createdAt: Date,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  })
);

module.exports = Paragraph;
