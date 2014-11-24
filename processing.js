(function() {
	
	var computedDataArray = [];

	for(var i=0;i<summaryObject.length;i++) {

		var computedData = {};

		var datapoint = summaryObject[i];

		computedData.date = datapoint.date;

		var walkingDistance = 0;

		for(var j=0;j<datapoint.summary.length;j++) {
			var item = datapoint.summary[j];

			var act = item.activity;



			if (act == "walking") {
				walkingDistance = walkingDistance + item.distance;
			}
		}

		computedData.walkingDistance = walkingDistance;

		computedDataArray.push(computedData);


	}

	var xx = 42;


})();