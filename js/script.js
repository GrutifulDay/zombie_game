import { gsap } from 'gsap'
import '@fontsource/vt323'
import "@fontsource/orbitron"


// WELCOME + REGISTRACE
const welcomeSection = document.getElementById("welcomeSection")
const welcomeBtn = document.getElementById("welcomeBtn")
const nameInput = document.getElementById('nameInput')
const usernameField = document.getElementById('username')
const submitUsernameBtn = document.getElementById('submitUsername')

let playerName = ''

welcomeBtn.addEventListener("click", () => {
    welcomeSection.style.display = "none"
    nameInput.style.display = 'flex'
})

submitUsernameBtn.addEventListener('click', () => {
    const username = usernameField.value.trim();
    if (username) {
        playerName = username;
        alert(`Welcome, ${playerName}!`);
        // Přechod na další sekci nebo logiku
    } else {
        alert('Please enter a valid name.');
    }
});


// VYBER HERNIHO MODU A PRESMEROVANI NA HRU
const pixelGameButton = document.getElementById("modePixelGame")
const postApoButton = document.getElementById("modePostApo")

function chooseGame(mode) {
    console.log(`Spouštím herní mód: ${mode}`);
    alert(`Herní mód ${mode} byl vybrán!`); 
}

pixelGameButton.addEventListener("click", () => chooseGame('Pixel Scary World'))
postApoButton.addEventListener("click", () => chooseGame('Post-Apocalyptic Adventure'))



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

