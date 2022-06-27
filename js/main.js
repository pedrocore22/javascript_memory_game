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

const game = document.querySelector('.game');
let firstSelectedElement = null;
let secondSelectedElement = null;
let counter = 0;

function createCards () {

    const repeatCharacters = characters.concat(characters)
                                       .sort(() => 0.5 - Math.random());

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
        game.appendChild(card);
    })
}

createCards();

const cards = document.querySelectorAll('.card');

cards.forEach(elem => {
    elem.addEventListener('click', (event) => {
        if(counter === 1 && elem === firstSelectedElement) {
            return;
        }
        elem.classList.toggle('selected');
        if (firstSelectedElement === null) {
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
                firstSelectedElement.classList.add('succesfull');
                secondSelectedElement.classList.add('succesfull');
            } else {
                console.log('son distintos');
            }
            setTimeout(() => {
                elem.classList.toggle('selected');
            }, 1000)
            firstSelectedElement = null;
            secondSelectedElement = null;
            counter = 0;
        }
        console.log(firstSelectedElement);
        console.log(secondSelectedElement);
    })
})
