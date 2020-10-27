const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { constants } = require("../config");

// validation
const joi = require("joi");
const userSchema = joi.object({
  username: joi.string().min(6).required(),
  password: joi.string().min(6).required(),
});

const registerUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
      let userExist = await UserModel.findOne({ username: req.body.username });
      if (userExist == null) {
        let hashed_password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({
          username: req.body.username,
          password: hashed_password,
        });
        res.json({
          message: "user created",
          user_data: {
            id: user._id,
            user_name: user.username,
          },
        });
      } else {
        res.json({ message: "Username already exists !" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    else {
      let userExist = await UserModel.findOne({ username: req.body.username });
      if (await bcrypt.compare(req.body.password, userExist.password)) {
        let token = jwt.sign(
          {
            userId: userExist._id,
            role: "BASIC",
            userName: userExist.username,
          },
          constants.authToken
        );
        res.header("auth-token", token).send(token);
      } else {
        res.send("Password incorrect");
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

const checkAuth = async (req, res, next) => {
  try {
    console.log("body", req.body);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.send("no token");
    let user = await jwt.verify(token, constants.authToken);
    // console.log("verified", user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    console.log(req.user);
    const users = await UserModel.find().populate("url-shortner");
    res.send(users);
  } catch (error) {
    res.send(error);
  }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.checkAuth = checkAuth;
exports.getUsers = getUsers;
