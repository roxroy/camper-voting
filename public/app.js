
const seriesOptions = {
	text : 'Browser market shares January, 2015 to May, 2015',
	data: [{
	            name: 'Microsoft Internet Explorer',
	            y: 56.33
	        }, {
	            name: 'Chrome',
	            y: 24.03,
	            sliced: true,
	            selected: true
	        }, {
	            name: 'Firefox',
	            y: 60.38
	        }, {
	            name: 'Safari',
	            y: 4.77
	        }, {
	            name: 'Opera',
	            y: 0.91
	        }, {
	            name: 'Proprietary or Undetectable',
	            y: 0.2
	        }]
};

function vote(pollId, choiceId, newChoice) {
	 const body = JSON.stringify({ pollId, choiceId, newChoice });
    fetch('/api/vote', {
      method: 'POST', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
    })
    .then(function(json) {
    	console.log('json', json);
    });
}

function savePollData(pollId, title, answers) {
	 const body = JSON.stringify({ pollId, title, answers });
    fetch('/api/poll', {
      method: 'POST', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
    })
    .then(function(json) {
    	console.log('json', json);
    });
}

function deletePoll(pollId) {
	 const body = JSON.stringify(pollId);
    fetch('/api/poll', {
      method: 'DELETE', credentials: 'include',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
    })
    .then(function(json) {
    	console.log('json', json);
    });
}

function votingActions(poll) {
	var app = new Vue({
	  el: '#VOTING',
	  data: {
	    message: 'Hello Vue!',
	    selectedChoice: false,
	    newChoice: '',
	  },
	  computed: {
			isAllowed: function () {
				return (this.newChoice.length);
			},
			isValid: function () {
				let valid = this.selectedChoice;
				if (this.selectedChoice==='NEW') 
						valid = this.newChoice.length;
				return valid;
			},
		},
		methods: {
      castVote: function () {
      	vote(poll.id, this.selectedChoice, this.newChoice );
      },
    },
	});
}

function editPollActions(poll) {
	var app = new Vue({
	  el: '#EDITPOLL',
	  data: {
	  	title: poll.title,
	  	answers: poll.answers,
	  },
	  computed: {
			isValid: function () {
				return this.title.length && this.answers.length;
			},
		},
		methods: {
      newChoice: function () {
      	this.answers.push({
	        choice: '',
	      });
      },
      savePoll: function () {
      	savePollData(poll.id, this.title, this.answers);
      	window.location.href = '/mypolls';
      },
    },
	});
}

$( document ).ready(function() {
	$(".dropdown-button").dropdown();

	if (document.getElementById('MYPOLLS')){
		$( ".card-delete" ).click(function(evt) {
			let $myparent = $(evt.target).closest('.card');
		  let pollId = $myparent.data('id');
		  $myparent.parent().remove();
		  deletePoll({ pollId });
		});
	}

});
