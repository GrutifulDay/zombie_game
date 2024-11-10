// let shotImage = document.getElementById("shotImage")

// shotImage.addEventListener("click", function () {
    
//     let scoreElement = this.nextElementSibling
//         score = Number(scoreElement.textContent)

//     score = score + 1
//     scoreElement.textContent = score

    
// })

// pridani fce skore po kliknuti 
let shotImage = document.getElementById("shotImage");

    shotImage.addEventListener("click", function () {
        
        let scoreElement = this.nextElementSibling
            
        
        if (scoreElement && scoreElement.textContent) {
            let score = Number(scoreElement.textContent)
            score = score + 1
            scoreElement.textContent = score
        }
    });