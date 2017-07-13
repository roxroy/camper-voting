const Poll = require('../models/poll');
const shortid = require('shortid');

const appPolls = [
  {
    id : '2d0e119c-c665-3f7d-ad0d-6578c0c80242',
    title: 'Car',
    ownerUserId: '5d9034ef2d1a-4207-3616-a3f4',
    answers: [
      { choice: 'Lexus', id: 153,
        clicks: 4
      },
      { choice: 'Acura', id: 163,
        clicks: 3
      },
      { choice: 'Benz', id: 243,
        clicks: 5
      },
      { choice: 'Avalon', id: 123,
        clicks: 2,
      }
    ],
    votersUserIds: ['3f7d'],
    votersIps: ['192.168.1.1'],
  },
  {
    id : 'ad0e119c-ad0d-c665-3f7d-6578c0c80242',
    title: 'Truck',
    ownerUserId: '5d9034ef2d1a-4207-3616-a3f4',
    answers: [
      { choice: 'Jeep', id: 163,
        clicks: 3
      },
      { choice: 'Land rover', id: 243,
        clicks: 5,
      },
      { choice: 'GMC', id: 123,
        clicks: 2,
      }
    ],
    votersUserIds: ['3f7d'],
    votersIps: ['192.168.1.2'],
  },
  {
    id : '725f9788-4207-3616-a3f4-ef2d1a5d9034',
    title: 'Colour',
    ownerUserId: 'ef2d1a5d9034-4207-3616-a3f4',
    answers: [
      { choice: 'Red', id: 20,
        clicks: 1,
      },
      { choice: 'Green', id: 23,
        clicks: 2,
      },
      { choice: 'Blue', id: 28,
        clicks: 1,
      }
    ],
    votersUserIds: ['3f7d'],
    votersIps: ['192.168.1.2'],
  }
];

const makeNewPoll = (pollData) => {
  let data = {};
  if (reqbody.hasOwnProperty('pollId'))
    data.pollId = reqbody.pollId;
  data.title = reqbody.title;
  data.answers = reqbody.answers;
  
  return data;  
}

const mapListItem = (item) => {
  return {
        id : item._id,
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
      console.log('getOne', pollId, poll);
      return poll;
  });
}

function postVote(pollId, choiceId) {
  return appPolls.find( item => item.id == pollId );
}

function savePoll(pollData, ownerUserId) {
  console.log('savePoll', pollData, ownerUserId);
  const searchPollId = pollData.hasOwnProperty('pollId') ? pollData.pollId : '-new-';

  Poll.findById(searchPollId, function(err, poll) {
    if (err) throw err;

    console.log('save poll find', poll);
    if (!poll) {
      poll = Poll({
        title: pollData.title,
        ownerUserId: ownerUserId,
        answers: [],
      });
    };

    pollData.answers.forEach(item => {
      if (!item.hasOwnProperty('_id')) {
        poll.answers.push({
          choice: item.choice,
          clicks: 0 });
      } else {
        poll.answers.find(p => item._id === p._id).title = item.title;
      }
    });

    console.log('poll', poll);
    poll.save(function(err, poll) {
      if (err) throw err;
      console.log('Poll created!');
      //res.status(200).send(mapItem(job));
    });
  });
}

function deletePoll(pollId) {
}

module.exports = {
  getAll,
  getOne,
  getByUser,
  postVote,
  deletePoll,
  savePoll,
}