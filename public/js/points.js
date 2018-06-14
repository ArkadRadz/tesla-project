window.onload = function () {
	var table = document.getElementById('table');
	initDB();
}
function initDB() {
	var ref = firebase.database().ref();
	//console.log(firebase.database());
	//console.log(ref);
	ref.once('value', function (snap) {
		// console.log('xd');
		markersArray = snap.val().chargingPoints;
		var table = document.getElementById('table');


		Object.keys(markersArray).map(keyName => {
			var objVal = markersArray[keyName];
			// console.log(objVal)
			if (firebase.auth().currentUser.uid == objVal.id_uslugodawcy) {
				var row = table.insertRow(0);
				var cell = row.insertCell(0);
				cell.innerHTML = 'Długość geograficzna: ' + objVal.lat;
				cell.innerHTML += '<br>Szerokość geograficzna: ' + objVal.lng;
				cell.innerHTML += '<br>Nazwa: <b>' + objVal.name + "</b>";
			}
		})

	});
}
