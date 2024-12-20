import { gsap } from 'gsap'

// fce pro pridani obrazku do herni plochy
function mainImage(src) {
    const img = document.createElement("img")
    img.src = src
    img.classList.add("gamePicture")

    const gameArea = document.getElementById("gameArea")
    gameArea.appendChild(img)
    
    movePicture(img, gameArea)

    //slouceni a zavolani funkci
    img.addEventListener("click", function () {
        scoreShoot()
        hitsShoot()
        movePicture(img, gameArea)
    })
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
mainImage("image/head.png")


//fce pro pripocteni skore +1
function scoreShoot(img) {
    let scoreItem = document.getElementById("score")
    let actualScore = parseInt(scoreItem.textContent) || 0

    actualScore++
    scoreItem.textContent = actualScore
}

// fce hits snizovani po kiknuti 
function hitsShoot(img) {
    let hitItem = document.getElementById("hit")
    let actualHit = parseInt(hitItem.textContent) || 10

    actualHit--
    hitItem.textContent = actualHit

    if (actualHit === 0) {
        alert("Game over")
    }
}






   


// fce pro nacteni rozmeru obrazku
// function getImageSizeInPixels() {
//     const img = document.querySelector(".gamePicture"); // Získej obrázek pomocí třídy nebo jiného selektoru
//     const widthInPixels = img.clientWidth;  // Aktuální šířka obrázku v pixelech
//     const heightInPixels = img.clientHeight;  // Aktuální výška obrázku v pixelech
    
//     console.log(`Šířka obrázku: ${widthInPixels}px`);
//     console.log(`Výška obrázku: ${heightInPixels}px`);
// }

// Zavolání funkce po přidání obrázku na stránku
// getImageSizeInPixels();
