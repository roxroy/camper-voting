const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
const configAuth = require('./config');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serializeUser',user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserializeUser',id);
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      User.findOne({ 'github.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        const newUser = new User();

        newUser.github.id = profile.id;
        newUser.github.username = profile.username;
        newUser.github.displayName = profile.displayName;
        newUser.github.publicRepos = profile._json.public_repos;

        newUser.save((err) => {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      });
    });
  }));
};
