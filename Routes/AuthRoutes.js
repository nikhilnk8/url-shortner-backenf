const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  checkAuth,
} = require("../Controllers/AuthControllers");
const UserModel = require("../Models/UserModel");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", checkAuth, getUsers);

module.exports = router;
