// SKORE uzivatele po kliknuti na obraze je pricteno +1 za klik
let shotImage = document.getElementById("shotImage");

    shotImage.addEventListener("click", function () {
        
        let scoreElement = this.nextElementSibling
            
        
        if (scoreElement && scoreElement.textContent) {
            let score = Number(scoreElement.textContent)
            score = score + 1
            scoreElement.textContent = score
        }
});


