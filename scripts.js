document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const message = document.querySelector('#message');

    const scoreBoard = document.querySelector('#score');
    const startBtn = document.querySelector('.start-Btn');
    const gridCells = document.querySelectorAll('.grid div');

    var applePosition = 0;
    var currentPosition = 0;
    var currentSnake = [3, 2, 1]; //2 is the Head , 1 is the Body and 0 will be its tail

    const width = 10;
    var score = 0;
    var direction = 1;
    var speed = 0.9;
    var interval = 0;
    var intervalTime = 0;
    var initial = true;

    //This method handles the snake movement 
    document.addEventListener('keyup', moveSnake);

    function moveSnake(event) {

        if (event.keyCode === 38) {
            //Arrow up Key is pressed. So, the snake is moving up by 10 indices.
            direction = -width;

        } else if (event.keyCode === 40) {
            //Arrow down Key is pressed. So, the snake is moving down by 10 indices.
            direction = width;

        } else if (event.keyCode === 39) {
            //Arrow Right Key is pressed. So, the snake is moving right by 1 index.
            direction = 1;

        } else if (event.keyCode === 37) {
            //Arrow Left Key is pressed. So, the snake is moving left by 1 index.
            direction = -1;
        }
        snakeGame();
    }


    //This method creates random apple in the game board. The Apple should not appear on the snake.
    function displayApple() {

        //The Apple should not appear on the snake. So, the doWhile loop iterates until they appear different.
        do {
            applePosition = Math.floor(Math.random() * gridCells.length);
        } while (gridCells[applePosition].classList.contains('snake'));

        gridCells[applePosition].classList.add('apple');
    }


    //This method initialises and starts the Game
    startBtn.addEventListener('click', startGame);

    function startGame() {
        score = 0;
        scoreBoard.textContent = score;
        message.textContent = "";

        gridCells[applePosition].classList.remove('apple');
        currentSnake.forEach(index => gridCells[index].classList.remove('snake'));

        direction = 0;
        currentPosition = 0;
        currentSnake = [2, 1, 0];
        currentSnake.forEach(index => gridCells[index].classList.add('snake'));

        initial = true;
        intervalTime = 1000;
        interval = setInterval(snakeGame(), intervalTime);
        clearInterval(interval);

        displayApple();
    }


    //This method displays the Snake as it grows or hit on the wall
    function snakeGame() {
        let head = currentSnake[0];
        if (!initial) {

            //Check if the snake hits the wall by using its HEAD currentSnake[0] and its DIrection of movement
            if ((head % width === (width - 1)) && (direction === 1))
                return gameOver();
            else if ((head % width === 0) && (direction === -1))
                return gameOver();
            else if ((head - width < 0) && (direction === -width))
                return gameOver();
            else if ((head + width > (width * width)) && (direction === width))
                return gameOver();
            else if (gridCells[currentSnake[0] + direction].classList.contains('snake'))
                return gameOver();


            //Moving the snake : Delete the TAIL and add HEAD at the beginning
            let tail = currentSnake.pop();
            gridCells[tail].classList.remove('snake');
            currentSnake.unshift(currentSnake[0] + direction);
            gridCells[currentSnake[0]].classList.add('snake');

            //Eats Apple 
            if (gridCells[currentSnake[0]].classList.contains('apple')) {

                gridCells[currentSnake[0]].classList.remove('apple');
                gridCells[currentSnake[0]].classList.add('snake');
                gridCells[tail].classList.add('snake');
                currentSnake.push(tail);
                displayApple();

                score++;
                scoreBoard.textContent = score;

                clearInterval(interval);
                intervalTime = intervalTime * speed;
                interval = setInterval(snakeGame, intervalTime)
            }
        }
        initial = false;
    }


    //GAME OVER 
    function gameOver() {
        clearInterval(interval);
        message.textContent = "GAME OVER";
        gridCells[applePosition].classList.remove('apple');
        currentSnake.forEach(index => gridCells[index].classList.remove('snake'));
    }
});