const jumpAudio = new Audio('./assets/Audio/jump.wav');
jumpAudio.volume = 0.8;
const rollAudio = new Audio('./assets/Audio/roll.mp3');

import GLOBALS from './script.js';

class Player {

    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.dy = 50;
        this.jumpForce = 15;
        this.runHeight = height;
        this.runWidth = width;
        this.jumpPermission = false;
        this.gravity = 0.6;
        this.floorHeight = 450;
        this.jumpCounter = 0;

        this.currentKeys = {};
        this.state = 'run';

        this.img = null;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (event) => {
            this.currentKeys[event.code] = true;
        });
        document.addEventListener('keyup', (event) => {
            this.currentKeys[event.code] = false;
        });
        this.image = new Image();
        this.image.src = './assets/spritesheetRun.png';


        this.sprites = {
            run: {
                src: './assets/spritesheetRun.png',
                frames: 14,
                fps: 20,
                frameSize: {
                    width: 1622 ,
                    height: 1622,
                },
                image: null
            },
            jump: {
                src: './assets/spritesheetJump.png',
                frames: 1,
                fps: 20,
                frameSize: {
                    width: 1621,
                    height: 1622,
                },
                image: null
            },
            groundDeath: {
                src: './assets/spritesheetGroundDeath.png',
                frames: 1,
                fps: 20,
                frameSize: {
                    width: 1621,
                    height: 1622,
                },
                image: null
            },
            airDeath: {
                src: './assets/spritesheetAirDeath.png',
                frames: 1,
                fps: 20,
                frameSize: {
                    width: 1621,
                    height: 1622,
                },
                image: null
            },
            rollDeath: {
                src: './assets/spritesheetRoll.png',
                frames: 8,
                fps: 20,
                frameSize: {
                    width: 1622,
                    height: 1622,
                },
                image: null
            },
            roll: {
                src: './assets/spritesheetRoll.png',
                frames: 8,
                fps: 20,
                frameSize: {
                    width: 1622,
                    height: 1622,
                },
                image: null
            },

        }

        

        Object.values(this.sprites).forEach((sprite) => {
            sprite.image = new Image();
            sprite.image.src = sprite.src;
        });
    }

    update() {
        // KEYS

        // jump
        if(this.currentKeys['Space'] || this.currentKeys['ArrowUp']) {
            this.jump();
            if(this.jumpPermission) jumpAudio.play();
        } else {
            this.jumpCounter = 0;
        }

        // roll
        if(this.currentKeys['ArrowDown']) {
            this.height = this.runHeight / 2;
            this.width = this.runWidth / 2;
            this.state = 'roll';
            if(this.jumpPermission === true) {
                rollAudio.play();
            }
            
        } else {
            this.height = this.runHeight;
            this.width = this.runWidth;
            rollAudio.pause();
        }

        // slam
        if(this.currentKeys['ArrowDown'] && this.jumpPermission === false) {
            this.dy += this.gravity * 5;
            this.state = 'roll'; 
            
        }

        // Gravity
        this.y += this.dy;
        if(this.y + this.height < this.floorHeight ) {
            this.dy += this.gravity;
            this.jumpPermission = false;
            if(this.currentKeys['ArrowDown'] && this.jumpPermission === false) {
                this.state = 'roll'; 
            } else { 
                this.state = 'jump';
            }

        } else {
            this.dy = 0;
            this.jumpPermission = true;
            this.y = this.floorHeight - this.height;
            if(this.currentKeys['ArrowDown']) {
                this.state = 'roll';
            } else {
                this.state = 'run';
            }
        }

        // this.state = this.dy 
        

    }

    jump() {
        if(this.jumpPermission && this.jumpCounter === 0) {
            this.jumpCounter = 1;
            this.dy = -this.jumpForce;
        } else if(this.jumpCounter > 0 && this.jumpCounter < 11) {
            this.jumpCounter ++;
            this.dy = -this.jumpForce - (this.jumpCounter / 50);
        }

        if (this.y < 390) {
            
        }
    }

    
    render() {
        this.ctx.translate(this.x, this.y );

        let coords = this.getImageSpriteCoordinates(this.sprites[this.state]);

        this.ctx.drawImage(
            this.sprites[this.state].image, // the image
            coords.sourceX,     // source x
            coords.sourceY,     // source y
            coords.sourceWidth, // source width
            coords.sourceHeight,// source height
            0,      // destination x
            0,  // destination y
            this.width,         // destination width
            this.height         // destination height
          );
          this.ctx.resetTransform();
        /*
          this.ctx.beginPath();
          this.ctx.strokeStyle = 'orange';
          this.ctx.rect(this.x, this.y, this.width, this.height);
          this.ctx.stroke();
          */
        }


        getImageSpriteCoordinates(sprite) {

            let frameX = Math.floor(performance.now() / 1000 * (sprite.fps * (GLOBALS.gameSpeed / 12)) % sprite.frames);
        
            let coords = {
              sourceX: frameX * sprite.frameSize.width,
              sourceY: 0,
              sourceWidth: sprite.frameSize.width,
              sourceHeight: sprite.frameSize.height
            }
            return coords;
        }

        // this.ctx.fillStyle = 'orange';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }

export default Player;