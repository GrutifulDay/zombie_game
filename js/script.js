import { gsap } from 'gsap'

// fce pro pridani obrazku do herni plochy
function mainImage(src) {
    const img = document.createElement("img")
    img.src = src
    img.classList.add("gamePicture")

    const gameArea = document.getElementById("gameArea")
    gameArea.appendChild(img)
    
    movePicture(img, gameArea)
}


// nahodne zobrazeni obrazku v herni plose
function movePicture(img, gameArea) {

    const gameAreaRect = gameArea.getBoundingClientRect()
    
    const randomX = Math.random() * (gameAreaRect.width - img.width)
    const randomY = Math.random() * (gameAreaRect.height - img.height)

    img.style.position = "absolute"
    img.style.left = randomX + "px"
    img.style.top = randomY + "px"
}
mainImage("image/hlava.png")

// pripocteni skore po kiknuti na obrazek 



function getImageSizeInPixels() {
    const img = document.querySelector(".gamePicture"); // Získej obrázek pomocí třídy nebo jiného selektoru
    const widthInPixels = img.clientWidth;  // Aktuální šířka obrázku v pixelech
    const heightInPixels = img.clientHeight;  // Aktuální výška obrázku v pixelech
    
    console.log(`Šířka obrázku: ${widthInPixels}px`);
    console.log(`Výška obrázku: ${heightInPixels}px`);
}

// Zavolání funkce po přidání obrázku na stránku
getImageSizeInPixels();
