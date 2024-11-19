const shotImage = document.getElementById("shotImage");

// SKORE uzivatele po kliknuti na obrazek je pricteno +1 za klik
shotImage.addEventListener("click", function () {
    // 1. Přičteme skóre
    let scoreElement = this.nextElementSibling;
    if (scoreElement && scoreElement.textContent) {
        let score = Number(scoreElement.textContent);
        score = score + 1;
        scoreElement.textContent = score;
    }
    
   
    clickToggle();
});


function clickToggle() {
    
    shotImage.classList.add("show");

    
    setTimeout(() => {
        shotImage.classList.remove("show");

       
        moveImageToNewPosition();
    }, .3);
}

// Funkce pro přesunutí obrázku na nové místo
function moveImageToNewPosition() {
    // Příklad: obrázek se přesune na náhodné místo na obrazovce
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    shotImage.style.position = "absolute";  // Zajistíme, že obrázek je absolutně pozicovaný
    shotImage.style.left = randomX + "px";
    shotImage.style.top = randomY + "px";
}



