const pollServices = require('./poll.service'); 

module.exports = (app) => {

	app.route('/')
  	.get((req, res) => {
      const appPolls = pollServices.getAll();

    	res.render('index', { user: req.user, title: 'Show all polls', polls: appPolls });
  	});

 	app.route('/about')
  	.get((req, res) => {
    	res.render('about', { title: 'About our company' });
  	});

 	app.route('/signin')
  	.get((req, res) => {
    	res.render('signin', { title: 'Sign in to create your own polls' });
  	});

};
