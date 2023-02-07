const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.postReview = async (req, res) => {
  console.log(req.body, "body");
  try {
    const data = await Campground.findById(req.params.id);
    const campReview = await Review.create(req.body);
    console.log(campReview);
    data.reviews.push(campReview);
    await data.save();
    console.log(data, "campground");
    console.log(campReview, "review");
    res.json("success");
  } catch (error) {
    console.log(error);
    res.json({ type: "error", body: error });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.json("deleted");
  } catch (error) {
    console.log(error);
  }
};
