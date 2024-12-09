let life = 3
let score = 0
let hits = 10
let timeRemaining = 10
let countdown
let gameStarted = false

const lifeElement = document.getElementById('life')
const scoreElement = document.getElementById('score')
const hitsElement = document.getElementById('hits')
const timeElement = document.getElementById('time')
const shotImage = document.getElementById('shotImage')
const startGameBtn = document.getElementById('startGameBtn')

// Fce pro start hry
function startGame() {
    if (gameStarted) return

    gameStarted = true
    hits = 10
    hitsElement.textContent = hits

    // Spustit odpocet 3, 2, 1
    let countdownNum = 3
    let countdownText = setInterval(() => {
        if (countdownNum > 0) {
            timeElement.textContent = `00:0${countdownNum}`
            countdownNum--
        } else {
            clearInterval(countdownText)
            startRound()
        }
    }, 1000)
}

// Funkce pro zacatek kola
function startRound() {
    // Resetovat čas na 10 sekund
    timeRemaining = 10
    updateTimeDisplay()

    // Po kliknuti, pricits zasah
    shotImage.addEventListener('click', handleHit)

    // Start odpočtu
    countdown = setInterval(() => {
        timeRemaining--
        updateTimeDisplay()
        if (timeRemaining <= 0 || hits <= 0) {
            clearInterval(countdown)
            endRound()
        }
    }, 1000)

    // random obrazek na hodnem miste
    moveShotImage()
}

// Fce obrazek na nahodnem miste
function moveShotImage() {
    const gameArea = document.getElementById('gameArea')
    const maxX = gameArea.clientWidth - shotImage.offsetWidth
    const maxY = gameArea.clientHeight - shotImage.offsetHeight

    const randomX = Math.random() * maxX
    const randomY = Math.random() * maxY

    shotImage.style.left = `${randomX}px`
    shotImage.style.top = `${randomY}px`
}

// zobrazeni casu 
function updateTimeDisplay() {
    if (timeRemaining < 10) {
        timeElement.textContent = `00:0${timeRemaining}`
    } else {
        timeElement.textContent = `00:${timeRemaining}`
    }
}

// Funkce pro zasah
function handleHit() {
    if (hits > 0) {
        score += 10
        hits--
        hitsElement.textContent = hits
        scoreElement.textContent = score

        // Přesunout obrázek
        moveShotImage()
    }
}

// Funkce pro konec kola
function endRound() {
    // Pokud je čas uplynulý a hráč nemá ještě dostatek zásahů, ztrácí život
    if (hits <= 0) {
        life--
        lifeElement.textContent = life
        if (life <= 0) {
            alert("Game Over")
            resetGame()
        }
    } else {
        scoreElement.textContent = score
    }

    
    resetGame()
}

// Funkce pro reset hry
function resetGame() {
    gameStarted = false
    score = 0
    hits = 10
    timeRemaining = 10
    life = 3

    scoreElement.textContent = score
    hitsElement.textContent = hits
    timeElement.textContent = `00:00`
    lifeElement.textContent = life
    startGameBtn.disabled = false
}

// Aktivovat tlačítko pro začátek hry
startGameBtn.addEventListener('click', () => {
    startGame()
    startGameBtn.disabled = true 
})

