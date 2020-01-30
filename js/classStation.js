class Station {
    constructor(station) {
        this.name = station.name;
        this.address = station.address;
        this.stand = station.totalStands.capacity;
        this.bike = station.totalStands.availabilities.bikes;
        this.latitude = station.position.latitude;
        this.longitude = station.position.longitude;
        this.status = station.status;
        this.number = station.number;
        if (this.bike === 0) {
            this.colorPoint = 'orange';
            this.color = L.icon({
                iconUrl: 'images/marker-icon-orange.png',
                shadowUrl: 'images/marker-shadow.png'
            })
        } else if (this.status === "CLOSED") {
            this.colorPoint = 'red';
            this.color = L.icon({
                iconUrl: 'images/marker-icon-red.png',
                shadowUrl: 'images/marker-shadow.png'
            })
        } else {
            this.colorPoint = 'green';
            this.color = L.icon({
                iconUrl: 'images/marker-icon-green.png',
                shadowUrl: 'images/marker-shadow.png'
            })
        }
    }

    markerDescription() { // Ajout d'un marqueur pour l'objet à la map + description et réservation de la station au clic
        const marker = L.marker([this.latitude, this.longitude], {
            icon: this.color
        }).addTo(mymap);

        marker.on("click", () => { // Affichage des informations suite à l'évènement "click" sur un marqueur
            $( () => {
                const $description_station = $('#description_station');
                $description_station.html("");

                $description_station.append("<p></p>"); // Création et insertion de l'élément qui affiche le nom de la station
                $('#description_station > p:first').attr('id', this.number).css({
                    background : '#343a40',
                    paddingTop : '10px',
                    paddingBottom : '10px',
                    margin : '0',
                    color: 'white',
                    borderRadius: '43px 43px 0 0'
                }).html('<span style = "color : ' + this.colorPoint + '; font-size : 25px"> ● </span>' + this.name); // Sélection du premier paragraphe de description et ajout de son ID et de son contenu


                $description_station.append("<p></p>"); // Création de l'élément qui affiche l'adresse de la station
                $('#description_station > p:nth-child(2)').attr({id : `Adresse ${this.number}`, class: 'mt-3'});
                if (this.address === "") {
                    $('#description_station > p:nth-child(2)').html("Aucune adresse renseignée."); // Cas où aucune adresse n'est renseignée
                } else {
                    $('#description_station > p:nth-child(2)').html(`<span class="font-weight-bold">Adresse</span> : ${this.address}`);
                }

                $description_station.append("<p></p>"); // Création de l'élément qui affiche le nombre de stands disponibles
                $('p:nth-child(3)').html(`<span class="font-weight-bold">Capacité</span> : ${this.stand} places`);

                $description_station.append("<p></p>"); // Création de l'élément qui affiche le nombre de vélos disponibles
                $('p:nth-child(4)').html(`<span class="font-weight-bold">${this.bike}</span> vélos disponibles`); 

                if ((this.status === "OPEN") && (this.bike != 0)) {
                    $description_station.append("<form></form>"); // Création d'un formulaire de réservation
                    $('form').attr('id', 'bookingForm');

                    $('#bookingForm').append("<label></label><input /><br />"); // Création du champ prénom
                    $('label:first').attr('for', 'firstName').html('<span class="font-weight-bold">Prénom</span> : ');
                    $('input:first').attr({type : 'text', name : 'firstName', id : 'firstName', class : 'bg-light', required : 'required'}).css('margin', '2px');
                    if (localStorage.getItem('prenom')){
                        $('input:first').val(localStorage.getItem("prenom"));
                    }

                    $('#bookingForm').append("<label></label><input /><br />"); // Création du champ nom de famille
                    $('label:last').attr('for', 'lastName').html('<span class="font-weight-bold">Nom de famille</span> : ');
                    $('input:last').attr({type : 'text', name : 'lastName', id : 'lastName', class : 'bg-light', required : 'required'}).css('margin', '2px');
                    if (localStorage.getItem('nom')){
                        $('input:last').val(localStorage.getItem("nom"));
                    }

                    $description_station.append('<div id="buttonsBooking" class="mx-auto"></div>'); //Création d'une div pour contenir les boutons

                    $('#buttonsBooking').append("<button></button>"); // Création du bouton de validation
                    $('button:last').attr({id : 'signingBookingForm', class : 'btn btn-primary btn-lg btn-block mt-3'}).html("Signer");

                    $description_station.append('<p id="erreur"></p>')

                    $('#signingBookingForm').on("click", () => {

                        const $booking = new Booking(this.name);

                        $booking.setReservation();
                    });
                }
            });
        });
    };
};