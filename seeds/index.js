const campground = require("../models/campground");
const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelper");
mongoose.connect("mongodb://localhost:27017/camp");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seeds = async () => {
  const res = await campground.deleteMany({});
  console.log(res);
  for (let i = 0; i < 50; i++) {
    console.log(i);
    const random1000 = Math.floor(Math.random() * 1000);
    const randomImageNum = Math.floor(Math.random() * 50) + 1000;
    campground.insertMany([
      {
        title: `${sample(places)} ${sample(descriptors)}`,
        images: [
          {
            url: "https://res.cloudinary.com/dkdctyngu/image/upload/v1675618725/yelpcamp/l6xvatxjyoiusxletcuv.avif",
            filename: "yelpcamp/l6xvatxjyoiusxletcuv",
          },
          {
            url: "https://res.cloudinary.com/dkdctyngu/image/upload/v1675618726/yelpcamp/doyq931oktvgw9tbnb72.avif",
            filename: "yelpcamp/doyq931oktvgw9tbnb72",
          },
        ],
        price: 10,
        location: `${cities[random1000].city} ${cities[random1000].state}`,
        geometry: [cities[random1000].latitude, cities[random1000].longitude],
        describtion:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae error, quia, ratione perferendis sed unde illum possimus fugit eligendi quo quos ab. Obcaecati dolore exercitationem iusto magnam in aliquam ut.",
        author: "63dbb70aa42616476fa7dbf2",
      },
    ]);
  }
};

seeds();
