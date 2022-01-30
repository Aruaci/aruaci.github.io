// IMPORTING CLASSES
import Player from './player.js';
import Obstacle from './obstacle.js';
import Text from './text.js';
import SpecialCollectible from './specialCollectible.js';
import Parallax from './parallaxColor.js';

// SCREENS
const colors = document.getElementById('colorWrapper');
const startScreen = document.getElementById('startScreen');
const controlsScreen = document.getElementById('controlsScreen');
const restartBtn = document.getElementById('restartBtn');

const wrapper = document.getElementById('wrapper');
const green = document.getElementById('green');
const red = document.getElementById('red');
const purple = document.getElementById('purple');

// AUDIO
const bgAudio = new Audio('./assets/Audio/Shadowlands.mp3');
const deathAudio = new Audio('./assets/Audio/death.wav');
deathAudio.volume = 0.6;
const collectAudio = new Audio('./assets/Audio/collect.wav');

let bg = new Image();
    bg.src = './assets/bg.png';

// GLOBAL VARIABLES
let ctx;  
let lastTickTimestamp = 0;
let player;
let obstacles = [];
let scoreText;
let livesText;
let score;
let highscoreText;
let highscore;
let isGameOver = false;

let specialCollectibleArray = [];
let intervallSetterCollectibles;
let obstIntervalSetter;
let obstIntervalSet;
let animFrame;

let lives;


let GLOBALS = {
    gameSpeed: 4
}

// PARALLAX DECLARATIONS
let parallaxState;

let parallaxGreenSky;
let parallaxGreenFloor;
let parallaxGreenBack;
let parallaxGreenMiddle;
let parallaxGreenFront;

let parallaxRedSky;
let parallaxRedFloor;
let parallaxRedBack;
let parallaxRedMiddle;
let parallaxRedFront;

let parallaxPurpleSky;
let parallaxPurpleFloor;
let parallaxPurpleBack;
let parallaxPurpleMiddle;
let parallaxPurpleFront;


// ================== GAME FUNCTIONS ==================
/*
const startGame = () => {
    canvas.style.display = 'inline';
    startScreen.style.display = 'none';
    init();
}
*/

/*
let startScreen = document.getElementById('startScreen');
startScreen.addEventListener("click", startGame());
*/

const init = () => {

    const canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1300;
    canvas.height = 500;

    score = 0;
    highscore = 0;
    lives = 0;

    isGameOver = false;
    bgAudio.loop = 'true';
    bgAudio.playbackRate = 1;

    if (parallaxState === 0) {
        parallaxGreen();
    } else if (parallaxState === 1) {
        parallaxRed();
    } else {
        parallaxPurple();
    }
    

    // new Player Object
    player = new Player(ctx, 300, 450, 120, 120);


    lastTickTimestamp = performance.now();
    animFrame = requestAnimationFrame(gameLoop);

    // Draw Score
    scoreText = new Text(ctx, `Score: ${score}`, 25, 35, 'left', 'black', '20');
    // livesText = new Text(ctx, `Lives: ${lives}`, 1260, 35, 'right', 'black', '20');
    

    multipleSpawn();
    multipleSpawnCollectibles();

    bgAudio.play();
    
}

const gameLoop = () => {
    let timePassedSinceLastRender = performance.now() - lastTickTimestamp;
    update(timePassedSinceLastRender);
    render();
    lastTickTimestamp = performance.now();
    
    requestAnimationFrame(gameLoop);
}


const render = () => {
    
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (parallaxState === 0) {
        parallaxGreenRender();
    } else if (parallaxState === 1) {
        parallaxRedRender();
    } else {
        parallaxPurpleRender();
    }
    
    player.render();
    
    
    for(const obstacle of obstacles){
        obstacle.render();
    }
    
    for(const specialCollectible of specialCollectibleArray){
        specialCollectible.render();
    }

    scoreText.render();
    // livesText.render();

    if(GLOBALS.gameSpeed < 10) {
    }
    
    if (isGameOver) {
        restartBtn.style.display = 'inline';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'white';
        ctx.font = '100px Roboto';
        ctx.fillText('Game Over', canvas.width - 900, canvas.height - 210);

        ctx.shadowBlur = 9;
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        let restartText = ctx.fillText("Restart", canvas.width - 730, canvas.height - 160);
        clearInterval(obstIntervalSetter);

        clearAnimationFrame(animFrame);
    }

    if (parallaxState === 0) {
        parallaxGreenRenderFront();
    } else if (parallaxState === 1) {
        parallaxRedRenderFront();
    } else {
        parallaxPurpleRenderFront();
    }
    
}

const update = () => {

    if (parallaxState === 0) {
        parallaxGreenUpdate();
    } else if (parallaxState === 1) {
        parallaxRedUpdate();
    } else {
        parallaxPurpleUpdate();
    }

    player.update();
    

    score++;
    bgAudio.playbackRate += 0.0005;

    GLOBALS.gameSpeed += 0.003;
    scoreText.text = `Score: ${score}`;
    // livesText.text = `Lives: ${lives}`;
    

    for(const obstacle of obstacles){
        obstacle.update();
    }

    for(const specialCollectible of specialCollectibleArray){
        specialCollectible.update();
    }

    // LOOPING over ARRAY that contains the obstacles
    for(let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];
        // checking if the obstacle is outside the canvas and if yes, removing the obstacle from the array to not put excessive load on the computer the game runs on 
        if(o.x + o.width < 0) {
            obstacles.splice(i, 1);
        }

        // COLLISION DETECTION
        if (player.x > o.x + o.width ||
            player.x + player.width < o.x ||
            player.y > o.y + o.height ||
            player.y + player.height < o.y) {
                //no collision

        } else {
            /*
            if(lives % 2) {
                gameOver();
            } else {
                lives -= 2;
            }
            */
            gameOver();
        }
    }

    for(let i = 0; i < specialCollectibleArray.length; i++) {
        let a = specialCollectibleArray[i];
        // checking if the obstacle is outside the canvas and if yes, removing the obstacle from the array to not put excessive load on the computer the game runs on 
        if(a.x + a.width < 0) {
            specialCollectibleArray.splice(i, 1);
        }

        // COLLISION DETECTION
        if (player.x > a.x + a.width ||
            player.x + player.width < a.x ||
            player.y > a.y + a.height ||
            player.y + player.height < a.y) {
                //no collision

        } else {
            GLOBALS.gameSpeed -= 0.2;
            score += 500;
            collectAudio.play();
            // lives += 0.5;

            // delete Special Collectible from array when collected
            specialCollectibleArray.splice(i);
            
        }
    }

    if (parallaxState === 0) {
        parallaxGreenUpdateFront();
    } else if (parallaxState === 1) {
        parallaxRedUpdateFront();
    } else {
        parallaxPurpleUpdateFront();
    }
    
}

let gameOver = () => {
    if (player.y === 330 || player.y === 390) {
        //player.state = 'groundDeath';
        if (player.state === 'roll') {
            // player.height = player.runHeight;
            // player.width = player.runWidth;
            player.state = 'rollDeath';
        } else {player.state = 'groundDeath';}
        // player.height = player.runHeight;
        // player.width = player.runWidth;
    } else {
        player.state = 'airDeath';
    }
    score = 0;
    GLOBALS.gameSpeed = 4;
    deathAudio.play();
    bgAudio.playbackRate = 1;
    obstacles = [];
    specialCollectibleArray = [];
    obstIntervalSetter = 1000;
    intervallSetterCollectibles = 1000;
    isGameOver = true; 
    
}

// ============================= SPAWN FUNCTIONS
let spawnObstacles = () => {
    let obstSize = randomInterval(30, 130);
    let obstType = randomInterval(0, 1);
    
    let obstPosY = obstType === 1 ? 
        Math.floor(Math.random() * 100 + 200) : 
        450 - obstSize;
    // create random y position for floating obstacles
    let obstacle = new Obstacle(ctx, canvas.width + obstSize, obstPosY, obstSize, obstSize);
    // set obstacle sprite according to position
    if (obstType === 1) {
        obstacle.state = 'air';
    } else {
        obstacle.state = 'ground';
    }
    obstacles.push(obstacle);
/*
    const spawnTime = randomInterval(700, 3500);
    setTimeout(spawnObstacles, spawnTime);
*/
    
}

let spawnCollectibles = () => {
    // create random y position, all special collectibles are above the ground
    let collPosY = Math.floor(Math.random() * 100 + 200);
    let specialCollectible = new SpecialCollectible(ctx, canvas.width + 50, collPosY, 50, 50);
    // add object to collectible array
    specialCollectibleArray.push(specialCollectible);
/*
    const spawnTimeColl = randomInterval(3000, 6000);
    setTimeout(spawnCollectibles, spawnTimeColl);
    clearTimeout(spawnCollectibles);
*/
}


let multipleSpawn = () => {
    // set variable to manipulate the obstacle intervall with game speed
    obstIntervalSetter = 1000; // multiplied with 1000 to get seconds instead of milliseconds
    let interval = randomInterval(1, 3) * obstIntervalSetter;
    // if(spawnInterval) clearInterval(spawnInterval);
    obstIntervalSet = setInterval(spawnObstacles, interval);
    //spawnInterval = setTimeout(spawnObstacles, interval);
    // increase intervall with game speed
    obstIntervalSetter++;
}

let multipleSpawnCollectibles = () => {
    // set variable to manipulate the intervall with game speed
    intervallSetterCollectibles = 1000;
    let intervalColl = randomInterval(5, 10) * intervallSetterCollectibles;
    setInterval(spawnCollectibles, intervalColl);
    // increase intervall with game speed
    intervallSetterCollectibles++;
}


// ============================ PARALLAX FUNCTIONS

// PARALLAX GREEN
const parallaxGreen = () => {
    parallaxGreenSky = new Parallax(ctx, 'green', 'sky');
    parallaxGreenFloor = new Parallax(ctx, 'green', 'floor');
    parallaxGreenBack = new Parallax(ctx, 'green', 'back');
    parallaxGreenMiddle = new Parallax(ctx, 'green', 'middle');
    parallaxGreenFront = new Parallax(ctx, 'green', 'front');
}

const parallaxGreenRender = () => {
    parallaxGreenSky.render();
    parallaxGreenFloor.render();
    parallaxGreenBack.render();
    parallaxGreenMiddle.render();
    parallaxGreenFront.render();
}

const parallaxGreenRenderFront = () => {
    parallaxGreenFront.render();
}

const parallaxGreenUpdate = () => {
    parallaxGreenSky.update();
    parallaxGreenFloor.update();
    parallaxGreenBack.update();
    parallaxGreenMiddle.update();
}

const parallaxGreenUpdateFront = () => {
    parallaxGreenFront.update();
}

// PARALLAX RED
const parallaxRed = () => {
    parallaxRedSky = new Parallax(ctx, 'red', 'sky');
    parallaxRedFloor = new Parallax(ctx, 'red', 'floor');
    parallaxRedBack = new Parallax(ctx, 'red', 'back');
    parallaxRedMiddle = new Parallax(ctx, 'red', 'middle');
    parallaxRedFront = new Parallax(ctx, 'red', 'front');
}

const parallaxRedRender = () => {
    parallaxRedSky.render();
    parallaxRedFloor.render();
    parallaxRedBack.render();
    parallaxRedMiddle.render();
    parallaxRedFront.render();
}

const parallaxRedRenderFront = () => {
    parallaxRedFront.render();
}

const parallaxRedUpdate = () => {
    parallaxRedSky.update();
    parallaxRedFloor.update();
    parallaxRedBack.update();
    parallaxRedMiddle.update();
}

const parallaxRedUpdateFront = () => {
    parallaxRedFront.update();
}

// PARALLAX PURPLE
const parallaxPurple = () => {
    parallaxPurpleSky = new Parallax(ctx, 'purple', 'sky');
    parallaxPurpleFloor = new Parallax(ctx, 'purple', 'floor');
    parallaxPurpleBack = new Parallax(ctx, 'purple', 'back');
    parallaxPurpleMiddle = new Parallax(ctx, 'purple', 'middle');
    parallaxPurpleFront = new Parallax(ctx, 'purple', 'front');
}

const parallaxPurpleRender = () => {
    parallaxPurpleSky.render();
    parallaxPurpleFloor.render();
    parallaxPurpleBack.render();
    parallaxPurpleMiddle.render();
    parallaxPurpleFront.render();
}

const parallaxPurpleRenderFront = () => {
    parallaxPurpleFront.render();
}

const parallaxPurpleUpdate = () => {
    parallaxPurpleSky.update();
    parallaxPurpleFloor.update();
    parallaxPurpleBack.update();
    parallaxPurpleMiddle.update();
}

const parallaxPurpleUpdateFront = () => {
    parallaxPurpleFront.update();
}



// =======================  ONCLICK FUNCTIONS
startScreen.onclick = function() {
    controlsScreen.style.display = 'inline';
    startScreen.style.display = 'none';
}


controlsScreen.onclick = function() {
    controlsScreen.style.display = 'none';
    colorWrapper.style.display = 'flex';
}

green.onclick = function() {
    wrapper.style.backgroundColor = '#afe2db';
    green.style.display = 'none';
    red.style.display = 'none';
    purple.style.display = 'none';
    colors.style.display = 'none';
    canvas.style.display = 'inline';
    parallaxState = 0;
    init();
}

red.onclick = function() {
    wrapper.style.backgroundColor = '#e5d0b8';
    green.style.display = 'none';
    red.style.display = 'none';
    purple.style.display = 'none';
    colors.style.display = 'none';
    parallaxState = 1;
    canvas.style.display = 'inline';
    init();
}

purple.onclick = function() {
    wrapper.style.backgroundColor = '#bcb8c6';
    green.style.display = 'none';
    red.style.display = 'none';
    purple.style.display = 'none';
    colors.style.display = 'none';
    parallaxState = 2;
    canvas.style.display = 'inline';
    init();
}




restartBtn.onclick = function() {
    isGameOver = false;
    
    specialCollectibleArray = [];
    obstIntervalSetter = 1000;
    intervallSetterCollectibles = 1000;
    GLOBALS.gameSpeed = 4;
    bgAudio.playbackRate = 1;
    obstacles = [];
    location.reload();
    restartBtn.style.display = 'none';
}
/*
window.addEventListener('load', () => {
    init();
});
*/


// Function that takes 2 parameters in between which 
const randomInterval = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}



export default GLOBALS;