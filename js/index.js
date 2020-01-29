$( () => {
    const $images = ["images/image1.png", "images/image2.jpg", "images/image3.jpg", "images/image4.jpg"];
    const $texte = ["Des vélos partout,", "Pour tout le monde.", "Pour travailler...", "Pour se détendre..."];

    const slider = new Slider($images, $texte);
    slider.generateSlider();
    $(document).on('load', slider.startDefile());
});

let mymap = L.map('mapid').setView([45.764043, 4.835659], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.mapbox.com/">MapBox</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZWxkYXNpYSIsImEiOiJjanVlMDYzdmcwN2pmNDlwaGwzd3BmcnB1In0.wDa-rIK9fXD-MHjpkQLE4g'
}).addTo(mymap);

ajaxGet("https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=498f60787750ccc5b8137fcbed010cf1e49e4393", function (donnee) {
    let stations = JSON.parse(donnee);
    console.log(stations);

    for (let i = 0; i < stations.length; i++) {
        // Définition du nouvel objet
        const station = new Station(stations[i]);
        //console.log(station);
        station.markerDescription(); // Création du marqueur
    }

    //Affichage de la réservation en cours si elle existe
    if ((sessionStorage.getItem('prenom')) && (sessionStorage.getItem('nom')) && (sessionStorage.getItem('station'))) {
        $('#currentBooking').append('<p id="booking"></p>');
        $('#currentBooking').append('<p id="chrono"></p>');
        
        let $prenom = sessionStorage.getItem("prenom");
        let $nom = sessionStorage.getItem("nom");
        let $station = sessionStorage.getItem("station");

        $('#booking').html(`Vélo réservé à la station <span class="font-weight-bold">${$station}</span> par ${$prenom} ${$nom} .`)
        const $chrono = new Chrono(1200000);
        $chrono.startChrono();
    }
});