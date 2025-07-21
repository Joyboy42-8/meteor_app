let villeChoisie;

function erreur() {
	villeChoisie = "Tokyo";
	recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
	// const url = `https://api.openweathermap.org/data/3.0/onecall?ville=${ville}&appid=36c1dc509687b2a5366079e5aa9edc33`;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric`;
	let requete = new XMLHttpRequest();
	requete.open("GET", url);
	requete.responseType = "json";
	requete.send();

	requete.onload = function () {
		if (requete.readyState === XMLHttpRequest.DONE) {
			if (requete.status === 200) {
				let reponse = requete.response;
				let temperature = reponse.main.temp;
				document.getElementById("ville").textContent =
					ville;
				document.getElementById(
					"temperature_label"
				).textContent = temperature;
			} else {
				alert(
					"Impossible de récupérer les données, veuillez réessayer plus tard !"
				);
			}
		}
	};
}

if ("geolocation" in navigator) {
	navigator.geolocation.watchPosition((position) => {
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric`;
		let requete = new XMLHttpRequest();
		requete.open("GET", url);
		requete.responseType = "json";
		requete.send();

		requete.onload = function () {
			if (requete.readyState === XMLHttpRequest.DONE) {
				if (requete.status === 200) {
					let reponse = requete.response;
					let temperature = reponse.main.temp;
					let ville = reponse.name;
					document.getElementById("ville").textContent = ville;
					document.getElementById("temperature_label").textContent = temperature;
				} else {
					alert(
						"Impossible de récupérer les données, veuillez réessayer plus tard !"
					);
				}
			}
		};
	}, erreur, options);

	var options = {enableHighAccuracy : true}
} 
else {
	villeChoisie = "Tokyo";
	recevoirTemperature(villeChoisie);
}

document.getElementById("changer").addEventListener("click", () => {
	let villeChoisie = prompt("Veuille entrez votre ville !");
	recevoirTemperature(villeChoisie);
});
