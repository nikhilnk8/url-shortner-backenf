const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { constants } = require("./config");

// enable cors
const cors = require("cors");
app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// databse connection
mongoose.connect(
  constants.db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("DB connected"))
);

// router imports
const authRouter = require("./Routes/AuthRoutes");
const urlRouter = require("./Routes/urlRoutes");

// auth router
app.use("/auth", authRouter);
app.use("/", urlRouter);

// port
app.listen(constants.port, () => console.log("server running !"));
