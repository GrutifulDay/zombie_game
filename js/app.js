const shotImage = document.getElementById("shotImage")

let scoreElement = document.getElementById("score")
let shotsElementSC = document.getElementById("shots")

// let moveInterval = 1000



// SKORE uzivatele po kliknuti na obrazek je pricteno +1 za klik
shotImage.addEventListener("click", function clickScore () {
    
    if (scoreElement && scoreElement.textContent) {
        let score = Number(scoreElement.textContent)
        score = score + 1
        scoreElement.textContent = score
    }
})

// -1 za pocet sestreleni - zacatek 10 
shotImage.addEventListener("click", function shotsDown () {
    
    if (shotsElementSC && shotsElementSC.textContent) {
        let shots = Number(shotsElementSC.textContent)
        shots = shots - 1
        shotsElementSC.textContent = shots

        if (shots === 0) {
            alert("Game over")
        }
    }
})

//Funkce pro přesunutí obrázku na nové místo
function moveImageToNewPosition() {
    
    const randomX = Math.random() * window.innerWidth
    const randomY = Math.random() * window.innerHeight

    shotImage.style.position = "absolute" 
    shotImage.style.left = randomX + "px"
    shotImage.style.top = randomY + "px"
}

setInterval(moveImageToNewPosition, moveInterval)


// function clickToggle() {
    
//     shotImage.classList.add("show")

    
//     setTimeout(() => {
//         shotImage.classList.remove("show")

//         moveImageToNewPosition()
//     },1000)
// }



