import { gsap } from 'gsap'

// UVODNI STRANKA
const startGame = document.getElementById("startGame")
const timeGO = document.getElementById("time")

let timeDown = 3


// PRESMEROVANI NA game.html + ODPOCET 3,2,1 GO 
startGame.addEventListener("click", clickStart)

function clickStart() {

const countDown = setInterval(() => {
    timeDown--
    timeGO.textContent = timeDown

    if (timeDown <= 0) {
        clearInterval(countDown)
        timeGO.textContent = "GO!"
       
        setTimeout(() => {
            window.location.href = "game.html"
        }, 1000)
    }
}, 1000)
      
}



























