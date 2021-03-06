const characters = [
    {
        name: 'Anna',
        path: 'img/Anna.png'
    },
    {
        name: 'Campanilla',
        path: 'img/Campanilla.png'
    },
    {
        name: 'Cenicienta',
        path: 'img/Cenicienta.png'
    },
    {
        name: 'Elsa',
        path: 'img/Elsa.png'
    },
    {
        name: 'Flynn',
        path: 'img/Flynn.png'
    },
    {
        name: 'Genio',
        path: 'img/Genio.png'
    },
    {
        name: 'HadaMadrina',
        path: 'img/HadaMadrina.png'
    },
    {
        name: 'Kaa',
        path: 'img/Kaa.png'
    },
    {
        name: 'Mushu',
        path: 'img/Mushu.png'
    },
    {
        name: 'Pascal',
        path: 'img/Pascal.png'
    },
    {
        name: 'Pepito',
        path: 'img/Pepito.png'
    },
    {
        name: 'Primavera',
        path: 'img/Primavera.png'
    },
    {
        name: 'Rapunzel',
        path: 'img/Rapunzel.png'
    },
]

const start = document.querySelector('.start');
const game = document.querySelector('.game');
const board = document.querySelector('.board');
const charactersCompletedDiv = document.querySelector('.characters-completed');
const gameOver = document.querySelector('.game-over');
const winner = document.querySelector('.winner');
const successCharacters = document.getElementById('success-characters');
const pendingCharacters = document.getElementById('pending-characters');
const clock = document.getElementById('clock');

const bounceSound = document.getElementById('bounce');
const clicSound = document.getElementById('clic');
const songSound = document.getElementById('song');
const failSound = document.getElementById('fail');
const winnerSound = document.getElementById('winner');

let firstSelectedElement = null;
let secondSelectedElement = null;
let counter = 0;
let gameTimeSeconds = 0;

let successCharactersNumber = 0;
let charactersCompleted = [];
let isWinner = false;
successCharacters.innerHTML = successCharactersNumber;
pendingCharacters.innerHTML = characters.length - successCharactersNumber;

function startGame() {

    firstSelectedElement = null;
    secondSelectedElement = null;
    counter = 0;
    gameTimeSeconds = 120;
    successCharactersNumber = 0;
    charactersCompleted = [];
    charactersCompletedDiv.innerHTML = '';
    isWinner = false;
    successCharacters.innerHTML = successCharactersNumber;
    pendingCharacters.innerHTML = characters.length - successCharactersNumber;
    start.style.display = 'none';
    game.style.display = 'flex';
    gameOver.style.display = 'none';
    setTimeout(() => game.classList.add('show'), 100);

    songSound.currentTime = 0;
    songSound.volume = 0.5;
    songSound.play();

    const repeatCharacters = characters.concat(characters)
                                       .sort(() => 0.5 - Math.random());

    const oldCards = document.querySelectorAll('.card');
    if(oldCards.length > 0) {
        board.innerHTML = '';
    }

    repeatCharacters.forEach(elem => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = elem.name;

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${elem.path})`

        card.appendChild(front);
        card.appendChild(back);
        board.appendChild(card);
    })
    playGame();
    startTimer();
}

function startTimer() {
    const s = parseInt(gameTimeSeconds % 60);
    const m = parseInt(gameTimeSeconds / 60);
    const ss = ('0' + s).slice(-2);
    const mm = ('0' + m).slice(-2);

    clock.innerHTML = mm + ':' + ss;

    if (gameTimeSeconds > 0) {
        let timer = setTimeout(() => {
            startTimer();
        }, 1000)
    } else if (isWinner) {
        game.style.display = 'none';
        winner.style.display = 'flex';
        songSound.pause();
        winnerSound.play();
    } else {
        game.style.display = 'none';
        gameOver.style.display = 'flex';
        songSound.pause();
        failSound.play();
    }

    gameTimeSeconds--;
}

function playGame() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(elem => {
        elem.addEventListener('click', (event) => {
            bounceSound.currentTime = 0;
            clicSound.currentTime = 0;
            if(counter === 1 && elem === firstSelectedElement) {
                return;
            }
            elem.classList.toggle('selected');
            if (firstSelectedElement === null) {
                bounceSound.play();
                firstSelectedElement = elem;
                counter = 1;
                setTimeout(() => {
                    elem.classList.toggle('selected');
                }, 1000)
            } else {
                secondSelectedElement = elem;
                // counter = 2;
                if(firstSelectedElement.dataset.name === 
                   secondSelectedElement.dataset.name) {
                    clicSound.play();
                    firstSelectedElement.classList.add('succesfull');
                    secondSelectedElement.classList.add('succesfull');
                    successCharactersNumber++;
                    addCharacterCompleted(secondSelectedElement.dataset.name);
                    console.log(charactersCompleted);
                    successCharacters.innerHTML = successCharactersNumber;
                    pendingCharacters.innerHTML = characters.length - successCharactersNumber;
                } else {
                    bounceSound.play();
                }
                setTimeout(() => {
                    elem.classList.toggle('selected');
                }, 1000)
                firstSelectedElement = null;
                secondSelectedElement = null;
                counter = 0;
            }
            checkWinner();
        })
    })
    
}

function addCharacterCompleted(characterName) {
    characters.forEach(elem => {
        if(elem.name === characterName) {
            charactersCompleted.push(elem);
        }
    })
    charactersCompletedDiv.innerHTML = '';
    charactersCompleted.forEach(elem => {
        const characterDiv = document.createElement('div');
        const characterParagraph = document.createElement('p');
        const characterPic = document.createElement('img');
        characterParagraph.innerHTML = elem.name;
        characterPic.src = elem.path;
        characterDiv.appendChild(characterPic);
        characterDiv.appendChild(characterParagraph);
        charactersCompletedDiv.appendChild(characterDiv);
    })
}


function checkWinner() {
    if (successCharactersNumber === characters.length) {
        isWinner = true;
        gameTimeSeconds = 0;
    } 
}

