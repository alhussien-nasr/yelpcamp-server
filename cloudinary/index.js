const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRE } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRE,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "yelpcamp",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = {
  storage,
  cloudinary,
};
