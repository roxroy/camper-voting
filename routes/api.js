const pollServices = require('../services/pollservice'); 

module.exports = (app) => {

 app.route('/api/vote')
    .delete((req, res) => {
      const pollId= req.body.pollId;
      const choiceId= req.body.choiceId;

      pollServices.postVote(pollId, choiceId);
    	res.status(200).send({ success:'' });
    });

  app.route('/api/poll')
    .delete((req, res) => {
      const pollId= req.body.pollId;

      pollServices.deletePoll(pollId);
    	res.status(200).send({ success:'' });
    });

};
