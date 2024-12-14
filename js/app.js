const shotImage = document.getElementById("shotImage")
let scoreElement = document.getElementById("score")
let shotsElement = document.getElementById("shots")

// let moveInterval = 3000





// SKORE uzivatele po kliknuti na obrazek je pricteno +1 za klik
shotImage.addEventListener("click", function clickScore () {
    
    if (scoreElement && scoreElement.textContent) {
        let score = Number(scoreElement.textContent)
        score = score + 1
        scoreElement.textContent = score
    }
})

// -1 za pocet sestreleni
shotImage.addEventListener("click", function shotsDown () {
    
    if (shotsElement && shotsElement.textContent) {
        let shots = Number(shotsElement.textContent)
        shots = shots - 1
        shotsElement.textContent = shots

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


function clickToggle() {
    
    shotImage.classList.add("show")

    
    setTimeout(() => {
        shotImage.classList.remove("show")

        moveImageToNewPosition()
    },1000)
}



