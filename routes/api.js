const pollServices = require('../services/pollservice'); 

const getPollData = (reqbody) => {
  let data = {};
  if (reqbody.hasOwnProperty('pollId'))
    data.pollId = reqbody.pollId;
  data.title = reqbody.title;
  data.answers = reqbody.answers;
  
  return data;  
}

module.exports = (app) => {

 app.route('/api/vote')
    .post((req, res) => {
      const pollId= req.body.pollId;
      const choiceId= req.body.choiceId;
      const newChoice= req.body.newChoice;
      console.log('got api/vote', pollId, choiceId, newChoice );

      pollServices.postVote(pollId, choiceId, newChoice);
    	res.status(200).send({ success:'' });
    });

  app.route('/api/poll')
    .post((req, res) => {
      pollServices.savePoll(getPollData(req.body), req.user.id);
      res.status(200).send({ success:'' });
    })
    .delete((req, res) => {
      const pollId = req.body.pollId;

      pollServices.deletePoll(pollId);
    	res.status(200).send({ success:'' });
    });

};
