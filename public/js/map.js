function initMap() {
    var uluru = {lat: 10, lng: 10};
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: uluru});
    var marker = new google.maps.Marker({position: uluru, map: map});

    var markerDatabase = 0;
    var ref = firebase.database().ref();
    ref.on("value", function(snapshot) {
        markerDatabase = snapshot.val();
    }, function (error) {
        console.log("Error: " + error.code);
    });
    var markerArray = markerDatabase.chargingPoints;
    for (var i = 0; i < markerDatabase.chargingPoints.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markerArray[i].lat, markerArray[i].lng),
            map: map
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initMap();
}, false);