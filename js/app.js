const shotImage = document.getElementById("shotImage");


// SKORE uzivatele po kliknuti na obraze je pricteno +1 za klik

shotImage.addEventListener("click", function () {
        
    let scoreElement = this.nextElementSibling
            
        
    if (scoreElement && scoreElement.textContent) {
        let score = Number(scoreElement.textContent)
            score = score + 1
            scoreElement.textContent = score
        }
        
});

function clickToggle() {
    shotImage.classList.add("show")

    setTimeout(() => {
        shotImage.classList.remove("show")
    },2000)
}


