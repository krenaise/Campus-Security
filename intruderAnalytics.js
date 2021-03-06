const math = require('mathjs');
var avgLat = 38.711815;

// // var clustering = require('density-clustering');
// var regression = require('regression');
// var epsVal = 5;
// var minPtsVal = 2;

// DBSCAN CLUSTERING START
// var dbscan = new clustering.DBSCAN();
// var clusters = dbscan.run(dataset, epsVal, minPtsVal);
// // console.log(clusters)
//
// var suitableRegressionPoints = [];
//
// // add support for nested arrays
// for (var i=0; i < clusters[0].length; i++) {
// 	suitableRegressionPoints.push(dataset[i]);
// }
// DBSCAN CLUSTERING END

var exports = module.exports = {};

function unweightedAverage(matrix) {
  var sum = 0;
  for (var i = 0; i < matrix.length; i++) {
    sum += matrix[i]
  }
  return sum/matrix.length
}

function findCentroid(latLonPairs) {
	// finding centroid of lat lon pairs
  var lonCoords = [];
  var latCoords = [];
  for (var i = 0; i < latLonPairs.length; i++) {
    latCoords.push(latLonPairs[i][0]);
    lonCoords.push(latLonPairs[i][1]);
  }
  return [unweightedAverage(latCoords), unweightedAverage(lonCoords)];
}

exports.locateIntruder = function(locationData) {
	var intruderLocation = findCentroid(locationData);
	if (intruderLocation[0] > avgLat) {
		return {safeZone: 'left'}
	} else {
		return {safeZone: 'right'}
	}
}
