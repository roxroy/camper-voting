const Poll = require('../models/poll');
const shortid = require('shortid');

const mapListItem = (item) => {
  return {
    _id : item._id,
    title :  item.title,
  }
}

function getAll() {
  return Poll.find({})
    .exec((err, polls) => {
      if (err) {
        throw err;
      }

      return polls.map(item => {
        mapListItem(item);
      });
  });
}

function getByUser(ownerUserId) {
  return Poll.find({ownerUserId })
    .exec((err, polls) => {
      if (err) {
        throw err;
      }

      return polls.map(item => {
        mapListItem(item);
      });
  });
}

function getOne(pollId) {
  return Poll.findOne({ _id : pollId })
    .exec((err, poll) => {
      if (err) {
        throw err;
      }
      return poll;
  });
}

function postVote(pollId, choiceId, newChoice) {
  return Poll.findOne({ _id : pollId })
    .exec((err, poll) => {
      if (err) {
        throw err;
      }
      if (choiceId != 'NEW') {
        const answer = poll.answers.find(p => choiceId === p._id);
        answer.clicks++;
      } else {
        poll.answers.push({
          choice: newChoice,
          clicks: 1 });
      }

      poll.save(function(err, poll) {
        if (err) throw err;
        return poll;
      });

  });;
}

function savePoll(pollData, ownerUserId) {
  console.log('savePoll', pollData, ownerUserId);
  const searchPollId = pollData.hasOwnProperty('pollId') ? pollData.pollId : '-new-';

  Poll.findById(searchPollId, function(err, poll) {
    if (err) throw err;

    if (!poll) {
      poll = Poll({
        ownerUserId: ownerUserId,
        answers: [],
      });
    };
    poll.title = pollData.title;

    pollData.answers.forEach(item => {
      if (!item.hasOwnProperty('_id')) {
        poll.answers.push({
          choice: item.choice,
          clicks: 0 });
      } else {
        const answer = poll.answers.find(p => item._id === p._id);
        answer.choice = item.choice;        
      }
    });

    console.log('save poll poll', poll);
    poll.save(function(err, poll) {
      if (err) throw err;
      console.log('Poll Updated!');
    });
  });
}

function deletePoll(pollId) {
   Poll.findById(pollId, (err, poll) => {
    if (err) throw err;

    poll.remove(function(err) {
      if (err) throw err;
      console.log('Successfully deleted: ' + pollId );
    });
  });
}

module.exports = {
  getAll,
  getOne,
  getByUser,
  postVote,
  deletePoll,
  savePoll,
}