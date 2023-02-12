const Joi = require("joi");
const Campground = require("./models/campground");
const Review = require("./models/review");

const campgroundSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  describtion: Joi.string().required(),
  location: Joi.string().required(),
}).required();

const reviewSchema = Joi.object({
  body: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
  author: Joi.string().required(),
}).required();

module.exports.validateCampGround = (req, res, next) => {
  const data = JSON.parse(req.body.data);
  const { title, describtion, price, location } = data;
  const { error } = campgroundSchema.validate({
    title,
    describtion,
    price,
    location,
  });
  if (error) {
    console.log(error);
    res.json(error);
  } else {
    next();
  }
};

module.exports.isLoggedIn = (massage) => (req, res, next) => {
  console.log("working");
  if (!req.isAuthenticated()) {
    console.log("no auth", massage);
    return res.status(401).json({ massage: massage });
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  console.log("working");
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp.author.equals(req.user._id)) {
    res.json("unAuthorized");
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  console.log("working");
  const { body } = req;
  const { error } = reviewSchema.validate(body);
  if (error) {
    console.log(error);
    res.json(error);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  console.log("working");
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    res.json("unAuthorized");
  } else {
    next();
  }
};
