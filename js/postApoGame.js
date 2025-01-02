let timer = 10
let moveIntervalImg = 1000

// VYBER IMG PODLE MODU 
const imageConfigs = {
    pixel: [
        { "src": "images/pixelGame/img1.png", "score": 10 },
        { "src": "images/pixelGame/img2.png", "score": 20 },
        { "src": "images/pixelGame/img3.png", "score": -10 },
    ],
    postApo: [
        { "src": "images/postApoGame/img1.png", "score": 10 },
        { "src": "images/postApoGame/img2.png", "score": 20 },
        { "src": "images/postApoGame/img3.png", "score": -10 },
    ],
}

let currentImage = null
let gameInterval = null
let timerInterval = null
let isPaused = false
let isStart = false
let timeRemaining = timer

// FCE PRO PRIDANI NAHODNEHO OBRAZKU
function addRandomImage(gameSection) {
    const gameArea = gameSection.querySelector('.gameArea')
    const gameType = gameSection.dataset.game
    const configs = imageConfigs[gameType]

    if (currentImage) {
        gameArea.removeChild(currentImage)
        currentImage = null
    }

    const randomIndex = Math.floor(Math.random() * configs.length)
    const config = configs[randomIndex]

    const img = document.createElement('img')
    img.src = config.src
    img.classList.add('gamePicture')

    gameArea.appendChild(img)
    currentImage = img

    img.addEventListener('click', () => {
        if (config.score > 0) {
            scoreShoot(gameSection, config.score)
        } else {
            resetScore(gameSection)
        }
    })

    movePicture(img, gameArea)
}

// POHYB OBRAZKU V GAME-AREA
function movePicture(img, gameArea) {
    const gameAreaRect = gameArea.getBoundingClientRect()

    const randomX = Math.random() * (gameAreaRect.width - img.width)
    const randomY = Math.random() * (gameAreaRect.height - img.height)

    img.style.position = 'absolute'
    img.style.left = randomX + 'px'
    img.style.top = randomY + 'px'
}

// START GAME S CASOVACEM
function startTimer(gameSection) {
    const timeItem = gameSection.querySelector('.time')
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

// UPDATE PRO SCORE
function scoreShoot(gameSection, points) {
    const scoreItem = gameSection.querySelector('.score')
    let actualScore = parseInt(scoreItem.textContent) || 0

    actualScore += points
    scoreItem.textContent = actualScore
}

//RESET PRO SCORE
function resetScore(gameSection) {
    const scoreItem = gameSection.querySelector('.score')
    scoreItem.textContent = 0
}

// START GAME
function startGame(gameSection) {
    if (isStart) {
        isPaused = false
        return
    }

    isStart = true

    gameInterval = setInterval(() => {
        if (!isPaused) {
            addRandomImage(gameSection)
        }
    }, moveIntervalImg)

    startTimer(gameSection)
}

// PAUZA 
function pauseGame(gameSection) {
    if (isStart) {
        isPaused = true
    }
}

// Initialize event listeners for all game sections
document.querySelectorAll('section[data-game]').forEach((gameSection) => {
    const startButton = gameSection.querySelector('.start-item button')
    const stopButton = gameSection.querySelector('.stop-item button')

    startButton.addEventListener('click', () => {
        startGame(gameSection)
    })

    stopButton.addEventListener('click', () => {
        pauseGame(gameSection)
    })
})
