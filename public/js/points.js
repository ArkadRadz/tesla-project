window.onload = function(){
	var table = document.getElementById('table');
	initDB();
}
function initDB() {
	var ref = firebase.database().ref();
	console.log(firebase.database());
	console.log(ref);
	ref.once('value',function() {console.log('sad');});
	ref.once('value',function(snap) {
		console.log('xd');
		markersArray = snap.val().chargingPoints;
		var table = document.getElementById('table');
		for (xd = 0; xd<markersArray.length; xd++)
		{
			if (firebase.auth().currentUser.uid==markersArray[xd].id_uslugodawcy){
			var row = table.insertRow(0);
			var cell = row.insertCell(0);
			cell.innerHTML = 'Długość geograficzna: '+markersArray[xd].lat;
			cell.innerHTML+= '<br>Szerokość geograficzna: '+markersArray[xd].lng;
			}
		}
		
	});
}