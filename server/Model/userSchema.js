const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  fromTime: String,
  toTime: String,
  appointement: Array
});

const User = mongoose.model('user',userSchema);

module.exports = User;
