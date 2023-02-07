const mongoose = require("mongoose");

const schems = new mongoose.Schema({
  body: String,
  rating: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Review", schems);
