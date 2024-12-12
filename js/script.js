import { gsap } from 'gsap'

// UVODNI STRANKA
const startGame = document.getElementById("startGame")
const timeGO = document.getElementById("time")

let timeDown = 3

// GAME
const shotsImage = document.getElementById("shotImage")

const life = document.getElementById("life")
const time = document.getElementById("time")
const score = document.getElementById("score")
const shots = document.getElementById("shots")
const level = document.getElementById("level")





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
        },500)
    }
},1000)  

}





























