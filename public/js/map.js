// initMap is initialized by Map API so it's not called from 'window.addEventListener(...)'
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: { lat: -25.363, lng: 131.044 }
	});
	var infoWindow = new google.maps.InfoWindow;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			infoWindow.setPosition(pos);
			infoWindow.setContent('Jesteś tutaj');
			infoWindow.open(map);
			map.setCenter(pos);
		}, function () {
			handleLocationError(true, infoWindow, map);
		});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map);
	}
initDB(map); // now in showMarkers.js
}
function handleLocationError(browserHasGeolocation, infoWindow, map) {
	infoWindow.setPosition(map.getCenter());
	infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
}
function showRoute(pos, service, display){
	if (navigator.geolocation == false){
		Console.log('Error: Your browser doesn\'t support geolocation.');
		return;
	}


	navigator.geolocation.getCurrentPosition(function(position) {
		var currentPos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		// console.log("Start: " + currentPos.lat + ", " + pos.lng);
		// console.log("Dest: " + pos.lat + ", " + pos.lng);

		service.route({
			origin: currentPos,
			destination: pos,
			travelMode: 'DRIVING'
		}, function (response, status) {
			if (status === 'OK') {
				display.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});

	});



}
