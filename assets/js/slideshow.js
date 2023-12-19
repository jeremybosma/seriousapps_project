var i = 0;
var currentSlide = 0;
var subtitles = [
    'Subtitle for Slide 1',
    'Subtitle for Slide 2',
    'Subtitle for Slide 3',
    'Subtitle for Slide 4',
    'Subtitle for Slide 5',
    'Subtitle for Slide 6',
    'Subtitle for Slide 7',
    'Subtitle for Slide 8'
];
var scenes = [
    'assets/scenes/scene1.jpg',
    'assets/scenes/scene2.jpg',
    'assets/scenes/scene3.jpg',
    'assets/scenes/scene4.jpg',
    'assets/scenes/scene5.jpg',
    'assets/scenes/scene6.jpg',
    'assets/scenes/scene7.jpg',
    'assets/scenes/scene8.jpg'
]

function typeWriter() {
    if (i < subtitles[currentSlide].length) {
        document.getElementById("subtitles-text").innerHTML += subtitles[currentSlide].charAt(i);
        i++;
        setTimeout(typeWriter, 15);
    }
}

function updateSlideNumber() {
    document.getElementById("slide").innerHTML = currentSlide + 1;
    document.getElementById("scene").src = scenes[currentSlide];
    document.getElementById("scene").alt = "Slide " + currentSlide;
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        document.getElementById("subtitles-text").innerHTML = '';
        i = 0;
        typeWriter();
        updateSlideNumber();
    } else if (currentSlide < 1) {
        window.location.href = 'menu.html';
    }
}

function nextSlide() {
    if (currentSlide < subtitles.length - 1) {
        currentSlide++;
        document.getElementById("subtitles-text").innerHTML = '';
        i = 0;
        typeWriter();
        updateSlideNumber();
    } else {
        window.location.href = 'credits.html';
    }
}

typeWriter();
updateSlideNumber();

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
        previousSlide();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowRight' || event.code === 'ArrowUp') {
        nextSlide();
    }
});