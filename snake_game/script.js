//Game Constants & variable
let direction = { x: 0, y: 0 };
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

const foodSound = new Audio('assests/food.mp3');
const gameOverSound = new Audio('assests/gameover.mp3');
const moveSound = new Audio('assests/move.mp3');
const musicSound = new Audio('assests/music.mp3');

//Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    //Part 1: updating the snake array


    //Part 2: display the snake and food
}
















//Main logic starts here
window.requestAnimationFrame(main);