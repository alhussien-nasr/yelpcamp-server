const mongoose = require("mongoose");
const Review = require("./review");

const schema = new mongoose.Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  price: Number,
  describtion: String,
  location: String,
  geometry: [],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});
schema.post("findOneAndDelete", async (camp) => {
  if (camp) {
    await Review.deleteMany({ _id: { $in: camp.reviews } });
  }
});
module.exports = mongoose.model("Campground", schema);
