const shotImage = document.getElementById("shotImage")
let scoreElement = document.getElementById("score")

// let moveInterval = 3000



// SKORE uzivatele po kliknuti na obrazek je pricteno +1 za klik
shotImage.addEventListener("click", function () {
    
    if (scoreElement && scoreElement.textContent) {
        let score = Number(scoreElement.textContent)
        score = score + 1
        scoreElement.textContent = score
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



