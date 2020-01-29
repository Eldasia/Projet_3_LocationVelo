class Chrono {
  constructor(time) {
    this.timeCountDown = time;
  }

  startChrono () {
    $( () => {
      // Définition de la durée du chronomètre
      const $chronoDuration = new Date().getTime() + this.timeCountDown;
      if(!sessionStorage.getItem('timer')) {
        sessionStorage.setItem('timer', $chronoDuration);
      }
      // Mis à jour du chronomètre toutes les 1s
      const $chrono = setInterval(() => {
        $('#chrono').html('');
        // La date et l'heure d'aujourd'hui
        const $now = new Date().getTime();
        // Différence entre maintenant et la date pour la durée du chronomètre
        let $distance;
        if (sessionStorage.getItem('timer') === null) {
          $distance = $chronoDuration - $now;
        } else {
          $distance = sessionStorage.getItem('timer') - $now;
        }
        sessionStorage.setItem('timeLeft', $distance);
        // Calcule du temps pour les minutes et les secondes
        const $minutes = Math.floor(($distance % (1000 * 60 * 60)) / (1000 * 60));
        const $seconds = Math.floor(($distance % (1000 * 60)) / 1000);
        $('#chrono').html(`Temps restant: <span class="font-weight-bold">${$minutes} minutes</span>, <span class="font-weight-bold">${$seconds} secondes</span>.`)
        // Quand le chrono arrive à 0, on clear le chronomètre
        if ($distance < 0) {
          clearInterval($chrono);
          sessionStorage.clear();
          $('#chrono').html('Votre réservation est expirée.');
        }
      }, 1000);
    });
  }
}