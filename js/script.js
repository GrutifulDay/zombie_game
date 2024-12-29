import { gsap } from 'gsap'
import '@fontsource/vt323'
import "@fontsource/orbitron"


// WELCOME + REGISTRACE
const welcomeBtn = document.getElementById("welcomeBtn")
const nameInput = document.getElementById("nameInput")
const submitUsername = document.getElementById("submitUsername")
const welcomeSection = document.getElementById("welcomeSection")
const modeSelection = document.getElementById("modeSelection")
const greeting = document.getElementById("greeting")

window.addEventListener("load", () => {
    animateText("welcomeText", 0); // Animace nadpisu Welcome in the Game
    animateText("welcomeBtn", 2); // Animace tlačítka What is your name? (se zpožděním 2 sekundy)
});

// FCE PRO ZOBRAZENI SUBMIT
welcomeBtn.addEventListener("click", () => {
    nameInput.style.display = "block"
    
    gsap.from("#nameInput", { opacity: 0, duration: .8 })

})

// PRESMEROVANI NA VYBER HERNIHO MODU =>doplneni textu do dalsi casti
// + animace textu
submitUsername.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim()

    if (username) {
        welcomeSection.style.display = "none"

        modeSelection.style.display = "block"

        greeting.innerHTML = `Hello <span class="nameHL">${username}</span>, <br>Choose Your Game Mode:`

        animateText("greeting", 0);
  
    } 
    else {
        alert("Please enter you name")
    }
})


// VYBER HERNIHO MODU A PRESMEROVANI NA HRU
const pixelGameButton = document.getElementById("modePixelGame")
const postApoButton = document.getElementById("modePostApo")


function chooseGame(mode) {
    console.log(`Spouštím herní mód: ${mode}`)
    alert(`Herní mód ${mode} byl vybrán!`) 
}

pixelGameButton.addEventListener("click", () => chooseGame('Pixel Scary World'))
postApoButton.addEventListener("click", () => chooseGame('Post-Apocalyptic Adventure'))


// ANIMACE VESKEREHO TEXTU - POSTUPNE
/**
 * 
 * @param {string} elementId - ID elementu, jehož text chcete animovat
 * @param {number} delay - Zpoždění před začátkem animace (v sekundách)
 */
function animateText(elementId, delay = 0) {
    const element = document.getElementById(elementId);
    const textContent = element.textContent; // Původní text
    element.innerHTML = ""; // Vyčištění obsahu

    // Rozdělení textu na jednotlivá písmena
    textContent.split("").forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter === " " ? "\u00A0" : letter; // Zachování mezer
        span.style.opacity = "0"; // Výchozí stav neviditelnosti
        element.appendChild(span);
    });

    // Animace jednotlivých písmen
    const spans = element.querySelectorAll("span");
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.style.opacity = "1"; // Postupné zobrazení písmen
        }, index * 100 + delay * 1000); // Zpoždění mezi písmeny a celkové zpoždění
    });
}









