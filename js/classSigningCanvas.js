// Balise à créer pour utiliser la class
// <canvas id="canvas"></canvas>

class SigningCanvas {
    constructor() { //Paramètres du canvas
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = 3;
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.clearButton = document.getElementById("bt-clear");
        this.canvas.width = 200;
        this.canvas.height = 150;
    }

    //Gestion des événements 
    evenementsListener() {
        let self = this ;

        //Clear canvas
        this.clearButton.addEventListener("click", function () {
            self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        });

        //Souris
        this.canvas.addEventListener("mousedown", function (e) {
            self.draw = true;
            self.lastPosition = self.getMousePosition(e);
        });

        this.canvas.addEventListener("mousemove", function (e) {
            self.mousePosition = self.getMousePosition(e);
            self.canvasResult()
        });

        document.addEventListener("mouseup", function (e) {
            self.draw = false;
        });


        // Stop scrolling (touch)
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });
        document.body.addEventListener("touchend", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });
        document.body.addEventListener("touchmove", function (e) {
            if (e.target == self.canvas) {
                e.preventDefault();
            }
        });


        // Touchpad
        this.canvas.addEventListener("touchstart", function (e) {
           self.mousePosition = self.getTouchPosition(e);
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            self.canvas.dispatchEvent(mouseEvent);
        });
        this.canvas.addEventListener("touchmove", function (e) {
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            self.canvas.dispatchEvent(mouseEvent);
        });
        this.canvas.addEventListener("touchend", function (e) {
            let mouseEvent = new MouseEvent("mouseup", {});
            self.canvas.dispatchEvent(mouseEvent);
        });
    }

    // Renvoie les coordonnées de la souris 
    getMousePosition(mouseEvent) {
        if (this.draw) {
            let oRect = this.canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Renvoie les coordonnées du pad 
    getTouchPosition(touchEvent) {
        let oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) {
            this.context.beginPath();
            this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.context.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.context.stroke();
            this.lastPosition = this.mousePosition;
        }
    };
}