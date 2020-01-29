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

    

    reservation(){
        $('#currentBooking').append('<p id="booking"></p>');
        $('#currentBooking').append('<p id="chrono"></p>');
        
        // Création d'une session qui mémorise le nom et le prénom pendant la session
        sessionStorage.setItem("prenom", $('input:first').val());
        sessionStorage.setItem("nom", $('input:last').val());
        sessionStorage.setItem("station", this.name);

        let $prenom = sessionStorage.getItem("prenom");
        let $nom = sessionStorage.getItem("nom");
        let $station = sessionStorage.getItem("station");

        const $chrono = new Chrono(1200000);
        $chrono.startChrono();

        $('#booking').html(`Vélo réservé à la station <span class="font-weight-bold"> ${$station} </span> par ${$prenom} ${$nom}.`);
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
                        if (($('input:first').val() === "") || ($('input:last').val() === "")){
                            $('#erreur').html('Veuillez renseigner un nom et un prénom pour réserver.');
                        } else {
                            $('#erreur').remove();

                            $('#signingBookingForm').css('display', 'none');

                            $('#buttonsBooking').append("<button></button>"); // Création du bouton pour clear le canvas
                            $('#buttonsBooking > button:nth-child(2)').attr({id : 'bt-clear', class : 'btn btn-danger btn-sm m-2'}).html("Effacer"); 

                            $('#buttonsBooking').before('<canvas id="canvas" class="border border-dark mt-3 mb-2"></canvas>');
                            const $signingCanvas = new SigningCanvas();
                            $signingCanvas.evenementsListener();
                            
                            $('#buttonsBooking').append("<button></button>"); // Création du bouton de réservation
                            $('button:last').attr({id : 'buttonBookingForm', class : 'btn btn-success btn-sm m-2'}).html("Réserver");

                            $('#buttonBookingForm').on("click", () => {

                                if ((sessionStorage.getItem('prenom')) && (sessionStorage.getItem('nom')) && (sessionStorage.getItem('station'))) {
                                    if (confirm("Souhaitez-vous remplacer votre réservation?")) {
                                        // On efface la réservation en cours et on refait une réservation
                                        $('#booking').html(''); 
                                        
                                        sessionStorage.clear();

                                        this.reservation();
                                    }
                                } else {
                                
                                    //Création de variables qui mémorisent le nom et le prénom pour s'en reservir lors d'une future réservation
                                    localStorage.setItem("prenom", $('input:first').val());
                                    localStorage.setItem("nom", $('input:last').val());

                                    this.reservation();
                                }
                            })
                        }
                    });
                }
            });
        });
    };
};