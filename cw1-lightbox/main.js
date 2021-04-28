const gallery = document.querySelectorAll(".gallery img");

gallery.forEach( image => {
    image.addEventListener('click', () =>{
        const lightbox = document.querySelector(".lightbox");
        const currentImg = lightbox.querySelector("img");
        const arrowNext = lightbox.querySelector(".next");
        const arrowPrev = lightbox.querySelector(".prev");
        const text = lightbox.querySelector(".text");
        const closeBut = lightbox.querySelector("#closeImg");

        text.innerHTML = image.alt;

        currentImg.src = image.src;
        lightbox.classList.add("visible");

        closeBut.addEventListener("click", () => {
            lightbox.classList.remove("visible");
        });

        arrowNext.addEventListener("click", () => {
            if(image.nextElementSibling != null)
            {
                currentImg.src = image.nextElementSibling.src;
                image = image.nextElementSibling;
                text.innerHTML = image.alt;
            }
        });

        arrowPrev.addEventListener("click", () => {
            if(image.previousElementSibling != null)
            {
                currentImg.src = image.previousElementSibling.src;
                image = image.previousElementSibling;
                text.innerHTML = image.alt;
            }
        });
    });
} );


