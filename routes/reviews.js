const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");
const { postReview, deleteReview } = require("../controllers/reviews");
router.post(
  "/",
  isLoggedIn("you need to register to post review"),
  validateReview,
  postReview
);

router.delete(
  "/:reviewId",
  isLoggedIn("you need to register to delete review"),
  isReviewAuthor,
  deleteReview
);

module.exports = router;
