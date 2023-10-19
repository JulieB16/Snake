
const gameBoard = document.querySelector("#gameBoard");
const snakePlayer = document.querySelector("#snakePlayer");
const playBtn = document.querySelector("#playBtn");
const apple = document.querySelector("#apple");
const startScreen = document.querySelector("#startScreen");


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

//variables

let gridBoxes;
let calculatedIndexApple = applePos.row * 15 + applePos.col;
let calculatedIndexSnake = snake.row * 15 + snake.col;
//starting game

playBtn.addEventListener("click", function() {
    startScreen.style.display = "none";
    startGame();
})

function startGame(){

    gameBoard.textContent = " ";

    for (let boxes = 0; boxes < 225; boxes++){
        let gridBox = document.createElement("div")
        gridBox.classList.add("gridBox");
        gameBoard.appendChild(gridBox);
    }
    
    const gridBoxes = gameBoard.querySelectorAll(".gridBox");
    
    snake = {
        row: 7,
        col: 5,
        rotation: "right",
        score: 0
    }

    applePos = {
        row: 7,
        col: 9,
    }

    setApplePos(gridBoxes);
    setSnakePos(gridBoxes)

    mainGameLoop(gridBoxes)

};


//movement

function setSnakePos(gridBoxes) {
    let calculatedIndexSnake = snake.row * 15 + snake.col;
    gridBoxes[calculatedIndexSnake].classList.add("snakeShow");
}

function changeDirection(newDirection) {
    snake.rotation = newDirection;
}

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight" && snake.rotation !== "left") {
        changeDirection("right");
    } else if (e.key === "ArrowLeft" && snake.rotation !== "right") {
        changeDirection("left");
    } else if (e.key === "ArrowUp" && snake.rotation !== "down") {
        changeDirection("up");
    } else if (e.key === "ArrowDown" && snake.rotation !== "up") {
        changeDirection("down");
    }
});

function movement(gridBoxes) {
    clearMovement(gridBoxes)

    let newRow = snake.row;
    let newCol = snake.col;

    if (snake.rotation === "right"){
        newCol += 1
    } else if (snake.rotation === "left"){
        newCol -= 1
    } else if (snake.rotation === "up") {
        newRow -= 1
    } else if (snake.rotation === "down") {
        newRow += 1
    }

    let snakeTotalLoc = snake.row * 15 + snake.col;
    let appleTotalLoc = applePos.row * 15 + applePos.col;
    

    if (appleTotalLoc === snakeTotalLoc) {
        getAppleCoordinates(gridBoxes)
    }

    if (newCol < 0 || newCol > 14 ||
        newRow > 14 || newRow < 0) {
        endGame(gridBoxes)
    } else {
        snake.row = newRow
        snake.col = newCol
        setSnakePos(gridBoxes)
    }
}

function clearMovement(gridBoxes){
    calculatedIndexSnake = snake.row * 15 + snake.col;
    let oldCalculatedIndexSnake = calculatedIndexSnake
    gridBoxes[oldCalculatedIndexSnake].classList.remove("snakeShow")
}

//apple function


function setApplePos(gridBoxes) {
    let calculatedIndexApple = applePos.row * 15 + applePos.col;
    gridBoxes[calculatedIndexApple].classList.add("appleShow");
}

function getAppleCoordinates(gridBoxes){

    let newAppleRow, newAppleCol;
    do {

        snake.score += 1

        let calculatedIndexApple = applePos.row * 15 + applePos.col;
        gridBoxes[calculatedIndexApple].classList.remove("appleShow");

        applePos.col = Math.floor(Math.random() * 15);
        applePos.row = Math.floor(Math.random() * 15);

        calculatedIndexApple = applePos.row * 15 + applePos.col;
        gridBoxes[calculatedIndexApple].classList.add("appleShow");

        
    } while (snake.row === newAppleRow && snake.col === newAppleCol);
}

//game loop

function mainGameLoop(gridBoxes){
    movement(gridBoxes);

    gameInterval = setInterval(() => {
        movement(gridBoxes);
    }, 400);
}

function endGame(gridBoxes){
    clearMovement(gridBoxes)
    gameBoard.textContent = " ";
    startScreen.style.display = "flex";
    clearInterval(gameInterval)
}




