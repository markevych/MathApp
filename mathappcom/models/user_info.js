var mongoose = require('mongoose');

var userInfo = new mongoose.Schema({
  username: String,
  index: String,
  result: String,
  date: String
});

module.exports = mongoose.model("UserInfo", userInfo);