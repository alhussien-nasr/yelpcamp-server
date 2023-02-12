const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const { join } = require("../seeds/cities");

module.exports.getCampground = async (req, res) => {
  const data = await Campground.find();
  res.json({ data });
};

module.exports.getCampgroundById = async (req, res) => {
  try {
    const data = await Campground.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author")
      .populate("reviews.author");
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.postCampground = async (req, res) => {
  try {
    const body = JSON.parse(req.body.data);
    const createdCamp = new Campground(body);
    createdCamp.author = req.user._id;
    createdCamp.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    console.log(createdCamp);
    await createdCamp.save();
    res.json(createdCamp);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateCampground = async (req, res) => {
  console.log(req.files, "file");
  console.log(req.body, "body");
  try {
    const { id } = req.params;
    const data = await JSON.parse(req.body.data);
    console.log(data, "data");
    const campground = await Campground.findByIdAndUpdate(id, data);
    if (data.imageToDelete) {
      data.imageToDelete.forEach(async (e) => {
        await cloudinary.uploader.destroy(e);
      });

      await campground.updateOne({
        $pull: { images: { filename: { $in: data.imageToDelete } } },
      });
    }

    if (req.files) {
      const img = req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }));
      await campground.images.push(...img);
      await campground.save();
    }
    res.json(campground);
  } catch (error) {
    console.log(error, "err");
  }
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const deletedCamp = await Campground.findByIdAndDelete(id);
  res.json(deletedCamp);
};
