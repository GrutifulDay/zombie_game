import { gsap } from 'gsap'


const startGame = document.getElementById("startGame")
const timeDown = 3
const timeGO = document.getElementById("time")


// presmerovani na stranku game.html + interval na 3,2,1 GO 
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



























