const pollServices = require('../services/pollservice'); 
const userServices = require('../services/userservice'); 

module.exports = (app) => {

	app.route('/')
  	.get((req, res) => {
      const appPolls = pollServices.getAll();
    	res.render('index', { user: req.user, title: 'Show all polls', polls: appPolls });
  	});

 	app.route('/profile')
  	.get((req, res) => {
      console.log('profile', req.user);
      /*
      userServices.getOne(res.user.id)
      .then(function(user) {
         console.log(user);
    	   res.render('profile', { title: 'Your profile', user: user });
      });
      */
  	});

 	app.route('/signin')
  	.get((req, res) => {
    	res.render('signin', { title: 'Sign in to create your own polls' });
  	});

  app.route('/polls/:pollId')
    .get((req, res) => {

      const pollId = req.params.pollId.trim();
      const appPoll = pollServices.getOne(pollId);

      res.render('vote', { user: req.user, title: 'Cast your vote.', poll: appPoll });
    })
    .post((req, res) => {

      const pollId = req.params.pollId.trim();
      const voteId = req.body.vote;
      const appPoll = pollServices.postVote(pollId, voteId);

      res.render('vote', { user: req.user, title: 'Cast your vote.', poll: appPoll });
    });

  app.route('/mypolls')
    .get((req, res) => {
      const ownerId = '5d9034ef2d1a-4207-3616-a3f4';
      const appPolls = pollServices.getByUser(ownerId);

      res.render('index', { user: req.user, title: 'Show all polls', polls: appPolls });
    });

};
