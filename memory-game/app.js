// window.onload = () => { /* ES6 shortened version of "window.onload=function(){" */
//     createBoard();
// }    

// Upon DOM Content Loaded we will execute the code
document.addEventListener('DOMContentLoaded', () => {


// card options
const cardArray = [
    {
        name: 'cat',
        img: 'images/cat.png'
    },
    {
        name: 'cat',
        img: 'images/cat.png'
    },
    {
        name: 'dog',
        img: 'images/dog.png'
    },
    {
        name: 'dog',
        img: 'images/dog.png'
    },
    {
        name: 'fish',
        img: 'images/fish.png'
    },
    {
        name: 'fish',
        img: 'images/fish.png'
    },
    {
        name: 'iguana',
        img: 'images/iguana.png'
    },
    {
        name: 'iguana',
        img: 'images/iguana.png'
    },
    {
        name: 'ladybug',
        img: 'images/ladybug.png'
    },
    {
        name: 'ladybug',
        img: 'images/ladybug.png'
    },
    {
        name: 'snail',
        img: 'images/snail.png'
    },
    {
        name: 'snail',
        img: 'images/snail.png'
    },
];

/*
Below is the explanation for the randomness:

The sort function checks for the first 2 values (index 0 and 1) and compares them,
if the result is positive, they stay in the same order, if it's negative they
switch order, then it proceeds with the following couple (index 1 and 2), etc...
How it works is that Math.random() provides a value between 0 and 1 (excluding 1)
so by having 0.5 - that random number (which is equally likely to be above or
under 0.5, we have the equal probability of it being sorted or not
*/
cardArray.sort(() => 0.5 - Math.random())
/*
The code above is the arrow function version of:
cardArray.sort(function (a, b) { return 0.5 - Math.random()})
*/

const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
var timeStart = '';
var timeEnd = '';
var cardsChosen = [];
var cardsChosenId = [];
var cardsWon = [];


// Create the board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        var card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        grid.appendChild(card);
        card.addEventListener('click', flipCard); // When you click, it calls the function flipCard
    }
}


function checkForMatch() {
    let cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1] && cardsChosenId[0] != cardsChosenId[1]) {
        // alert('You found a match!!!: ' + cardsChosen[0] + cardsWon.length)
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeAttribute('data-id');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].removeAttribute('data-id');
        cardsWon.push(cardsChosen);
        // Update the Scoreboard
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length == cardArray.length/2) {
            timeEnd = Date.now();
            let elapsedTime = timeEnd - timeStart;
            resultDisplay.textContent = ' Congratulations, it took you ******'+elapsedTime/1000+' seconds****** \r\nReload the page to play again!';
        }
    // If it's not a match, then set back to blank and try again!!!
    } else {
        // alert('No match, try again!!')
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    cardsChosen = [];
    cardsChosenId = [];
}



function flipCard() {
    if (!timeStart) {
        timeStart = Date.now();
    }
    
    let cardId = this.getAttribute('data-id'); // You get the data-id from the card you have clicked on
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}


createBoard();

})