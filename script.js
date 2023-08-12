
const gameBoard = document.querySelector("#gameBoard");
const snakePlayer = document.querySelector("#snakePlayer");
const playBtn = document.querySelector("#playBtn");
const apple = document.querySelector("#apple");

//snake and apple objects

let snake = {
    row: 7,
    col: 5,
    rotation: "right",
    score: 0
}

let applePos = {
    row: 7,
    col: 9,
}


//Setting up the starting point

document.addEventListener("DOMContentLoaded", function () {

    for (let boxes = 2; boxes < 225; boxes++){
        let gridBox = document.createElement("div")
        gridBox.classList.add("gridBox");
        gameBoard.appendChild(gridBox);
    }

    const gridBoxes = gameBoard.querySelectorAll(".gridBox");

    function setInitialSnakePos() {
        snakePlayer.classList.remove("snakeShow");
        const calculatedIndexSnake = snake.row * 15 + snake.col;
        gridBoxes[calculatedIndexSnake].classList.add("snakeShow");
    }
    
    function setInitialApplePos() {
        apple.classList.remove("appleShow");
        const calculatedIndexApple = applePos.row * 15 + applePos.col;
        gridBoxes[calculatedIndexApple].classList.add("appleShow");
    }

    setInitialApplePos();
    setInitialSnakePos();

});


