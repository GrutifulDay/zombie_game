document.getElementById('testButton').addEventListener('click', () => {
    startGame('Pixel Game'); // Nebo 'Post-Apocalyptic Adventure'
});


// JSON
async function loadImageConfigs(mode) {
    const response = await fetch('data/images.json') 
    const data = await response.json()
    return mode === 'Pixel Game' ? data.pixelGame : data.postApoGame 
}


// GAME 
let timer = 20
//let moveIntervalImg = 1000

// seznam obrazku + score
let imageConfigs = []


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
        config.score === -100 ? resetScore() : scoreShoot(config.score)
    })

    movePicture(img, gameArea)
}

// nacitani img pri spusteni hry 
async function startGame(mode) {
    imageConfigs = await loadImageConfigs(mode)
    gameInterval = setInterval(() => {
        if(!isPaused) {
            addRandomImage()
        }
    }, 1000)
    startGame()
}

document.getElementById("modePixelGame").addEventListener("click", () => {
    startGame("pixel Game")
})

document.getElementById("modePostApo").addEventListener("click", () => {
    startGame("Post-Apocalyptic Adveture")
})

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

