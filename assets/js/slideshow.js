const optionsElement = document.getElementsByClassName("options")[0];

let i = 0;
let currentSlide = 0;

let slides = {
    begin: [
        ['Context: De werkweek begon voor Fred met een gezonde dosis motivatie. Als beveiligingsexpert bij het grote technologiebedrijf was hij vastbesloten om zijn collega\'s te beschermen tegen de toenemende dreiging van phishing-aanvallen. De berichten stroomden binnen, en Fred begon zijn taak met zorgvuldige aandacht.', 'assets/scenes/scene1.jpg'],
        ['Fred: "Deze phishing-pogingen lijken serieuzer te worden. Ik moet extra voorzichtig zijn.', 'assets/scenes/scene1.jpg'],
    ],
    eerste_dag_voorzichtig: [
        ['Fred: "Aan het einde van de dag keek hij tevreden naar zijn werk en sprak bemoedigend: "Ik heb vandaag goed werk verricht, laten we deze focus behouden."', 'assets/scenes/scene1.jpg'],
    ],
    eerste_dag_risico: [
        ['Fred: "Ach, het zal wel meevallen. Ik neem wel wat meer risico vandaag."', 'assets/scenes/scene1.jpg'],
    ],
    tweede_dag: [
        ['Context: De vermoeidheid van de eerste dag hing nog steeds in de lucht op de tweede dag, maar Fred hield zich vast aan zijn toewijding. De phishing-mails bleven binnenstromen, maar Fred was vastberaden om zijn alertheid te behouden.', 'assets/scenes/scene1.jpg'],
        ['Context: Halverwege de dag ontving hij een ogenschijnlijk onschuldige e-mail met een link naar een \'belangrijk document\'.', 'assets/scenes/scene2.jpg'],
    ],
    tweede_dag_voorzichtig: [
        ['Fred: "Hmm, laten we dit eens goed bekijken."', 'assets/scenes/scene1.jpg'],
    ],
    tweede_dag_risico: [
        ['Fred: "Ik ben te moe voor dit. Snel afhandelen en klaar."', 'assets/scenes/scene1.jpg'],
    ],
    einde_voorzichtig: [
        ['Context: Ondanks de vermoeidheid op de tweede dag blijft Fred alert en scherp. Hij herkent de poging tot phishing en rapporteert deze onmiddellijk aan de IT-afdeling.', 'assets/scenes/scene1.jpg'],
        ['Fred: "Deze poging tot phishing is sluw, maar ik ben er niet ingetrapt."', 'assets/scenes/scene1.jpg'],
        ['Context: Fred deelt zijn ervaring met zijn \'collega\'s\' (ook al is hij alleen) en moedigt hen aan om waakzaam te blijven.', 'assets/scenes/scene1.jpg'],
        ['Fred: "We moeten constant alert zijn. Samen kunnen we deze cyberdreigingen bestrijden."', 'assets/scenes/scene1.jpg'],
        ['Context: Aan het einde van de dag spreekt hij tevreden: "We hebben opnieuw bewezen dat waakzaamheid het verschil maakt. Laten we blijven leren en groeien, en zo onze organisatie blijven beschermen."', 'assets/scenes/scene1.jpg'],
    ],
    einde_risico: [
        ['Context: In zijn vermoeide toestand op de tweede dag merkt Fred de phishing-poging niet op. Hij klikt onbewust op de link en probeert in te loggen met zijn accountinformatie.', 'assets/scenes/scene1.jpg'],
        ['Fred: "Even doorklikken en dan kan ik eindelijk rusten."', 'assets/scenes/scene2.jpg'],
        ['Context: De hackers krijgen snel toegang tot zijn account, en de gevolgen zijn verstrekkend.', 'assets/scenes/scene3.jpg'],
        ['Fred: "Laat me gewoon mijn werk afmaken en dan kan ik eindelijk rusten."', 'assets/scenes/scene1.jpg'],
        ['Context: Persoonlijke informatie wordt gestolen en misbruikt voor duistere doeleinden. Het slechte einde is een feit, en de organisatie is kwetsbaar voor verdere aanvallen.', 'assets/scenes/scene3.jpg'],
    ],
};

let currentSlideArray = slides.begin;

function typeWriter() {
    const subtitleText = document.getElementById("subtitles-text");
    const subtitle = currentSlideArray[currentSlide] ? currentSlideArray[currentSlide][0] : 'Geen ondertiteling gevonden.';

    if (i < subtitle.length) {
        subtitleText.innerHTML += subtitle.charAt(i);
        i++;
        setTimeout(typeWriter, 10);
    }
}

function updateSlideNumber() {
    document.getElementById("slide").innerHTML = currentSlide + 1;
    if (currentSlideArray[currentSlide]) {
        document.getElementById("scene").src = currentSlideArray[currentSlide][1];
        document.getElementById("scene").alt = "Slide " + (currentSlide + 1);
    }
}

function navigateSlide(direction) {
    if (direction === 'previous' && currentSlide > 0) {
        currentSlide--;
    } else if (direction === 'next' && currentSlide < currentSlideArray.length - 1) {
        if (currentSlideArray === slides.eerste_dag_voorzichtig) {
            currentSlideArray = slides.tweede_dag;
        } else if (currentSlideArray === slides.eerste_dag_risico) {
            currentSlideArray = slides.einde_risico;
        } else if (currentSlideArray === slides.tweede_dag_voorzichtig) {
            currentSlideArray = slides.einde_voorzichtig;
        } else {
            currentSlide++;
        }
    }

    else if (direction === 'previous' && currentSlideArray === slides.begin && currentSlide === 0) {
        window.location.href = 'menu.html';
    }

    else if ((currentSlide === currentSlideArray.length - 1 && currentSlideArray[currentSlide][0] === slides.einde_risico[1][0]) || (currentSlideArray === slides.einde_risico && currentSlideArray[currentSlide][0] === slides.einde_voorzichtig[1][0])) {
        window.location.href = 'credits.html';
    }

    else if ((currentSlide === currentSlideArray.length - 1 && currentSlideArray[currentSlide][0] === slides.begin[1][0]) || (currentSlideArray === slides.begin && currentSlideArray[currentSlide][0] === slides.tweede_dag[1][0])) {
        optionsElement.style.display = "flex";
        if (direction === 'risico') {
            if (currentSlideArray === slides.begin) {
                optionsElement.style.display = "none";
                currentSlideArray = slides.eerste_dag_risico;
            } else if (currentSlideArray === slides.tweede_dag) {
                optionsElement.style.display = "none";
                currentSlideArray = slides.tweede_dag_risico;
            }
            currentSlide = 0;
        } else if (direction === 'voorzichtig') {
            if (currentSlideArray === slides.begin) {
                optionsElement.style.display = "none";
                currentSlideArray = slides.eerste_dag_voorzichtig;
            } else if (currentSlideArray === slides.tweede_dag) {
                optionsElement.style.display = "none";
                currentSlideArray = slides.tweede_dag_voorzichtig;
            }
            currentSlide = 0;
        }
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