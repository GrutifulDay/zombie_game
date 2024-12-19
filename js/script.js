import { gsap } from 'gsap'

// fce pro pridani obrazku do herni plochy

function mainImage(src) {
    const img = document.createElement("img")
    img.src = src
    img.classList.add("gamePicture")

    const gameArea = document.getElementById("gameArea")
    gameArea.appendChild(img)
    
    moveImage(img, gameArea)
}

// nahodne zobrazeni obrazku 
function moveImage(img, gameArea) {

    const gameAreaRect = gameArea.getBoundingClientRect()
    
    const randomX = Math.random() * (gameAreaRect.width - img.width)
    const randomY = Math.random() * (gameAreaRect.height - img.height)

    img.style.position = "absolute"
    img.style.left = randomX + "px"
    img.style.top = randomY + "px"
}

mainImage("image/hlava.png")




