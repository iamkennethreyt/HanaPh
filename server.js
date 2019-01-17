const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");

const users = require("./routes/api/users");
const advertisements = require("./routes/api/advertisements");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//db config
const db = require("./config/key").mongoURI;

//connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("successfully connected to the database"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//use routesadvertisements
app.use("/api/users", users);
app.use("/api/advertisements", advertisements);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
