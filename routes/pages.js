const pollServices = require('../services/pollservice'); 
const userServices = require('../services/userservice'); 
const authUtil = require('../auth/auth.util');

module.exports = (app) => {

  app.route('/')
    .get((req, res) => {
      pollServices.getAll()
      .then(function(polls) {
        res.render('index', { title: 'Show all polls', polls });
      });
    });

  app.route('/profile')
    .get(authUtil.isLoggedIn, (req, res) => {
      userServices.getOne(req.user.github.id)
      .then(function(user) {
         res.render('profile', { title: 'Your profile', user });
      });
    });

  app.route('/signin')
    .get((req, res) => {
      res.render('signin', { title: 'Sign in to create your own polls' });
    });

  app.route('/polls/:pollId')
    .get((req, res) => {

      const pollId = req.params.pollId.trim();
      pollServices.getOne(pollId)
      .then(function(poll) {
        res.render('vote', { user: req.user, title: 'Cast your vote.', poll });
      });      
    })
    .post((req, res) => {

      const pollId = req.params.pollId.trim();
      const voteId = req.body.vote;
      const appPoll = pollServices.postVote(pollId, voteId);

      res.render('vote', { user: req.user, title: 'Cast your vote.', poll: appPoll });
    });

  app.route('/mypolls')
    .get(authUtil.isLoggedIn, (req, res) => {
      const ownerUserId = req.user.id; 

      pollServices.getByUser(ownerUserId)
      .then(function(polls) {
        res.render('mypolls', { user: req.user, title: 'Show all polls', polls });
      });
    });

  app.route('/mypolls/:pollId')
    .get(authUtil.isLoggedIn, (req, res) => {

      let appPoll = {};
      const pollId = req.params.pollId.trim();
      if(pollId === 'add') {
        appPoll = {
          title: '',
          answers: [ { choice:'' } ],
        }
      } else {
        appPoll = pollServices.getOne(pollId);
      }
      res.render('createpoll', { title: 'Show poll', poll: appPoll});
    });

};
