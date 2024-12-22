import { gsap } from 'gsap'

let timer = 10
// let moveIntervalImg = 500

// fce pro pridani obrazku do herni plochy
function mainImage(src) {
    const img = document.createElement("img")
    img.src = src
    img.classList.add("gamePicture")

    const gameArea = document.getElementById("gameArea")
    gameArea.appendChild(img)
    
    movePicture(img, gameArea)

    //slouceni a zavolani funkci
    img.addEventListener("click", () => {
        scoreShoot()
        hitsShoot()
        movePicture(img, gameArea)
    })
}


// nahodne zobrazeni obrazku v herni plose + casovac 
function movePicture(img, gameArea) {
    const gameAreaRect = gameArea.getBoundingClientRect()

    
    function moveRandom() {
        const randomX = Math.random() * (gameAreaRect.width - img.width)
        const randomY = Math.random() * (gameAreaRect.height - img.height)

        img.style.position = "absolute"
        img.style.left = randomX + "px"
        img.style.top = randomY + "px"
    }

    
    const intervalImage = setInterval(moveRandom, moveIntervalImg)

    // zatim nechat, pote smazat, nastaveni do fce pro vsechny prvky 
    setTimeout(() => {
        clearInterval(intervalImage)
    },10000)
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
    let actualHit = parseInt(hitItem.textContent) || 11

    actualHit--
    hitItem.textContent = actualHit

    if (actualHit === 0) {
        alert("Game over")
    }
}

// casovac 
function timeOut() {
    let timeDown = 10
    let timeItem = document.getElementById("time")

    const timer = setInterval(() => {
        timeItem.innerText = timeDown
        timeDown--

        if (timeDown < 0) {
            clearInterval(timer)
        }
    }, 1000)
}
timeOut()




// fce pro nacteni rozmeru obrazku
// function getImageSizeInPixels() {
//     const img = document.querySelector(".gamePicture") // Získej obrázek pomocí třídy nebo jiného selektoru
//     const widthInPixels = img.clientWidth;  // Aktuální šířka obrázku v pixelech
//     const heightInPixels = img.clientHeight;  // Aktuální výška obrázku v pixelech
    
//     console.log(`Šířka obrázku: ${widthInPixels}px`);
//     console.log(`Výška obrázku: ${heightInPixels}px`);
// }

// Zavolání funkce po přidání obrázku na stránku
// getImageSizeInPixels();
