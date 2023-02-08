const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = new mongoose.Schema({
  email: { type: String, require: true },
});

Schema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", Schema);
