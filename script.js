// ==========================  NOTES  =======================================
// This code runs out of the 3 browsers I tested it in (Chrome, Firefox & Safari) only in Firefox and even there it sometimes doesnt work properly and needs a closing of both the browser and VS Code
// ==========================================================================


const audioElement = new Audio('./dark-forest.mp3');
const audioElement2 = new Audio('./rain.mp3');
audioElement2.volume = 0.5;
const audioElement3 = new Audio('./siren.mp3');
audioElement3.volume = 0.3;

function changeBackground(imgPath) {
    const background = document.getElementById('content');
    background.style.backgroundImage = `url(${imgPath})`;
}

// Buttons ------------------------------------------------------------------
let startBtn = document.getElementById('startButton');
let restartBtn = document.getElementById('restartButton');
let audioBtn = document.getElementById('audio');
let musicBtn = document.getElementById('music');

function restart() {
    restartBtn.style.visibility = 'visible';
    restartBtn.style.marginTop = '220px';
    restartDiv.style.height = '100vh - 45px';
    restartBtn.style.marginBottom = '350px';
    audioBtn.style.marginTop = '12px';
    audioElement2.pause();
    audioElement3.pause();
}

function hideRestartBtn() {
    restartBtn.style.visibility = 'hidden';
}
// Functions to visualize to the user that he has turned off sound/music
musicBtn.onclick = function() {
    musicBtn.innerText = 'Music Off';
    musicBtn.style.color = 'gray';
    musicBtn.style.borderColor = 'gray';
    // sadly the sound buttons are not working during the game because the alerts are blocking them
    audioElement.pause();
}

audioBtn.onclick = function audioOff() {
    audioBtn.innerText = 'Audio Off';
    audioBtn.style.color = 'gray';
    audioBtn.style.borderColor = 'gray';
    audioElement.pause();
    audioElement2.pause();
    audioElement3.pause();
}

function success() {
    restartBtn.innerText = 'Replay';
}

// the function below is an attempt to make the audio, the dissapearnce of the button and the start of the game work but somehow no matter where if i call any function in HTML or JS it doesnt work in chrome 
startBtn.onclick = function() { 
    audioElement.play(); 
    startBtn.style.display = 'none';
    startBtn.style.marginTop = '0px';
     if (startBtn.style.display === 'none') {
         startGame();
     }
}


// ACTUAL GAME ================================================================
function startGame() {
    hideRestartBtn();
    audioElement.play();

    alert(`You notice you have only stayed inside and watched Netflix all day today`);
    let cWalk = +prompt(`Do you (1) take a walk or (2) stay inside and watch another episode?`);

    if (cWalk === 1) {
        let cClothes = +prompt(`Do you (1) take a wool coat or (2) a rain jacket with you?`);
        let cWay = prompt(`Where would you like to go? To the (park) or the (river)?`);

        audioElement2.play();
        confirm(`You walk in the direction of the ${cWay} as it starts to rain`);

        if (cClothes === 1) {
            alert(`Your raincoat might have been a better choice, you think to yourself`);
        } else {
            alert(`The raincoat was a good choice, you think to yourself`);
        }

        let cCuriosity = prompt(`Suddenly you hear a weird noise... do you check it out? (yes) or (no)?`);
        if (cCuriosity === `yes`) {
            let cCloser = +prompt(`You see a person lying on the floor. do you (1) walk closer or (2) shout to see if they need help?`);
            
            if (cCloser === 1) {
                let cSeeBlood = +prompt(`In the dim streetlight you see that they are lying in a pool of blood. You could (1) run to them to stop the bleeding, (2) take out your phone and call an ambulance or (3) shout for help`);

                switch (cSeeBlood) {
                    case 1:
                        confirm(`You run to them to see if you can help`);
                        changeBackground('./BG.png');
                        alert(`You suddenly hear someone behind you and the next thing you experience is pain and darkness`);
                        break;
                    case 2:
                        confirm(`As you take out your phone to call an ambulance, you notice the battery has died because of the cold`);
                        confirm(`Suddenly you see a hooded figue creeping out of the shadows next to the injured person`);
                        confirm(`You quickly try to hide behind a bush`);

                        if (cClothes === 2) {
                            alert(`As you try to hide your thin plastic raincoat makes an awful lot of noise`);
                            alert(`The hooded figure seems to have noticed you and runs away... its your fault that other people are gonna be killed...`);
                        } else {
                            alert(`Even though your wool coat is heavy and soaked by the rain you are glad you took it instead of the rainjacket which would have made an awful lot of noise`);

                            let cSeeKnive = prompt(`Now that the hooded person has stepped into the light you can see the bloody knive they are holding. They squat next to the person on the ground and wipe the blood off the knife and proceed to put it in a suitcase they have been carrying . Do you (stay) or (run) away?`);

                            switch (cSeeKnive) {
                                case "stay":
                                    audioElement3.play();
                                    confirm(`Suddenly you hear police sirens from somewhere behind you. The attacker must have heard them too because they grab the suitcase and get up to run away`);
                                    
                                    let = cStopMurderer = +prompt(`But what is that??... The hooded figure is running in your direction. They apparently haven't seen you yet. As you turn your head you can already see the headlights of the police cars. You have 3 choices on what to do when they run past you: (1) grab the case, (2) trip them up, (3) hit them with a nearby branch`);

                                    switch (cStopMurderer) {
                                        case 1:
                                            alert(`Despite the surprise advantage you fail to rip the case out of their hands.`);
                                            changeBackground('./BG.png');
                                            alert(`Instead they swing it against your head and the world turns black`);
                                            break;

                                        case 2:
                                            let cItem = prompt(`The plan of tripping them up actually works and they fall down. As the suitcase hits the ground as well, it opens and several things fall out: the (knife), a (hammer), and a (notebook). Which item do you grab? Or do you grab (nothing)?`);

                                            switch (cItem) {
                                                case 'knife':
                                                    audioElement3.volume = 1;
                                                    changeBackground('./BG.png');
                                                    alert(`The figure seemed to have the same thought and he is faster. Now the police arrives but they have to clean up two bodies instead of one`);
                                                    break;

                                                case 'hammer':
                                                    alert(`They grab the knife and with amazing speed injure your arm before you can swing the hammer doen on them`);
                                                    changeBackground('./BG.png');
                                                    audioElement3.volume = 1;
                                                    alert(`Due to your injured arm you can't help but drop the hammer... now the police arrives but they have to clean up two bodies instead of one`)
                                                    break;

                                                case 'notebook':
                                                    alert(`They grab the knive and try to stab you but luckyly you can stop the knife right in fron of your body with the book and the knife gets stuck in it.`);
                                                    changeBackground('./BG3.png');
                                                    alert(`They realize they have no time left and try to run away ...directly in the arms of the police`);
                                                    alert(`Congratulations!!! You have survived AND helped catch a killer!`);
                                                    success();
                                                    break;

                                                case 'nothing':
                                                    changeBackground('./BG3.png');
                                                    success();
                                                    alert(`They realize it's not worth it to deal with you and try to run away ...directly in the arms of the police`);
                                                    alert(`Congratulations!!! You have survived AND helped catch a killer!`);
                                                    success();
                                                    break;
                                            }

                                            break;

                                        case 3:
                                            confirm(`You successfully hit them and they stumble to the ground. With the sirens indicating near police presence they seem to decide that there's not enough time left to escape and quickly get up...`);
                                            alert(`...and run directly in the arms of the police`);
                                            alert(`Congratulations!!! You have survived AND helped catch a killer!`);
                                            success();
                                            break;
                                    }

                                    break;

                                case "run":
                                    changeBackground('./BG.png');
                                    alert(`You get up and try to sprint away as fasta s you can, but suddenly you feel a sharp pain in your back...`);
                                    break;

                                case "run away":
                                    changeBackground('./BG.png');
                                    alert(`You get up and try to sprint away as fasta s you can, but suddenly you feel a sharp pain in your back...`);
                                    break;
                                
                                default:
                                    alert(`This doesnt seem to be an option`);
                                    break;
                            }
                        }

                        break;
                    case 3:
                        alert(`You scream for help but no one seems to be around`);
                        changeBackground('./BG.png');
                        alert(`You suddenly hear someone behind you and the next thing you experience is pain and darkness`);
                        break;
                }
            } else {
                alert(`You loudly ask if they are okay`);
                changeBackground('./BG.png');
                alert(`They don't react and right when you are about to walk up to them, you hear someone behind you and the next thing you experience is pain and darkness`);
            }

        } else {
            alert(`You might have escaped a not so well fate but you missed the chance to prevent a few deaths...`);
        }

    } else {
        alert(`Ok... I get it, better close this website and open Netflix`);
    }

    restart();
    changeBackground('./BG2.png');
    
}