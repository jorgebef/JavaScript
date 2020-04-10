// window.onload = () => { /* ES6 shortened version of "window.onload=function(){" */
//     createBoard();
// }    

// Upon DOM Content Loaded we will execute the code
document.addEventListener('DOMContentLoaded', () => {
    createBoard()

})

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
]

// Create game board


// Create the board
function createBoard() {
    
    const grid = document.querySelector('.grid')

    for (var [i, card] of cardArray.entries()) {
        var cardOnBoard = document.createElement('img')
        cardOnBoard.setAttribute('src', 'images/blank.png')
        cardOnBoard.setAttribute('data-id', i)
        // cardOnBoard.addEventListener('click', flipCard)
        grid.appendChild(cardOnBoard)
    }
}

function flipCard() {
    var cardId = this.getAttribute
}