score = 0;
count = false;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = e => {
    rotate = false;
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    else if (e.keyCode == 39) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
        dino.style.transform = "rotateY(0deg)";
    }
    else if (e.keyCode == 37) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
        dino.style.transform = "rotateY(180deg)";
         
    }
};

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    yourScore = document.querySelector('.yourScore');
    scoreCont = document.querySelector('#scoreCont');


    //calculate the left of the dino
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    //calculate the top of the dino
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    //calculating the coordinates of the obstacles
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 170 && offsetY < 52) {
        gameOver.style.top = "30vh";
        gameOver.innerHTML = "Game Over - Reload to restart ";
        dino.classList.add('animateGoDown');
        obstacle.classList.remove('obstacleAni');
        scoreCont.style.visibility = 'hidden';
        yourScore.innerHTML = "Your Score: " + score;
        yourScore.style.visibility = 'visible';
        audiogo.play(); setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }

    else if ((dx - ox) > 0 && (!count)) {
        score += 1;
        updateScore(score);
        count = true;
        aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'))
        if (anidur > 3) {
            setTimeout(() => {
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
            }, 500);
        }

    }
    else if ((dx - ox) < 0) {
        count = false;
    }

}, 100);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}