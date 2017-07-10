var Voting = Voting || {};

Voting.Chart = (function() {

  function createChart(seriesOptions) {
  	Highcharts.chart('vote-container', {
  	    chart: {
  	        plotBackgroundColor: null,
  	        plotBorderWidth: null,
  	        plotShadow: false,
  	        type: 'pie'
  	    },
  	    title: false,
  	    tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  	    },
  	    plotOptions: {
  	        pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
  	    },
  	    series: [{
  	        name: 'Brands',
  	        colorByPoint: true,
  	        data: seriesOptions.data,
  	    }]
  	});
  }

  return  {
    createChart  : createChart,
  }

}());
