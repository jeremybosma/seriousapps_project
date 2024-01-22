var i = 0;
var currentSlide = 0;

var slides = [
    ['Subtitle for Slide 1', 'assets/scenes/scene1.jpg'],
    ['Subtitle for Slide 2', 'assets/scenes/scene2.jpg'],
    ['Subtitle for Slide 3', 'assets/scenes/scene3.jpg'],
    ['Subtitle for Slide 4', 'assets/scenes/scene4.jpg'],
    ['Subtitle for Slide 5', 'assets/scenes/scene5.jpg'],
    ['Subtitle for Slide 6', 'assets/scenes/scene6.jpg'],
    ['Subtitle for Slide 7', 'assets/scenes/scene7.jpg'],
    ['Subtitle for Slide 8', 'assets/scenes/scene8.jpg']
];

function typeWriter() {
    const subtitleText = document.getElementById("subtitles-text");
    const subtitle = slides[currentSlide][0];

    if (i < subtitle.length) {
        subtitleText.innerHTML += subtitle.charAt(i);
        i++;
        setTimeout(typeWriter, 15);
    }
}

function updateSlideNumber() {
    document.getElementById("slide").innerHTML = currentSlide + 1;
    document.getElementById("scene").src = slides[currentSlide][1];
    document.getElementById("scene").alt = "Slide " + (currentSlide + 1);
}

function navigateSlide(direction) {
    if (direction === 'previous' && currentSlide > 0) {
        currentSlide--;
    } else if (direction === 'next' && currentSlide < slides.length - 1) {
        currentSlide++;
    } else if (direction === 'previous' && currentSlide === 0) {
        window.location.href = 'menu.html';
    } else if (currentSlide === slides.length - 1) {
        window.location.href = 'credits.html';
    }

    document.getElementById("subtitles-text").innerHTML = '';
    i = 0;
    typeWriter();
    updateSlideNumber();
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
        navigateSlide('previous');
    } else if (event.code === 'ArrowRight' || event.code === 'ArrowUp') {
        navigateSlide('next');
    }
});

typeWriter();
updateSlideNumber();