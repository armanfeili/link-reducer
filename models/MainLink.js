const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MainLinksSchema = new Schema({
  realUrl: {
    type: String,
    required: true
  },
  linkCode: {
    type: String
  },
  convertedUrl: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = MainLink = mongoose.model('mainlinks', MainLinksSchema);
