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
const modePixelButton = document.querySelector(".modePixel");
const gamePixel = document.getElementById("gamePixel");

const modePostApoButton = document.querySelector(".modePostApo")
const gamePostApo = document.getElementById("gamePostApo")


modePixelButton.addEventListener("click", () => {
    // Skryje modeSelection
    modeSelection.style.display = "none";
    // Zobrazi gamePixel
    gamePixel.style.display = "block";

})

modePostApoButton.addEventListener("click", () => {
    modeSelection.style.display = "none"

    gamePostApo.style.display = "block"
})



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
