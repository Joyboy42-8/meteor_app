let ville = "tokyo";
let btn = document.getElementById("changer");

let recevoirTemperature = (ville) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + "&appid=36c1dc509687b2a5366079e5aa9edc33&units=metric";
    let requete = new XMLHttpRequest();
		requete.open("GET", url);
		requete.responseType = "json";
		requete.send();

		requete.onload = function () {
			if (requete.readyState === XMLHttpRequest.DONE) {
				if (requete.status === 200) {
					let reponse = requete.response;
					let degree = reponse.main.temp;
					document.getElementById("ville").textContent = ville;
					document.getElementById("temperature_label").textContent = degree;
					console.log(degree);
				} else {
					alert("Impossible de récupérer les données, veuillez réessayer plus tard !");
				}
			}
		}
}

btn.addEventListener("click", () => {
    let villeChoisie = prompt("Veuille entrez votre ville !");
    ville = villeChoisie;

    recevoirTemperature(ville);
});

recevoirTemperature(ville)