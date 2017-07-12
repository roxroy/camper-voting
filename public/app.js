
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

function vote(pollId, choiceId) {
	 const body = JSON.stringify(pollId, choiceId);
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

$( document ).ready(function() {
	$(".dropdown-button").dropdown();

	if (document.getElementById('vote-container')){
		Voting.Chart.createChart(seriesOptions);
	}

	if (document.getElementById('MYPOLLS')){
		$( "#MYPOLLS" ).click(function(evt) {
			let $myparent = $(evt.target).closest('li');
		  let pollId = $myparent.data('id');
		  $myparent.remove();
		  deletePoll({ pollId });
		});
	}

});
