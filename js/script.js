import { gsap } from 'gsap'
import '@fontsource/vt323'
import "@fontsource/orbitron"


// WELCOME


// GAME 
let timer = 20
//let moveIntervalImg = 1000


// seznam obrazku + score
const imageConfigs = [
    { src: 'image/dyneHF.png', score: 10 }, 
    { src: 'image/hezknet.png', score: -100 }, 
    { src: 'image/pumpkin.png', score: 30 }, 
]


let currentImage = null
let gameInterval = null
let timerInterval = null
let isPaused = false
let timeRemaining = timer

// fce pro pridani random img
function addRandomImage() {
    const gameArea = document.getElementById('gameArea')

    
    if (currentImage) {
        gameArea.removeChild(currentImage)
        currentImage = null
    }

    
    const randomIndex = Math.floor(Math.random() * imageConfigs.length)
    const config = imageConfigs[randomIndex]

    const img = document.createElement('img')
    img.src = config.src
    img.classList.add('gamePicture')


    gameArea.appendChild(img)
    currentImage = img

    img.addEventListener('click', () => {
        if (config.score > 0) {
            scoreShoot(config.score)
        } else {
            resetScore()
        }
    })

    movePicture(img, gameArea)
}

// pohyb obrazku v gameArea
function movePicture(img, gameArea) {
    const gameAreaRect = gameArea.getBoundingClientRect()

    const randomX = Math.random() * (gameAreaRect.width - img.width)
    const randomY = Math.random() * (gameAreaRect.height - img.height)

    img.style.position = 'absolute'
    img.style.left = randomX + 'px'
    img.style.top = randomY + 'px'
}

// casovac
function startTimer() {
    const timeItem = document.getElementById('time')
    timeItem.innerText = timeRemaining

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--
            timeItem.innerText = timeRemaining

            if (timeRemaining <= 0) {
                clearInterval(timerInterval)
                clearInterval(gameInterval)
                alert('Game over')
            }
        }
    }, 1000)
}

// pricteni score
function scoreShoot(points) {
    const scoreItem = document.getElementById('score')
    let actualScore = parseInt(scoreItem.textContent) || 0

    actualScore += points
    scoreItem.textContent = actualScore
}

// reset score
function resetScore() {
    const scoreItem = document.getElementById('score')
    scoreItem.textContent = 0
}

// fce pro spusteni hry
function startGame() {
    gameInterval = setInterval(() => {
        if (!isPaused) {
            addRandomImage()
        }
    }, moveIntervalImg)

    startTimer()
}

// fce pro pozastaveni/obnoveni hry
function togglePause() {
    isPaused = !isPaused // prepinac

    const stopButton = document.querySelector('.stop-item button')
    stopButton.textContent = isPaused ? '▶️' : '||' // zmena textu na tlacitku
}

// pauza tlacitko
document.querySelector('.stop-item button').addEventListener('click', togglePause)


startGame()

