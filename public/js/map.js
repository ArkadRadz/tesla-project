function initMap() {
	var myLatLng = { lat: -25.363, lng: 131.044 };

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatLng
	});

	var marker = new google.maps.Marker({
		position: myLatLng,
		title: 'Hello World!'
	});

	marker.setMap(map);
}

function initDB() {
	var ref = firebase.database().ref();

	ref.on('value',function(snap) {
		console.log(snap.val());
	},function(error) {
		console.log(error.)
	});
}


window.addEventListener('load',initDB);
