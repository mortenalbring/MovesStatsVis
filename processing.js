function getDate(d) {
	return new Date(d.date);
}

(function() {
	var	parseDate = d3.time.format("%Y-%m-%d").parse;
	var format = d3.time.format("%Y-%m-%d").parse;


	var computedDataArray = [];

	var minDate;
	var maxDate;

	for(var i=0;i<summaryObject.length;i++) {


		var computedData = {};

		var datapoint = summaryObject[i];

	//	computedData.key = datapoint.date;

		var comyear = datapoint.date.substring(0,4);
		var commonth = datapoint.date.substring(4,6);
		var comday = datapoint.date.substring(6,8);


		var newdate = new Date(comyear,(commonth-1),comday);




		computedData.date = comyear + "-" + (commonth-1) + "-" +comday;
		if (i == 0) {
			minDate = parseDate(computedData.date);
		}
		if (i == (summaryObject.length-1)) {
			maxDate = parseDate(computedData.date);
		}
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

	var blarg = "moop";

	computedDataArray.forEach(function(d) {
		d.date = parseDate(d.date);
		d.value = +d.value;
	});



	var width = 600,
		height = 500;

	var margin = {top: 20, right: 30, bottom: 100, left: 70};

	var x = d3.time.scale().domain([minDate,maxDate]).range([0,width]);

	var y = d3.scale.linear()
		.domain([0,18000])
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

	chart.append("text")
		.attr("class", "label")
		.attr("x",-200)
		.attr("y",-margin.left+15)
		.text("Steps")
		.attr("transform","rotate(-90)")

	var barWidth = width / computedDataArray.length;




	var bar = chart.selectAll("g")
		.data(computedDataArray)
		.enter().append("g")
		.attr("transform", function(d, j) { return "translate(" + ((j-15)*barWidth) + ",0)"; });

	bar.append("rect")
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value); })
		.attr("width", barWidth - 1);

/*	bar.append("text")
		.attr("x", function(d) {return x(d.date)})
		.attr("y", function(d) { return y(d.value) + 3; })
		.attr("dy", ".75em")
		.text(function(d) { return d.value; });*/

})();


function type(d) {
	d.value = +d.value; // coerce to number
	return d;
}