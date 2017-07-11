const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const User = new Schema({
	_id: {
      type: String,
      'default': shortid.generate
  },
  github: {
    id: String,
    displayName: String,
    userName: String,
    profileUrl: String,
  },
});

module.exports = mongoose.model('User', User);
