// Nécessite un élément avec l'id "carousel" pour fonctionner

class Slider {
    
    constructor (images, texte) {
        this.n = 0;
        this.images = images;
        this.texte = texte;
        this.intervalID;
        this.total_slide = this.images.length -1;
    }

    generateSlider () {

        const fleches = document.createElement("div");
        fleches.id = "fleches";
        document.getElementById("carousel").appendChild(fleches);

        const left = document.createElement("i");
        left.classList.add("fas");
        left.classList.add("fa-arrow-circle-left");
        left.classList.add("text-dark");
        left.id = "left";
        document.getElementById("fleches").appendChild(left);

        const right = document.createElement("i");
        right.classList.add("fas"); 
        right.classList.add("fa-arrow-circle-right");
        right.classList.add("text-dark");
        right.id = "right";
        document.getElementById("fleches").appendChild(right);

        for (let i = 0 ; i < this.images.length ; i++) {
            const figure = document.createElement("figure");
            figure.id = "figure_" + (i+1);
            figure.style.display = "none";
            document.getElementById("carousel").appendChild(figure);
            const image = document.createElement("img");
            image.src = this.images[i];
            image.classList.add("images");
            document.getElementById("figure_" + (i+1)).appendChild(image);
            const figcaption = document.createElement("figcaption");
            figcaption.classList.add("text-white");
            figcaption.classList.add("text-center");
            figcaption.classList.add("align-self-center");
            figcaption.classList.add("border");
            figcaption.classList.add("border-white");
            figcaption.classList.add("font-weight-bold");
            figcaption.id = "texte_" + (i+1);
            figcaption.textContent = this.texte[i];
            document.getElementById("figure_" + (i+1)).appendChild(figcaption);
        }
        this.slides = document.querySelectorAll("figure");

        document.getElementById('pause').addEventListener('click', () => {
            this.stopDefile()
        });
    
        document.getElementById('lecture').addEventListener('click', () => {
            this.startDefile() 
        });
    
        document.getElementById('left').addEventListener('click', () => {
            this.moveLeft();
        });
    
        document.getElementById('right').addEventListener('click', () => {
            this.moveRight();
        });
    
        document.addEventListener('keydown', (e) => {
            if (e.which === 37) {
                this.moveLeft();
            } else if (e.which === 39) {
                this.moveRight();
            }
        });
    }

    moveLeft() {
        this.slides[this.n].style.display = "none";
        this.n--;
        if (this.n < 0) {
            this.n = this.total_slide;
        };
        this.slides[this.n].style.display = "block";
    }

    moveRight() {
        this.slides[this.n].style.display = "none";
        this.n++;
        if (this.n > this.total_slide) {
            this.n = 0;
        };
        this.slides[this.n].style.display = "block";
    }

    startDefile() {
        this.slides[this.n].style.display = "block";
        this.intervalID = window.setInterval(() => {
            this.slides[this.n].style.display = "none";
            this.n++;
            if (this.n > this.total_slide) {
                this.n = 0;
            };
            this.slides[this.n].style.display = "block";
        }, 5000);
    }
    
    stopDefile() {
        clearInterval(this.intervalID);
    }
    
}