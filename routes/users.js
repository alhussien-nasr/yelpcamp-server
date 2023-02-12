const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { logout, login } = require("../controllers/users");
const { isLoggedIn } = require("../middleware");

router.post("/", async (req, res, next) => {
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
    res.status(400).json(error);
  }
});

router.get("/", isLoggedIn("you need to login"), (req, res) => {
  res.status(200).json(req.user);
});
router.post(
  "/login",
  passport.authenticate("local", { failureMessage: false }),
  login
);

router.post("/logout", logout);
module.exports = router;
