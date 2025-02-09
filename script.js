const binImages = [];
const notBinImages = [];

function fetchImagesFromFolder(folderPath, imageArray) {
    fetch(folderPath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(data, "text/html");
            const imageTags = htmlDocument.getElementsByTagName("a");

            for (let i = 0; i < imageTags.length; i++) {
                const href = imageTags[i].getAttribute("href");
                if (href.endsWith(".jpg") || href.endsWith(".png")) {
                    imageArray.push(`${folderPath}/${href}`);
                }
            }
        });
}

fetchImagesFromFolder('bins', binImages);
fetchImagesFromFolder('not_bins', notBinImages);

let score = 0;

const imageElement = document.getElementById('image');
const scoreElement = document.getElementById('score');
const swipeLeftButton = document.getElementById('swipe-left');
const swipeRightButton = document.getElementById('swipe-right');
const resetButton = document.getElementById('reset');

function getRandomImage() {
    const isBin = Math.random() < 0.5;
    const images = isBin ? binImages : notBinImages;
    const randomIndex = Math.floor(Math.random() * images.length);
    return { src: images[randomIndex], isBin };
}

function loadImage() {
    const randomImage = getRandomImage();
    imageElement.src = randomImage.src;
    imageElement.dataset.isBin = randomImage.isBin;
}

function updateScore() {
    scoreElement.textContent = score;
}

function endGame() {
    imageElement.src = 'winning.png';
    document.querySelector('.buttons').style.display = 'none';
    document.querySelector('.score').innerHTML = "Well done you know what a bin is! Please use this knowledge wisely";
}

function swipeLeft() {
    if (imageElement.dataset.isBin === 'false') {
        score++;
    } else {
        score -= 2;
    }
    if (score >= 10) {
        endGame();
    } else {
        loadImage();
        updateScore();
    }
}

function swipeRight() {
    if (imageElement.dataset.isBin === 'true') {
        score++;
    } else {
        score -= 2;
    }
    if (score >= 10) {
        endGame();
    } else {
        loadImage();
        updateScore();
    }
}

function resetGame() {
    score = 0;
    updateScore();
    loadImage();
    document.querySelector('.buttons').style.display = 'block';
    document.querySelector('.score').innerHTML = 'Score: <span id="score">0</span>';
}

swipeLeftButton.addEventListener('click', swipeLeft);
swipeRightButton.addEventListener('click', swipeRight);
resetButton.addEventListener('click', resetGame);

loadImage();
updateScore();