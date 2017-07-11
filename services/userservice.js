let User = require('../models/user');

const mapItem = (item) => {
  return {
        id : item._id,
        github : { 
          displayName: item.displayName,
          userName: item.userName,
          publicRepos: item.publicRepos,
        }
  }
}

const getOne = (profileId) => {
console.log('getOne',profileId);
  User.find({ 'github.id': profileId })
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
}