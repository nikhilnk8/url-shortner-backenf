const express = require("express");
const { checkAuth } = require("../Controllers/AuthControllers");
const {
  createUrl,
  deleteUrl,
  getUserUrl,
  findUrl,
} = require("../Controllers/urlControllers");
const UrlModel = require("../Models/UrlModel");
const router = express.Router();

router.post("/createUrl", checkAuth, createUrl);
router.delete("/deleteUrl", checkAuth, deleteUrl);
router.post("/getUrls", getUserUrl);
router.post("/findUrl", findUrl);

// test
router.get("/createUrl", checkAuth, async (req, res) => {
  const url = await UrlModel.find().populate("user");
  res.send(url);
});

module.exports = router;
