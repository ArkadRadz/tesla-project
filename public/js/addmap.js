// initMap is initialized by Map API so it's not called from 'window.addEventListener(...)'
function initMap() {
	var myLatLng = { lat: -25.363, lng: 131.044 };
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatLng
	});
	initDB(map);
	var geocoder = new google.maps.Geocoder();
	var button = document.getElementById('submit')
	var input = document.getElementById('address')
	input.addEventListener("keyup", function (event) {
		event.preventDefault();
		if (event.keyCode === 13 && input.value.length > 2) {
			button.click();
		}
	});
	button.addEventListener('click', function () {
		geocodeAddress(geocoder, map);
	});
}
function geocodeAddress(geocoder, resultsMap) {
	var address = document.getElementById('address').value;
	var loc = { 'address': address };
	geocoder.geocode(loc, function (results, status) {
		if (status === 'OK') {
			var pos = results[0].geometry.location;
			resultsMap.setCenter(pos);
			new google.maps.Marker({
				map: resultsMap,
				position: pos
			});
			var UID = firebase.auth().currentUser.uid;
			// console.log(UID)
			var ref = firebase.database().ref("/chargingPoints");
			// console.log(ref);
			var point = {
				id_uslugodawcy: UID,
				lat: pos.lat(),
				lng: pos.lng(),
				name: address
			};
			// console.log(point);
			ref.push().set(point, function () {
				// console.log("Add to DB OK");
			}).catch(function (error) {
				console.error('Synchronization failed. Error: ' + error.code);
			})
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
