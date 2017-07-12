const pollServices = require('../services/pollservice'); 

module.exports = (app) => {

  app.route('/api/poll')
    .delete((req, res) => {
      const pollId= req.body.pollId;
      pollServices.deletePoll(pollId);
    	res.status(200).send({ success:'' });
    });

};
