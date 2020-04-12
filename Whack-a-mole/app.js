const squares = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');

let result = 0;

/*
I have chosen to use functions for this solution, one for each of the
operations that must be done in order to make the game work:
- Provide a random square to locate our mole
- Once the mole has been Whacked and collecting the data
- Countdown from Y seconds in order to keep it interesting

There are many other possible solutions, one of which would be using
forEach loops in order to setup the correct funtions for the squares
and so on and using less functions, however, I believe these 3 functions
plus the timers set up the code extremely well and make it very readable.
*/

function randomSquareSelector() {
    // Remove class "mole" from the board
    squares.forEach(square => {
        square.classList.remove('mole');
        square.removeEventListener('click', whackTheMole);
    })
    // Obtain random number and put the "mole" class in the random square
    const moleSquare = squares[Math.floor(Math.random()*9)];
    moleSquare.classList.add('mole');
    moleSquare.addEventListener('click', whackTheMole);
}

function whackTheMole() {
    score.textContent = ++result;
    this.classList.remove('mole');
    this.removeEventListener('click', whackTheMole);
}

function countDown() {
    let timer = timeLeft.textContent;
    timeLeft.textContent = --timer;
    if (timer === 0) {
        clearInterval(timerId);
        clearInterval(countDownTimer);
        alert('GAME OVER!!!!');
    }
}

var timerId = setInterval(randomSquareSelector ,1000);

let countDownTimer = setInterval(countDown, 1000);




// function randomSquareSelector() {

//     squares.forEach(square => {
//         square.classList.remove('mole');
//     })

//     let randomSquare = squares[Math.floor(Math.random()*9)];
//     randomSquare.classList.add('mole');

//     let hitPosition = randomSquare.id;
// }


// squares.forEach(square => {
//     square.addEventListener('mouseup', () => {
//         if (square.id === hitPosition) {
//             score.textContent = result++;
//         }
//     })
// })
