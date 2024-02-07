const optionsElement = document.querySelector(".options");
const naamText = document.getElementById("subtitles-naam");
const subtitleText = document.getElementById("subtitles-text");
const slideNumberElement = document.getElementById("slide");
const sceneElement = document.getElementById("scene");

let i = 0;
let currentSlide = 0;

freezeEvents = false;

const slides = {
    begin: [
        ['De werkweek begon voor Fred met een gezonde dosis motivatie. Als beveiligingsexpert bij het grote technologiebedrijf was hij vastbesloten om zijn collega\'s te beschermen tegen de toenemende dreiging van phishing-aanvallen. De berichten stroomden binnen, en Fred begon zijn taak met zorgvuldige aandacht.', 'assets/scenes/scene1.png', 'Context'],
        ['"Deze phishing-pogingen lijken serieuzer te worden. Ik moet extra voorzichtig zijn.', 'assets/scenes/scene1.png', 'Fred'],
    ],
    eerste_dag_voorzichtig: [
        ['"Aan het einde van de dag keek hij tevreden naar zijn werk en sprak bemoedigend: "Ik heb vandaag goed werk verricht, laten we deze focus behouden."', 'assets/scenes/scene1.png', 'Fred'],
        ['De vermoeidheid van de eerste dag hing nog steeds in de lucht op de tweede dag, maar Fred hield zich vast aan zijn toewijding. De phishing-mails bleven binnenstromen, maar Fred was vastberaden om zijn alertheid te behouden.', 'assets/scenes/scene1.png', 'Context'],
        ['Halverwege de dag ontving hij een ogenschijnlijk onschuldige e-mail met een link naar een \'belangrijk document\'.', 'assets/scenes/scene2.png', 'Context'],
    ],
    eerste_dag_risico: [
        ['"Ach, het zal wel meevallen. Ik neem wel wat meer risico vandaag."', 'assets/scenes/scene1.png', 'Fred'],
        ['In zijn vermoeide toestand op de tweede dag merkt Fred de phishing-poging niet op. Hij klikt onbewust op de link en probeert in te loggen met zijn accountinformatie.', 'assets/scenes/scene2.png', 'Context'],
        ['"Even doorklikken en dan kan ik eindelijk rusten."', 'assets/scenes/scene2.png', 'Fred'],
        ['De hackers krijgen snel toegang tot zijn account, en de gevolgen zijn verstrekkend.', 'assets/scenes/scene1.png', 'Context'],
        ['Persoonlijke informatie wordt gestolen en misbruikt voor duistere doeleinden. Het slechte einde is een feit, en de organisatie is kwetsbaar voor verdere aanvallen.', 'assets/scenes/scene3.png', 'Context'],
    ],
    tweede_dag_voorzichtig: [
        ['"Hmm, laten we dit eens goed bekijken."', 'assets/scenes/scene2.png', 'Fred'],
        ['Ondanks de vermoeidheid op de tweede dag blijft Fred alert en scherp. Hij herkent de poging tot phishing en rapporteert deze onmiddellijk aan de IT-afdeling.', 'assets/scenes/scene1.png', 'Context'],
        ['"Deze poging tot phishing is sluw, maar ik ben er niet ingetrapt."', 'assets/scenes/scene1.png', 'Fred'],
        ['Fred deelt zijn ervaring met zijn \'collega\'s\' (ook al is hij alleen) en moedigt hen aan om waakzaam te blijven.', 'assets/scenes/scene1.png', 'Context'],
        ['"We moeten constant alert zijn. Samen kunnen we deze cyberdreigingen bestrijden."', 'assets/scenes/scene1.png', 'Fred'],
        ['Aan het einde van de dag spreekt hij tevreden: "We hebben opnieuw bewezen dat waakzaamheid het verschil maakt. Laten we blijven leren en groeien, en zo onze organisatie blijven beschermen."', 'assets/scenes/scene1.png', 'Context'],
    ],
    tweede_dag_risico: [
        ['"Ik ben te moe voor dit. Snel afhandelen en klaar."', 'assets/scenes/scene3.png', 'Fred'],
        ['In zijn vermoeide toestand op de tweede dag merkt Fred de phishing-poging niet op. Hij klikt onbewust op de link en probeert in te loggen met zijn accountinformatie.', 'assets/scenes/scene3.png', 'Context'],
        ['"Even doorklikken en dan kan ik eindelijk rusten."', 'assets/scenes/scene3.png', 'Fred'],
        ['De hackers krijgen snel toegang tot zijn account, en de gevolgen zijn verstrekkend.', 'assets/scenes/scene3.png', 'Context'],
        ['Persoonlijke informatie wordt gestolen en misbruikt voor duistere doeleinden. Het slechte einde is een feit, en de organisatie is kwetsbaar voor verdere aanvallen.', 'assets/scenes/scene3.png', 'Context'],
    ]
};

let currentSlideArray = slides.begin;

function typeWriter() {
    const [subtitle, , naam] = currentSlideArray[currentSlide] || ['', '', ''];

    naamText.innerHTML = naam || '';

    freezeEvents = true;

    if (i < subtitle.length) {
        subtitleText.innerHTML += subtitle.charAt(i);
        i++;
        setTimeout(typeWriter, 10);
    } else {
        freezeEvents = false;
    }
}

function updateSlideNumber() {
    slideNumberElement.innerHTML = currentSlide + 1;
    const [_, image] = currentSlideArray[currentSlide] || ['', ''];
    sceneElement.src = image;
    sceneElement.alt = "Slide " + (currentSlide + 1);
}

function navigateSlide(direction) {
    if (direction === 'previous' && currentSlide > 0) {
        currentSlide--;
    } else if (direction === 'previous' && currentSlideArray === slides.begin && currentSlide === 0) {
        window.location.href = 'menu.html';
    }

    if (direction === 'next' && currentSlide < currentSlideArray.length - 1) {
        currentSlide++;
    }
    else if ((currentSlideArray === slides.tweede_dag_voorzichtig || currentSlideArray === slides.tweede_dag_risico || currentSlideArray === slides.eerste_dag_risico) && currentSlide === currentSlideArray.length - 1) {
        window.location.href = 'credits.html';
    }

    else if (currentSlideArray === slides.begin && currentSlide === currentSlideArray.length - 1) {
        optionsElement.style.display = "flex";
        freezeEvents = true;

        if (direction === 'risico') {
            if (currentSlideArray === slides.begin) {
                optionsElement.style.display = "none";
                freezeEvents = false;
                currentSlideArray = slides.eerste_dag_risico;
            }
            else if (currentSlideArray === slides.tweede_dag) {
                optionsElement.style.display = "none";
                freezeEvents = false;
                currentSlideArray = slides.tweede_dag_risico;
            }
            currentSlide = 0;
        } else if (direction === 'voorzichtig') {
            if (currentSlideArray === slides.begin) {
                optionsElement.style.display = "none";
                freezeEvents = false;
                currentSlideArray = slides.eerste_dag_voorzichtig;
            }
            else if (currentSlideArray === slides.tweede_dag) {
                optionsElement.style.display = "none";
                freezeEvents = false;
                currentSlideArray = slides.tweede_dag_voorzichtig;
            }
            currentSlide = 0;
        }
    } else if (currentSlideArray === slides.eerste_dag_voorzichtig && currentSlide === currentSlideArray.length - 1) {
        optionsElement.style.display = "flex";
        freezeEvents = true;

        if (direction === 'voorzichtig') {
            optionsElement.style.display = "none";
            freezeEvents = false;
            currentSlideArray = slides.tweede_dag_voorzichtig;
            currentSlide = 0;
            typeWriter();
            updateSlideNumber();
        } else if (direction === 'risico') {
            optionsElement.style.display = "none";
            freezeEvents = false;
            currentSlideArray = slides.tweede_dag_risico;
            currentSlide = 0;
            typeWriter();
            updateSlideNumber();
        }
    }

    subtitleText.innerHTML = '';
    i = 0;
    typeWriter();
    updateSlideNumber();
}

document.addEventListener('keydown', function (event) {
    if (freezeEvents) {
        return;
    } else if (event.code === 'ArrowLeft' || event.code === 'ArrowDown') {
        navigateSlide('previous');
    } else if (event.code === 'ArrowRight' || event.code === 'ArrowUp' || event.code === 'Space') {
        navigateSlide('next');
    }
});

typeWriter();
updateSlideNumber();