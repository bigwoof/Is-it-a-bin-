const binImages = [
    'bins/image1.jpg',
    'bins/image2.jpg',
    'bins/image3.jpg'
];

const notBinImages = [
    'not_bins/image1.jpg',
    'not_bins/image2.jpg',
    'not_bins/image3.jpg'
];

let score = 0;

const imageElement = document.getElementById('image');
const scoreElement = document.getElementById('score');
const swipeLeftButton = document.getElementById('swipe-left');
const swipeRightButton = document.getElementById('swipe-right');

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

function swipeLeft() {
    if (imageElement.dataset.isBin === 'false') {
        score++;
    } else {
        score -= 2;
    }
    loadImage();
    updateScore();
}

function swipeRight() {
    if (imageElement.dataset.isBin === 'true') {
        score++;
    } else {
        score -= 2;
    }
    loadImage();
    updateScore();
}

swipeLeftButton.addEventListener('click', swipeLeft);
swipeRightButton.addEventListener('click', swipeRight);

loadImage();
updateScore();