const UrlModel = require("../Models/UrlModel");

// function to shrink url
const shrinkUrl = () => {
  let randomStr = "ni.khapp/";
  let reference =
    "QWERTYUIOPLKJHGFDASZXCVBNM123456789qwertyuioplkjhgfdsazxcvbnm";
  for (let i = 0; i < 20; i++) {
    randomStr += reference[Math.floor(Math.random() * 60)];
  }
  return randomStr;
};
// creadte url
const createUrl = async (req, res) => {
  try {
    const url = await UrlModel.create({
      orignal: req.body.orignal,
      short: shrinkUrl(),
      user: req.body.user,
      name: req.body.name,
      createdOn: req.body.createdOn,
    });
    res.send(url);
  } catch (error) {
    res.send(error.message);
  }
};

// delete Url
const deleteUrl = async (req, res) => {
  const result = await UrlModel.deleteOne({ _id: req.body._id });
  console.log(result);
  return res.send("URL Deleted");
};

// get one usrer Urls
const getUserUrl = async (req, res) => {
  try {
    const urls = await UrlModel.find({ user: req.body.user }).sort({
      createdOn: -1,
    });
    res.json(urls);
  } catch (error) {
    return res.send(error);
  }
};

const findUrl = async (req, res) => {
  try {
    const url = await UrlModel.findOne({ short: req.body.short });
    res.send(url.orignal);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.createUrl = createUrl;
exports.deleteUrl = deleteUrl;
exports.getUserUrl = getUserUrl;
exports.findUrl = findUrl;
