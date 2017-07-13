let User = require('../models/user');

const mapItem = (item) => {
  return {
    id : item._id,
    github : { 
      displayName: item.displayName,
      userName: item.userName,
      profileUrl: item.profileUrl,
    }
  }
}

const addNew = (profile, cb) => {
  const newUser = new User();

  newUser.github.id = profile.id;
  newUser.github.userName = profile.username;
  newUser.github.displayName = profile.displayName;
  newUser.github.profileUrl = profile.profileUrl;

  newUser.save((err) => {
    if (err) {
      throw err;
    }
    cb(newUser);
  });
};

const getOne = (profileId) => {
  return User.findOne({ 'github.id': profileId })
    .exec((err, user) => {
      if (err) {
        throw err;
      }

      if (user) {
        return mapItem(user);
      }
    });
};

module.exports = {
  getOne,
  addNew,
}