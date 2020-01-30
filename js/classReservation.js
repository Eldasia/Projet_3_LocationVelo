class Booking {
    constructor(nameStation){
        this.nameStation = nameStation;
    }

    getReservation(){
        $('#currentBooking').append('<p id="booking"></p>');
        $('#currentBooking').append('<p id="chrono"></p>');

        // Création d'une session qui mémorise le nom et le prénom pendant la session
        sessionStorage.setItem("prenom", $('input:first').val());
        sessionStorage.setItem("nom", $('input:last').val());
        sessionStorage.setItem("station", this.nameStation);

        let $prenom = sessionStorage.getItem("prenom");
        let $nom = sessionStorage.getItem("nom");
        let $station = sessionStorage.getItem("station");

        const $chrono = new Chrono(1200000);
        $chrono.startChrono();

        $('#booking').html(`Vélo réservé à la station <span class="font-weight-bold"> ${$station} </span> par ${$prenom} ${$nom}.`);
    }

    setReservation() {
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
                        $('#currentBooking').html(''); 
                        
                        sessionStorage.clear();

                        this.getReservation();
                    }
                } else {
                
                    //Création de variables qui mémorisent le nom et le prénom pour s'en reservir lors d'une future réservation
                    localStorage.setItem("prenom", $('input:first').val());
                    localStorage.setItem("nom", $('input:last').val());

                    this.getReservation();
                }
            })
        }
    }
}