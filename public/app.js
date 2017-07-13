
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
    	window.location.reload();
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
	let app = new Vue({
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
      	vote(poll._id, this.selectedChoice, this.newChoice );
      },
    },
	});

	function tweet(text) {
		if(text.length > 136){
      text = text.substr(0, 135) + '...';
    }
    let tweetLink = "https://twitter.com/intent/tweet?text=" + text;
    window.open(tweetLink, "_blank");
  }

	$('#TWEET').on('click', function() {
    tweet(poll.title);
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
      	savePollData(poll._id, this.title, this.answers);
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
