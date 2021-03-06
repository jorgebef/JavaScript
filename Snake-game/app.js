document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('.score span');
    const startBtn = document.querySelector('.start');
  
    let currentIndex = 0; //so first div in our grid
    let appleIndex = 0; //so first div in our grid
    let currentSnake = [2,1,0]; // so the 3rd div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the body fro now on)
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0; // Maybe remove this line?
    let interval = 0;

    
    // Create the board
    const width = 10; // number of columns in the grid
    const height = 10;// number of columns in the grid
    for (let i = 0; i<(width*height); i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
    const squares = document.querySelectorAll('.grid div');

    
    // Function that starts and restarts the game
    function startGame() {
        currentSnake.forEach(snakeIndex => squares[snakeIndex].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        console.log(appleIndex);
        clearInterval(interval);
        scoreDisplay.innerText = 0; // Maybe works with score=0

        direction = 1;
        scoreDisplay.innerText = score; //maybe remove this line?
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(snakeIndex => squares[snakeIndex].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
        randomApple();
    }


    // Randomized apple generator
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random()*squares.length);
        } while(squares[appleIndex].classList.contains('snake'));
        squares[appleIndex].classList.add('apple');
    }
    
    function moveOutcomes() {
        // If we hit the walls or eat ourself we stop the game
        if (
            (currentSnake[0] - width < 0 && direction === -width) ||
            (currentSnake[0] + width > (height * width) && direction === width) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] % width === (width - 1) && direction === 1) ||
            (squares[currentSnake[0] + direction].classList.contains('snake'))
            ){
                clearInterval(interval);
                alert('YOU LOST!!!!');
            }
        
        // move the head 1 space
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        // If we eat an apple we make it go a bit faster and we grow it
        if (squares[currentSnake[0]].classList.contains('apple')) {
            currentSnake.unshift(currentSnake[0]);
            squares[appleIndex].classList.remove('apple');
            currentSnake.forEach(snakeIndex => squares[snakeIndex].classList.add('snake'));
            clearInterval(interval);
            intervalTime *= 0.8;
            score++;
            scoreDisplay.innerText = score;
            interval = setInterval(moveOutcomes, intervalTime);
            randomApple();
        }
        currentSnake.forEach(snakeIndex => squares[snakeIndex].classList.add('snake'));
    }
    

    function keypadControl(e) {
        if ((e.keyCode === 39) && (currentSnake[1] != currentSnake[0]+1)) {
            // press right arrow and it's not coming from the right, add 1 to the position
            direction = 1;
        }
        else if ((e.keyCode === 37) && (currentSnake[1] != currentSnake[0]-1)) {
            // press left arrow and it's not coming from the right, add 1 to the position
            direction = -1;
        }
        else if ((e.keyCode === 40) && (currentSnake[1] != currentSnake[0]+width)) {
            // press down arrow and it's not coming from the top, add 1 to the position
            direction = width;
        }
        else if ((e.keyCode === 38) && (currentSnake[1] != currentSnake[0]-width)) {
            // press up arrow and it's not coming from the bottom, add 1 to the position
            direction = -width;
        }
    }


    // Button implementation of the movement control
    document.querySelectorAll('.controller button').forEach(button => {
        button.addEventListener('click touchstart', buttonControl);
    })
    function buttonControl() {
        if ((this.classList.contains('right')) && (currentSnake[1] != currentSnake[0]+1)) {
            direction = 1;
        }
        else if ((this.classList.contains('left')) && (currentSnake[1] != currentSnake[0]-1)) {
            // press left arrow and it's not coming from the right, add 1 to the position
            direction = -1;
        }
        else if ((this.classList.contains('down')) && (currentSnake[1] != currentSnake[0]+width)) {
            // press down arrow and it's not coming from the top, add 1 to the position
            direction = width;
        }
        else if ((this.classList.contains('up')) && (currentSnake[1] != currentSnake[0]-width)) {
            // press up arrow and it's not coming from the bottom, add 1 to the position
            direction = -width;
        }
    }

       
    document.addEventListener('keyup', keypadControl);

    startBtn.addEventListener('click', startGame);

})