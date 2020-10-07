const mongoose = require("mongoose");

const { Schema } = mongoose;

const Comment = mongoose.model(
  "comment",
  new Schema({
    comment: String,
    likes: { type: Number, default: 0 },
    createdAt: Date,
  })
);

module.exports = Comment;
