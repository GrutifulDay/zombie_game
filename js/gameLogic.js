// gameLogic.js
let timer = 10;
let moveIntervalImg = 1000;

// Seznam obrázků + skóre
const imageConfigs = [
    { "src": "images/pixelGame/img1.png", "score": 10 },
    { "src": "images/pixelGame/img2.png", "score": 20 },
    { "src": "images/pixelGame/img3.png", "score": -10 },
];

let currentImage = null;
let gameInterval = null;
let timerInterval = null;
let isPaused = false;
let isStart = false;
let timeRemaining = timer;

// Funkce pro přidání náhodného obrázku
function addRandomImage() {
    const gameArea = document.getElementById('gameArea');

    if (currentImage) {
        gameArea.removeChild(currentImage);
        currentImage = null;
    }

    const randomIndex = Math.floor(Math.random() * imageConfigs.length);
    const config = imageConfigs[randomIndex];

    const img = document.createElement('img');
    img.src = config.src;
    img.classList.add('gamePicture');

    gameArea.appendChild(img);
    currentImage = img;

    img.addEventListener('click', () => {
        if (config.score > 0) {
            scoreShoot(config.score);
        } else {
            resetScore();
        }
    });

    movePicture(img, gameArea);
}

// Pohyb obrázku v gameArea
function movePicture(img, gameArea) {
    const gameAreaRect = gameArea.getBoundingClientRect();

    const randomX = Math.random() * (gameAreaRect.width - img.width);
    const randomY = Math.random() * (gameAreaRect.height - img.height);

    img.style.position = 'absolute';
    img.style.left = randomX + 'px';
    img.style.top = randomY + 'px';
}

// Časovač
function startTimer() {
    const timeItem = document.getElementById('time');
    timeItem.innerText = timeRemaining;

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            timeItem.innerText = timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                clearInterval(gameInterval);
                alert('Game over');
            }
        }
    }, 1000);
}

// Přičtení skóre
function scoreShoot(points) {
    const scoreItem = document.getElementById('score');
    let actualScore = parseInt(scoreItem.textContent) || 0;

    actualScore += points;
    scoreItem.textContent = actualScore;
}

// Reset skóre
function resetScore() {
    const scoreItem = document.getElementById('score');
    scoreItem.textContent = 0;
}

// Funkce pro spuštění hry
function startGame() {
    if (isStart) {
        // Pokud je hra již spuštěná a byla pauznutá, pokračuje
        isPaused = false;
        return;
    }

    isStart = true;

    gameInterval = setInterval(() => {
        if (!isPaused) {
            addRandomImage();
        }
    }, moveIntervalImg);

    startTimer();
}

// Funkce pro pozastavení hry
function pauseGame() {
    if (isStart) {
        isPaused = true;
        console.log('Hra pozastavena');
    }
}

// Event Listeners pro tlačítka
document.querySelector('.start-item button').addEventListener('click', startGame);
document.querySelector('.stop-item button').addEventListener('click', pauseGame);


