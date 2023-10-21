
const gameBoard = document.querySelector("#gameBoard");
const playBtn = document.querySelector("#playBtn");
const scoreTxt = document.querySelector("#scoreTxt");
const startScreen = document.querySelector("#startScreen");


//snake and apple objects

let snake = {
    row: 7,
    col: 5,
    get head() {
        return this.row + this.col;
    },
    rotation: "right",
    score: 0,
    snakeBody: [],
}

let applePos = {
    row: 7,
    col: 9,
}

//variables

let gridBoxes;
let gridBoxAmount = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gridBoxAmount').trim())
let calculatedIndexApple = applePos.row * gridBoxAmount + applePos.col;
let calculatedIndexSnake = snake.row * gridBoxAmount + snake.col;

//starting game

playBtn.addEventListener("click", function() {
    startScreen.style.display = "none";
    startGame();
})

function startGame(){

    gameBoard.textContent = " ";

    let gridBoxTotal = gridBoxAmount * gridBoxAmount

    for (let boxes = 0; boxes < gridBoxTotal; boxes++){
        let gridBox = document.createElement("div")
        gridBox.classList.add("gridBox");
        gameBoard.appendChild(gridBox);
    }
    
    const gridBoxes = gameBoard.querySelectorAll(".gridBox");
    
    const snakeInitialRow = gridBoxAmount / 2 - 1
    const snakeInitialCol = gridBoxAmount / 2 - 2

    const appleInitialRow = snakeInitialRow
    const appleInitialCol = gridBoxAmount / 2 + 2

    snake = {
        row: snakeInitialRow,
        col: snakeInitialCol,
        get head() {
            return this.row + this.col;
        },
        rotation: "right",
        score: 0,
        snakeBody: [],
    }

    applePos = {
        row: appleInitialRow,
        col: appleInitialCol,
    }

    setApplePos(gridBoxes);
    setSnakePos(gridBoxes)

    mainGameLoop(gridBoxes)

};


//movement

function setSnakePos(gridBoxes) {
    let calculatedIndexSnake = snake.row * gridBoxAmount + snake.col;
    gridBoxes[calculatedIndexSnake].classList.add("snakeShow");
    
    for (let i = 0; i < snake.snakeBody.length; i++) {
        const segment = snake.snakeBody[i];
        const segmentIndex = segment.row * gridBoxAmount + segment.col;
        gridBoxes[segmentIndex].classList.add("snakeShow");
    }
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
        e.preventDefault()
        changeDirection("up");
    } else if (e.key === "ArrowDown" && snake.rotation !== "up") {
        e.preventDefault()
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

    let snakeTotalLoc = snake.row * gridBoxAmount + snake.col;
    let appleTotalLoc = applePos.row * gridBoxAmount + applePos.col;

    if (appleTotalLoc === snakeTotalLoc) {
        snake.score += 1;
        scoreTxt.textContent = `Score: ${snake.score}`;

        getAppleCoordinates(gridBoxes);

        snake.snakeBody.push({ row: snake.row, col: snake.col });

        setSnakePos(gridBoxes);
        
        if (newCol < 0 || newCol > gridBoxAmount - 1 || newRow > gridBoxAmount - 1 || newRow < 0) {
            endGame(gridBoxes);
        } else {
            updateSnakeBody(gridBoxes);
            snake.row = newRow;
            snake.col = newCol;
            setSnakePos(gridBoxes);
        }
    } else if (checkSelfCollision(gridBoxes)) {
    } else if (newCol < 0 || newCol > gridBoxAmount - 1 || newRow > gridBoxAmount - 1 || newRow < 0) {
        endGame(gridBoxes);
    } else {
        updateSnakeBody(gridBoxes);
        snake.row = newRow;
        snake.col = newCol;
        setSnakePos(gridBoxes);
    }
}

//check collision with self

function checkSelfCollision(gridBoxes) {
    if (snake.snakeBody.length > 1) {
        snake.snakeBody.forEach((segment) => {
            if (segment.col === snake.col && segment.row === snake.row) {
                endGame(gridBoxes)
            }
        });
    }
    return false
}

//apple function


function setApplePos(gridBoxes) {
    let calculatedIndexApple = applePos.row * gridBoxAmount + applePos.col;
    gridBoxes[calculatedIndexApple].classList.add("appleShow");
}

function getAppleCoordinates(gridBoxes){

    let newAppleRow, newAppleCol;

    let calculatedIndexApple = applePos.row * gridBoxAmount + applePos.col;
    gridBoxes[calculatedIndexApple].classList.remove("appleShow");

    do {
        newAppleCol = Math.floor(Math.random() * gridBoxAmount);
        newAppleRow = Math.floor(Math.random() * gridBoxAmount);
    } while (isAppleInSnake(newAppleRow, newAppleCol));

    applePos.col = newAppleCol;
    applePos.row = newAppleRow;

    calculatedIndexApple = newAppleRow * gridBoxAmount + newAppleCol;
    gridBoxes[calculatedIndexApple].classList.add("appleShow");
}

function isAppleInSnake(row, col) {
    if (row === snake.row && col === snake.col) {
        return true;
    }
    return snake.snakeBody.some(segment => segment.row === row && segment.col === col);
}

//snake body

function updateSnakeBody(gridBoxes){
    snake.snakeBody.unshift({ row: snake.row, col: snake.col });

    if (snake.snakeBody.length > snake.score) {
        const lastSegment = snake.snakeBody.pop();
        const segmentIndex = lastSegment.row * gridBoxAmount + lastSegment.col;
        gridBoxes[segmentIndex].classList.remove("snakeShow");
    }
}

//game loop

function mainGameLoop(gridBoxes){

    gameInterval = setInterval(() => {
        movement(gridBoxes);
    }, 300);
}

function clearMovement(gridBoxes){
    calculatedIndexSnake = snake.row * gridBoxAmount + snake.col;
    let oldCalculatedIndexSnake = calculatedIndexSnake
    gridBoxes[oldCalculatedIndexSnake].classList.remove("snakeShow")
}

function endGame(gridBoxes){
    clearMovement(gridBoxes)
    gameBoard.textContent = " ";
    snake.score = 0
    scoreTxt.textContent = `Score: ${snake.score}`
    startScreen.style.display = "flex";
    clearInterval(gameInterval)
}




