// initMap is initialized by Map API so it's not called from 'window.addEventListener(...)'
function initMap() {
	var myLatLng = { lat: -25.363, lng: 131.044 };
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatLng
	});
	// var marker = new google.maps.Marker({
	// 	position: myLatLng,
	// });
	// marker.setMap(map);
	initDB(map); // now in showMarkers.js
}
