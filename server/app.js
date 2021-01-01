const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();
const rateLimiter = require("./middleware/rateLimiter");
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// bellow is the mongoose connection
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

// requiring and using routes
app.use("/admin/aws", require("./admin/admin"));

app.use("/admin/reset", require("./admin/passwordReset"));

app.use("/admin/auth", require("./admin/auth"));

app.use("/admin/blog", require("./admin/blog"));

app.use("/auth", require("./routes/auth"));

app.use("/users", require("./routes/users"));

app.get("/", rateLimiter.helloFriendSpeedLimiter, rateLimiter.helloFriendLimiter, (req, res) => {
  const hello = [];
  for (i = 0; i < 100000; i++) {
    hello.push("hello friend ");
  }
  res.send(hello.join(""));
});

app.listen(port, () => {
  console.log(`OMG! This is the best server I have ever seen! Oh, it is running on Port ${port} BTW.`);
});

// module.exports.handler = serverless(app);
