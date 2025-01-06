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

// PROBLIKNUTI BUTTON PRI NECINOSTI
/**
 * @param {HTMLElement} element 
 */
function blinkElement(element) {
    gsap.to(element, {
        opacity: 0.5, 
        duration: 1,
        repeat: -1,
        color: "#ff007f",
        yoyo: true,
        ease: "power1.inOut"
    })
}

// spusteni animace probliknuti po nacteni stranky probliknuti
window.addEventListener("load", () => {
    stopAnimation = false
    animateText("welcomeText", 0, welcomeBtn)
});

// zastavi se pri klinuti na button
welcomeBtn.addEventListener("click", () => {
    gsap.killTweensOf(welcomeBtn)
    gsap.to(welcomeBtn, {opacity: 1, duration: .3 })
})


// PRESMEROVANI NA VYBER HERNIHO MODU (kliknutim nebo "enter")
nameInput.addEventListener("submit", (event) => {
    event.preventDefault()

    const username = document.getElementById("username").value.trim()

    if (username) {
        welcomeSection.style.display = "none"
        modeSelection.style.display = "block"

        greeting.innerHTML = `Hello <span class="nameHL">${username}</span>,<br> Choose Your Game Mode:`

        animateText("greeting")

        insertPlayerNamePA(username)
        insertPlayerNamePX(username)
    } else {
        alert("please enter your name")
    }
})

// ZOBRAZENI herni sekci: PLAYER JMENA 
function insertPlayerNamePA(username) {
    let playerSpan = document.querySelector("#player-itemPA .playerPA")
    if (playerSpan) {
        playerSpan.textContent = username
    }
}

function insertPlayerNamePX(username) {
    let playerSpan = document.querySelector("#player-itemPX .playerPX")
    if (playerSpan) {
        playerSpan.textContent = username
    }
}

// VYBER HERNIHO MODU
const modePixelButton = document.querySelector(".modePixel")
const gamePixel = document.getElementById("gamePixel")
const visualChartPixel = document.getElementById("visualChartPixel")
const visualChartPostApo = document.getElementById("visualChartPostApo")

modePixelButton.addEventListener("click", () => {
    modeSelection.style.display = "none"
    gamePixel.style.display = "block"
    visualChartPixel.style.display = "block"
})

const modePostApoButton = document.querySelector(".modePostApo")
const gamePostApo = document.getElementById("gamePostApo")
const visualChartPostApo = document.getElementById("visualChartPostApo")

modePostApoButton.addEventListener("click", () => {
    modeSelection.style.display = "none"
    gamePostApo.style.display = "block"
    visualChartPostApo.style.display = "block"
    gsap.to(visualChartPostApo, {opacity: 1, duration: .3 })

})

// PRIDANI IMG PRES FETCH UPRAVIT 
function fetchJSONData() {
    return fetch("./data/images.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("JSON data loaded:", data); // Kontrola načtených dat
            return data;
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error); // Výpis chyby
            return null;
        });
}

document.getElementById("startGamePA").addEventListener("click", () => {
    fetchJSONData()
        .then((data) => {
            if (data && data.postApoGame) {
                const images = data.postApoGame.filter((image) => image.level === 1);
                console.log("Filtered images for level 1:", images); // Výpis obrázků
                if (images.length > 0) {
                    const container = document.querySelector(".memory-gridPA");
                    displayImagesSequentially(images, container, 1000);
                } else {
                    console.error("No images found for level 1.");
                    alert("No images to display.");
                }
            } else {
                console.error("No images found in postApoGame.");
                alert("No images to display.");
            }
        });
});

function displayImagesSequentially(images, container, interval = 1000) {
    let index = 0;

    container.innerHTML = ""; // Vyčistíme předchozí obsah

    const intervalId = setInterval(() => {
        if (index < images.length) {
            const imgWrapper = document.createElement("div"); // Obal pro obrázek a text
            imgWrapper.classList.add("image-wrapper");

            const img = document.createElement("img");
            img.src = images[index].src;
            img.alt = `Image ${index + 1}`;
            img.classList.add("game-image");

            const description = document.createElement("p");
            description.textContent = `Score: ${images[index].score}`; // Popis

            imgWrapper.appendChild(img);
            imgWrapper.appendChild(description);

            container.appendChild(imgWrapper);
            index++;
        } else {
            clearInterval(intervalId); // Zastavíme interval
        }
    }, interval);
    console.log(`Displaying image: ${images[index].src}`);
}






















// ANIMACE 
// FCE PRO POSTUPNE ZOBRAZENI TEXTU
/**
* 
* @param {string} elementId
* @param {number} delay 
*/
function animateText(elementId, delay = 0, blinkTarget = null) {
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
    
    // po skonceni nastaveni probliknuti 
    const animationDuration = spans.length * 100 + delay * 1000
    if (blinkTarget) {
        setTimeout(() => {
            blinkElement(blinkTarget)
        }, animationDuration)
    } 
}


// document.body.addEventListener("keyup", function (event) {
//     console.log(event);
//     addMessage("user", event.key)

// })
