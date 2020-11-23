const mongoose = require('mongoose');

const User = mongoose.model("User", {
  name: String,
  image: String
});

const Message = mongoose.model("Message", {
  message: String,
  senderName: String,
  date: Number
});

module.exports = { User, Message };