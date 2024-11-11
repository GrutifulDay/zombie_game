// SKORE uzivatele 
let shotImage = document.getElementById("shotImage");

    shotImage.addEventListener("click", function () {
        
        let scoreElement = this.nextElementSibling
            
        
        if (scoreElement && scoreElement.textContent) {
            let score = Number(scoreElement.textContent)
            score = score + 1
            scoreElement.textContent = score
        }
});

const images = [
    'image/obrazekhlavy.jpeg'
]

function displayRandomImage() {
    
    const randomImage = images[Math.floor(Math.random() * images.length)]

    const imgElement = document.createElement('img')
          imgElement.src = randomImage

    const randomX = Math.random() * window.innerWidth
    const randomY = Math.random() * window.innerHeight

    imgElement.style.left = randomX + 'px';
    imgElement.style.top = randomY + 'px';

    document.body.appendChild(imgElement);

    setInterval(displayRandomImage, 2000);
}

