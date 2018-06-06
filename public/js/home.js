var handleSignedInUser = function(user) {
    document.getElementById('userName').style.display = "inline-block";
    document.getElementById('userName').textContent = firebase.auth().currentUser.email;
	document.getElementById('logowanie').style.display = 'none';
	document.getElementById('mapa').style.display = "inline-block";
	document.getElementById('dropdown').style.display = "initial";
};

var handleSignedOutUser = function() {
    document.getElementById('userName').style.display = 'none';
	document.getElementById('logowanie').style.display = "inline-block";
	document.getElementById('mapa').style.display = "none";
	document.getElementById('dropdown').style.display = "none";

};

firebase.auth().onAuthStateChanged(function(user) {
    user ? handleSignedInUser(user) : handleSignedOutUser();
});

var initApp = function() {
    document.getElementById('wyloguj').addEventListener('click', function() {
        firebase.auth().signOut();
    });
}

window.addEventListener('load', initApp);
