import { gsap } from 'gsap'


const startGame = document.getElementById("startGame")
let timeLeft = 3
const timerElement = document.getElementById("timer")


// presmerovani na stranku game.html
startGame.addEventListener("click", clickStart)

function clickStart() {

const countDown = setInterval(() => {
    timeLeft--
    timerElement.textContent = timeLeft

    if (timeLeft <= 0) {
        clearInterval(countDown)
        timerElement.textContent = "jddiii"
       
        setTimeout(() => {
            window.location.href = "game.html"
        }, 1000)
    }
}, 1000)
      
}










let timeL = 3

const countDownStart = document.getElementById("countDownStart")

const countD = setInterval(() => {
    timeL--
    countDownStart.textContent = timeL

    if (timeLeft <= 0) {
        clearInterval(countDown)
        countDownStart.textContent = "GO"
    }
}, 1000)
























