const mongoose = require("mongoose");

const { Schema } = mongoose;

const Genre = mongoose.model(
  "genre",
  new Schema({
    genre: String,
    description: String,
  })
);

module.exports = Genre;
