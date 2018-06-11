// initMap is initialized by Map API so it's not called from 'window.addEventListener(...)'
function initMap() {
	var myLatLng = { lat: -25.363, lng: 131.044 };
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatLng
	});
	var marker = new google.maps.Marker({
		position: myLatLng,
	});
	marker.setMap(map);
	initDB(map);
}
function initDB(mapRef) {
	var markersArray;
	var ref = firebase.database().ref();
	ref.on('value',function(snap) {
		markersArray = snap.val().chargingPoints;

		Object.keys(markersArray).map(keyName => {
			var objVal = markersArray[keyName];
			// console.log(objVal)
			newMarker = new google.maps.Marker({
				position: objVal,
			});
			newMarker.setMap(mapRef);
		})


	},function(error) {
		console.log("Error: " + error.code)
	});
}
