import { gsap } from 'gsap'
import '@fontsource/vt323'
import '@fontsource/orbitron'

// WELCOME + REGISTRACE
const welcomeBtn = document.getElementById("welcomeBtn")
const nameInput = document.getElementById("nameInput")
const submitUsername = document.getElementById("submitUsername")
const welcomeSection = document.getElementById("welcomeSection")
const modeSelection = document.getElementById("modeSelection")
const greeting = document.getElementById("greeting")

let stopAnimation = false

// SPUSTENI PRO NACTENI STRANKY
window.addEventListener("load", () => {
    stopAnimation = false // Reset stop animace
    animateText("welcomeText", 0)
    animateText("welcomeBtn", 2) 
})

// ZASTAVENI ANIMACE pri stisku ESC
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        stopAnimation = true // Zastaveni animace
        const activeSpans = document.querySelectorAll("span") // Najde vsechny span prvky
        activeSpans.forEach(span => {
            span.style.opacity = "1" // Zobrazi vsechny span najednou
        })
    }
})

// FCE PRO ZOBRAZENI FORMULARE ANIMACE
welcomeBtn.addEventListener("click", () => {
    stopAnimation = false 
    nameInput.style.display = "block"
    
    gsap.from("#nameInput", { opacity: 0, duration: 0.8 }) 
})

// PRESMEROVANI NA VYBER HERNIHO MODU
submitUsername.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim() 

    if (username) {
        welcomeSection.style.display = "none" 
        modeSelection.style.display = "block"

        greeting.innerHTML = `Hello <span class="nameHL">${username}</span>, <br>Choose Your Game Mode:` 

        animateText("greeting", 0)
    } else {
        alert("Please enter your name")
    }
})

// VYBER HERNIHO MODU
const pixelGameButton = document.getElementById("modePixelGame")
const postApoButton = document.getElementById("modePostApo")

function chooseGame(mode) {
    console.log(`Spoustim herni mod: ${mode}`) 
    alert(`Herni mod ${mode} byl vybran!`)

    if (mode === 'Pixel Scary World') {
        startPixelGame()
    } else if (mode === 'Post-Apocalyptic Adventure') {
        startPostApoGame()
    }
}

pixelGameButton.addEventListener("click", () => chooseGame('Pixel Scary World'))
postApoButton.addEventListener("click", () => chooseGame('Post-Apocalyptic Adventure'))

function startPixelGame() {
    console.log("Pixel Scary World se načítá...");
    // Načtení JSON dat, zobrazení obrázků atd.
}

function startPostApoGame() {
    console.log("Post-Apocalyptic Adventure se načítá...");
    // Načtení JSON dat, zobrazení obrázků atd.
}

// FCE PRO POSTUPNE ZOBRAZENI TEXTU
/**
 * 
 * @param {string} elementId
 * @param {number} delay 
 */
function animateText(elementId, delay = 0) {
    const element = document.getElementById(elementId)
    const textContent = element.textContent
    element.innerHTML = "" 

    // Rozdeleni textu na jednotliva pismena
    textContent.split("").forEach(letter => {
        const span = document.createElement("span")
        span.textContent = letter === " " ? "\u00A0" : letter // Zachovani mezer
        span.style.opacity = "0" 
        element.appendChild(span)
    })

    // Animace jednotlivych pismen
    const spans = element.querySelectorAll("span")
    spans.forEach((span, index) => {
        setTimeout(() => {
            if (stopAnimation) return
            span.style.opacity = "1" 
        }, index * 100 + delay * 1000)
    })
}
