import { gsap } from 'gsap'
import '@fontsource/vt323'
import '@fontsource/orbitron'

// WELCOME + REGISTRACE
const welcomeBtn = document.getElementById("welcomeBtn")
const nameInput = document.getElementById("nameInput")
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

        // animateText("greeting")

        insertPlayerNamePA(username)
        insertPlayerNamePX(username)
    } else {
        alert("please enter your name")
    }
})

// ZOBRAZENI herni sekci: PLAYER JMENA -zeptat se na duplicitu 
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

const modePostApoButton = document.querySelector(".modePostApo")
const gamePostApo = document.getElementById("gamePostApo")
const visualChartPostApo = document.getElementById("visualChartPostApo")

// VYBER HERNIHO MODU (spojeni fci)
function setupGameMode(modeButton, gameSection, visualChart) {
    modeButton.addEventListener("click", () => {
        modeSelection.style.display = "none";
        gameSection.style.display = "block";
        visualChart.style.display = "block";

        gsap.to(visualChart, { opacity: 1, duration: 0.5 });
    });
}
setupGameMode(modePixelButton, gamePixel, visualChartPixel);
setupGameMode(modePostApoButton, gamePostApo, visualChartPostApo);// modePixelButton.addEventListener("click", () => {

//     modeSelection.style.display = "none"
//     gamePixel.style.display = "block"
//     visualChartPixel.style.display = "block"

//     gsap.to(visualChartPixel, {opacity: 1, duration: .8 })

// })
// modePostApoButton.addEventListener("click", () => {
//     modeSelection.style.display = "none"
//     gamePostApo.style.display = "block"
//     visualChartPostApo.style.display = "block"

//     gsap.to(visualChartPostApo, {opacity: 1, duration: 2 })

// })

//IMG PRES FETCH z JSON
// fce fetch vytahuje img z data/images.json
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

//POST-APO po kliknuti na startGamePA zobrazeni IMG
document.getElementById("startGamePA").addEventListener("click", () => {
    fetchJSONData().then((data) => {
        if (data && data.postApoGame) {
            const images = data.postApoGame.filter(image => image.level === 1);
            if (images.length > 0) {
                const container = document.querySelector(".memory-gridPA");

                // Zpracování hry a přidání obrázků
                processGame(images, container, 1000);
            } else {
                alert("No images to display.");
            }
        } else {
            alert("Failed to load game data.");
        }
    });
    console.log("Images loaded:", images)
});

// OBECNA fce pro pridavani IMG - PRO OBA 
function processGame(images, container, interval = 1000, callback) {
    container.innerHTML = "";

    let index = 0;

    // Zpracuj obrázky postupně
    const intervalId = setInterval(() => {
        if (index < images.length) {
            // Vytvoř obal obrázku
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("image-wrapper");

            const img = document.createElement("img");
            img.src = images[index].src;
            img.alt = `Image ${index + 1}`;
            img.classList.add("game-image");

            // Popis obrázku
            const description = document.createElement("p");
            if (images[index].endGame) {
                description.textContent = "End Game";
            } else if (images[index].resetScore) {
                description.textContent = "Reset Score";
            } else {
                description.textContent = `Score: ${images[index].score}`;
            }

            imgWrapper.appendChild(img);
            imgWrapper.appendChild(description);
            container.appendChild(imgWrapper);

            // Animace zobrazení obrázku
            gsap.set(imgWrapper, { opacity: 0 });
            gsap.to(imgWrapper, { opacity: 1, duration: 0.5 });

            index++;
        } else {
            clearInterval(intervalId); // Zastav interval po zpracování všech obrázků
            startCountdown(callback); // Spusť odpočet po zobrazení obrázků
        }
    }, interval);
}

// Funkce pro odpočet
function startCountdown(callback) {
    const countdownElement = document.querySelector(".timeRememberSpanPX");
    let timeLeft = parseInt(countdownElement.textContent, 10);

    const countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            countdownElement.textContent = timeLeft;
        } else {
            clearInterval(countdownInterval);
            visualChartPixel.style.display = "none";
            if (callback) callback()
        }
    }, 1000);
}

// PIXEL po kliknuti na startGamePX zobrazeni IMG
document.getElementById("startGamePX").addEventListener("click", () => {
    fetchJSONData().then((data) => {
        if (data && data.pixelGame) {
            const images = data.pixelGame.filter(image => image.level === 1);
            if (images.length > 0) {
                const container = document.querySelector(".memory-gridPX");
                processGame(images, container, 1000);
            } else {
                alert("No images to display.");
            }
        }
    });
});





























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
