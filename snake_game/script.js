//Game Constants & variable
let inputDir = { x: 0, y: 0 };
let speed = 15;
let lastPaintTime = 0;
let snakeArr = [
    { x: 10, y: 10 }
]
let food = { x: 13, y: 15 };
let score = 0;

const foodSound = new Audio('assests/food.mp3');
const gameOverSound = new Audio('assests/gameover.mp3');
const moveSound = new Audio('assests/move.mp3');
const musicSound = new Audio("assests/music.mp3");

//Game functions
function main(ctime) {
    musicSound.play();
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y) {
            return true
        }
    }
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0) {
            return true;
    }
    return false;
}

function gameEngine() {
    //Part 1: updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again");
        snakeArr = [{ x: 10, y: 10 }];
        musicSound.play();
        hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        score = 0;
    }

    //If you have eaten the food, increment the score and recreate the food

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        score++;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        }
        document.querySelector("#score").innerHTML = `
        <h3>Your score: ${score}</h3>
        `;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //Part 2: display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement);

}

//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});