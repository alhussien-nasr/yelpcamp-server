const express = require("express");
const router = express.Router();
const { validateCampGround, isLoggedIn, isAuthor } = require("../middleware");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });
const {
  getCampground,
  getCampgroundById,
  postCampground,
  updateCampground,
  deleteCampground,
} = require("../controllers/campgrounds");

router
  .route("/")
  .get(getCampground)
  .post(
    isLoggedIn("unAuthorized"),
    upload.array("images"),
    validateCampGround,
    postCampground
  );
// .post(upload.array("image"), (req, res) => {
//   console.log(req.body, req.files);
// });

router
  .route("/:id")
  .get(getCampgroundById)
  .put(
    isLoggedIn("unAuthorized"),
    isAuthor,
    upload.array("images"),
    validateCampGround,
    updateCampground
  )
  .delete(isLoggedIn("unAuthorized"), isAuthor, deleteCampground);

module.exports = router;
