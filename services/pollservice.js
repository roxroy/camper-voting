const appPolls = [
  {
    id : '2d0e119c-c665-3f7d-ad0d-6578c0c80242',
    title: 'Car',
    ownerId: '5d9034ef2d1a-4207-3616-a3f4',
    answers: [
      { choice: 'Acura', id: 163,
        clicks: [{userId:'guest', ip:'192.168.1.1'}]
      },
      { choice: 'Benz', id: 243,
        clicks: [],
      },
      { choice: 'Toyota', id: 123,
        clicks: [],
      }
    ]
  },
  {
    id : 'ad0e119c-ad0d-c665-3f7d-6578c0c80242',
    title: 'Truck',
    ownerId: '5d9034ef2d1a-4207-3616-a3f4',
    answers: [
      { choice: 'Jeep', id: 163,
        clicks: [{userId:'guest', ip:'192.168.1.1'}]
      },
      { choice: 'Land rover', id: 243,
        clicks: [],
      },
      { choice: 'GMC', id: 123,
        clicks: [],
      }
    ]
  },
  {
    id : '725f9788-4207-3616-a3f4-ef2d1a5d9034',
    title: 'Colour',
    ownerId: 'ef2d1a5d9034-4207-3616-a3f4',
    answers: [
      { choice: 'Red', id: 20,
        clicks: [{userId:'guest', ip:'192.168.1.1'}, {userId:'guest', ip:'192.168.1.3'}],
      },
      { choice: 'Green', id: 23,
        clicks: [],
      },
      { choice: 'Blue', id: 28,
        clicks: [],
      }
    ]
  }
];

function getAll() {
  return appPolls;
}

function getByUser(ownerId) {
  return appPolls.filter( item => item.ownerId == ownerId );
}


function getOne(pollId) {
  return appPolls.find( item => item.id == pollId );
}

function postVote(pollId, choiceId) {
  return appPolls.find( item => item.id == pollId );
}

function deletePoll(pollId) {
}

module.exports = {
  getAll,
  getOne,
  getByUser,
  postVote,
  deletePoll,
}