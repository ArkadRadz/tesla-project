function initDB(mapRef) {
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(mapRef);
	var ref = firebase.database().ref();
	ref.on('value', function (snap) {
		var markersArray = snap.val().chargingPoints;
		Object.keys(markersArray).map(keyName => {
			var objVal = markersArray[keyName];
			// console.log(objVal)
			var newMarker = new google.maps.Marker({
				position: objVal,
			});
			var infowindow = new google.maps.InfoWindow({
				content: objVal.name
			});
			newMarker.setMap(mapRef);
			newMarker.addListener('mouseover', function () {
				infowindow.open(mapRef, newMarker);
			});
			newMarker.addListener('mouseout', function () {
				infowindow.close();
			});
			newMarker.addListener('click', function () {
				showRoute(objVal, directionsService, directionsDisplay)
			});
		})
	}, function (error) {
		console.log("Error: " + error.code)
	});
}
