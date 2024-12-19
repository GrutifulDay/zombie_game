import { gsap } from 'gsap'

// fce pro pridani obrazku do herni plochy
function mainPicture(src) {
    const img = document.createElement("img")
    img.src = src
    img.classList.add("gamePicture")

    document.getElementById("gameArea").appendChild(img)
}

mainPicture("image/ter.png")




