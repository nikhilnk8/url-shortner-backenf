const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "BASIC" },
  url: [
    {
      ref: "UrlModel",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");
module.exports = UserModel;
