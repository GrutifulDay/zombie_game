const startGameBtn = document.getElementById('startGameBtn')
const shotImage = document.getElementById("shotImage")
const lifeElement = document.getElementById("life")
const scoreElement = document.getElementById("score")
const hitsElement = document.getElementById("hits")
const timeElement = document.getElementById("time")

let lives = 3
let score = 0
let hitsNeeded = 10
let timeLeft = 20
let timerInterval = null
let hitCount = 0
let gameStarted = false

startGameBtn.addEventListener("click", startGame)

function startGame() {
    if (gameStarted) return
    gameStarted = true
    startGameBtn.disabled = true // Vypni tlačítko pro start
    lives = 3
    score = 0
    hitCount = 0
    hitsNeeded = 10 // Počet sestřelení na začátku
    updateInfo()

    startCountdown()
    moveImageToNewPosition()
}

function startCountdown() {
    timerInterval = setInterval(() => {
        timeLeft--
        timeElement.textContent = formatTime(timeLeft)

        if (timeLeft <= 0 || lives <= 0) {
            clearInterval(timerInterval)
            endGame()
        }
    }, 1000)
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60)
    let secs = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

shotImage.addEventListener("click", function () {
    if (!gameStarted) return

    // Při kliknutí na obrázek
    score += 10 // Přičítá 10 bodů
    hitCount++ // Počet úspěšných zásahů
    hitsElement.textContent = hitsNeeded - hitCount // Počet zbývajících sestřelení

    updateInfo()
    moveImageToNewPosition()

    if (hitCount >= hitsNeeded) {
        // Když uživatel sestřelí všechny cíle, zvýší se level
        hitsNeeded += 5 // Zvyšte počet cílů pro další level
        hitCount = 0
        moveImageToNewPosition()
    }
})

function moveImageToNewPosition() {
    // Získání šířky a výšky okna prohlížeče
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Získání rozměrů obrázku
    const imageWidth = shotImage.offsetWidth;
    const imageHeight = shotImage.offsetHeight;

    // Ověření, zda máme správné rozměry obrázku
    if (!imageWidth || !imageHeight) return;  // Pokud obrázek ještě není načtený, neprovádíme přesun.

    // Generování náhodné pozice pro obrázek s ohledem na jeho velikost
    const randomX = Math.random() * (windowWidth - imageWidth); // Zajišťuje, že obrázek nezajede za pravý okraj
    const randomY = Math.random() * (windowHeight - imageHeight); // Zajišťuje, že obrázek nezajede za dolní okraj

    // Nastavení nové pozice obrázku
    shotImage.style.left = `${randomX}px`;
    shotImage.style.top = `${randomY}px`;
}



function updateInfo() {
    lifeElement.textContent = lives
    scoreElement.textContent = score
    hitsElement.textContent = hitsNeeded - hitCount
}

function endGame() {
    alert(`Hra skončila! Vaše skóre je: ${score}`)
    startGameBtn.disabled = false
    gameStarted = false
    score = 0
    hitsNeeded = 10
    hitCount = 0
    updateInfo()
}
