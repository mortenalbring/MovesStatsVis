(function() {
	var	parseDate = d3.time.format("%Y-%m").parse;
	var format = d3.time.format("%Y-%m-%d").parse;


	var computedDataArray = [];

	for(var i=0;i<summaryObject.length;i++) {

		var computedData = {};

		var datapoint = summaryObject[i];

	//	computedData.key = datapoint.date;

		var comyear = datapoint.date.substring(0,4);
		var commonth = datapoint.date.substring(4,6);
		var comday = datapoint.date.substring(6,8);


		var newdate = new Date(comyear,commonth,comday);

		computedData.date = comyear + "-" + commonth + "-" +comday;

		var walkingDistance = 0;

		for(var j=0;j<datapoint.summary.length;j++) {
			var item = datapoint.summary[j];
			var act = item.activity;
			if (act == "walking") {
				walkingDistance = walkingDistance + item.distance;
			}
		}

		computedData.value = walkingDistance;

		computedDataArray.push(computedData);

	}


	var testvalues =d3.values(computedDataArray);

	var testvalues2 = d3.values(testvalues);


	for(var ttt = 0;ttt<testvalues.length;ttt++) {

		var testentry = testvalues[ttt];

		var xxxxxx  = 42;


	}


	var testdata = d3.values(computedDataArray);

	var maxxx = d3.max(d3.values(computedDataArray));



	computedDataArray.forEach(function(d) {
		d.date = parseDate(d.date);
		d.value = +d.value;
	});



	var width = 960,
		height = 500;

	var margin = {top: 20, right: 30, bottom: 30, left: 60};

	var x = d3.scale.ordinal().rangeRoundBands([0,width],.1);

	var y = d3.scale.linear()
		.domain([0,20000])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");



	var yAxis  = d3.svg.axis()
		.scale(y)
		.orient("left");

	var chart = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	chart.append("g")
		.attr("class","y axis")
		.call(yAxis);

	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-90)" );

	var barWidth = width / computedDataArray.length;




	var bar = chart.selectAll("g")
		.data(computedDataArray)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

	bar.append("rect")
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.attr("width", barWidth - 1);

	bar.append("text")
		.attr("x", x.rangeBand() / 2)
		.attr("y", function(d) { return y(d.value) + 3; })
		.attr("dy", ".75em")
		.text(function(d) { return d.value; });

})();


function type(d) {
	d.value = +d.value; // coerce to number
	return d;
}