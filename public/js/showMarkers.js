function initDB(mapRef) {
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
			newMarker.addListener('click', function () {
				infowindow.open(mapRef, newMarker);
			});
		})
	}, function (error) {
		console.log("Error: " + error.code)
	});
}
