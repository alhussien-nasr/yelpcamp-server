const User = require("../models/user");
const passport = require("passport");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    console.log(username, password, email);
    const user = new User({ username: username, email: email });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      console.log(err, "ererererer");
      console.log(req.isAuthenticated(), "isuath");
      console.log(req.session);
      res.json({ username, email, _id: user._id });
    });
  } catch (error) {
    console.log(error, "eeeerrr");
  }
};

module.exports.login = async (req, res) => {
  try {
    console.log(req.isAuthenticated());
    const { username, email, _id } = req.user;
    res.json({ username, email, _id });
  } catch (error) {
    console.log(error, "eeeerrr");
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.logout((err) => {
      console.log(err);
      console.log(req.isAuthenticated());
      console.log(req.user);
      res.status(200).json(req.user);
    });
  } catch (error) {
    console.log(error, "eeeerrr");
  }
};
