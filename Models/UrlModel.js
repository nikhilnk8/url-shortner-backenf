const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  orignal: { type: String, required: true },
  short: { type: String, required: true },
  name: { type: String, required: true },
  user: {
    ref: "UserModel",
    type: mongoose.Schema.Types.ObjectId,
  },
  createdOn: { type: Number, required: true },
});

const UrlModel = mongoose.model("UrlModel", urlSchema, "url-shortner");
module.exports = UrlModel;
