const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: Object // ???????????????
  },
  links: {
    type: Number,
    default: 0
  }
});

module.exports = User = mongoose.model('users', UserSchema);
