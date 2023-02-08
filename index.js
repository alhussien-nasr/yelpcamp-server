const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
// "mongodb://localhost:27017/camp"
let cors = require("cors");
const campgroundRouter = require("./routes/campgrounds");
const reviewRouter = require("./routes/reviews");
const passport = require("passport");
const User = require("./models/user");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const register = require("./routes/users");
const MongoStore = require("connect-mongo");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const db = mongoose.connection;
require("dotenv").config();
const allowOrgin = [
  "https://yelpcamp-pesp.onrender.com",
  "http://localhost:8080",
];
db.once("open", () => {
  console.log("ok");
});
let corsOptions = {
  origin: function (origin, callback) {
    if (allowOrgin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,OPTIONS,POST,DELETE",
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "token",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set("trust proxy", 1);
app.use(mongoSanitize());
// app.use(helmet());

app.use(
  session({
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: dbUrl,
      touchAfter: 24 * 3600,
    }),
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/campgrounds", campgroundRouter);
app.use("/campgrounds/:id/reviews", reviewRouter);
app.use("/user", register);
app.listen(process.env.PORT || 8080);
