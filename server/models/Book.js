const mongoose = require("mongoose");

const { Schema } = mongoose;

const Book = mongoose.model(
  "book",
  new Schema({
    title: String,
    about: String,
    createdAt: Date,
    genre: String,
    likes: { type: Number, default: 0 },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    paragraphs: [
      {
        type: Schema.Types.ObjectId,
        ref: "paragraph",
      },
    ],
  })
);

module.exports = Book;
