
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


$( document ).ready(function() {
	$(".dropdown-button").dropdown();

	if (!document.getElementById('vote-container')){
		Voting.Chart.createChart(seriesOptions);
	}
});
