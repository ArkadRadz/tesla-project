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
	// initDB(map);
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
}
// function initDB(mapRef) {
	// var ref = firebase.database().ref();
	// ref.on('value',function(snap) {
		// markersArray = snap.val().chargingPoints;
		// markersArray.forEach(markerElement => {
			// // console.log(markerElement);
			// var newMarker = new google.maps.Marker({
				// position: markerElement,
			// });
			// newMarker.setMap(mapRef);
		// });
	// },function(error) {
		// console.log("Error: " + error.code)
	// });
// }
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
	var dbref = firebase.database().ref('/chargingPoints');
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var infowindow = new google.maps.InfoWindow({
                content: "<a href=''>Testing</a>"
            });

            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
			// dbref.push.set({
				// 'id_uslugodawcy': firebase.auth().currentUser.uid,
				// 'lat': results[0].geometry.location.lat(),
				// 'lng': results[0].geometry.location.lng()
			// });
			var dblength;
			dbref.on("value", function(snapshot) {
				dblength = snapshot.numChildren();
			})
			var dbref2 = firebase.database().ref('/chargingPoints/' + dblength);
			dbref2.set({
				'id_uslugodawcy': firebase.auth().currentUser.uid,
				'lat': results[0].geometry.location.lat(),
				'lng': results[0].geometry.location.lng()
			});
			console.log(results[0].geometry.location.lat());
			console.log(results[0].geometry.location.lng());
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
