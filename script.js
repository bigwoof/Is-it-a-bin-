const images = [
    { src: 'image1.jpg', isBin: true },
    { src: 'image2.jpg', isBin: false },
    { src: 'image3.jpg', isBin: true },
    { src: 'image4.jpg', isBin: false }
];

let currentImageIndex = 0;
let score = 0;

const imageElement = document.getElementById('image');
const scoreElement = document.getElementById('score');
const swipeLeftButton = document.getElementById('swipe-left');
const swipeRightButton = document.getElementById('swipe-right');

function loadImage() {
    imageElement.src = images[currentImageIndex].src;
}

function updateScore() {
    scoreElement.textContent = score;
}

function swipeLeft() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadImage();
}

function swipeRight() {
    if (images[currentImageIndex].isBin) {
        score++;
    }
    currentImageIndex = (currentImageIndex + 1) % images.length;
    loadImage();
    updateScore();
}

swipeLeftButton.addEventListener('click', swipeLeft);
swipeRightButton.addEventListener('click', swipeRight);

loadImage();
updateScore();