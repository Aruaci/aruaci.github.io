import GLOBALS from './script.js';
const SPRITES = {
    green: {
        sky: {
            src: './assets/parallax/01_skyGreen.png',
            increaseSpeed: 0.8,
            image: null
        },
        floor: {
            src: './assets/parallax/02_floorGreen.png',
            increaseSpeed: 1.2,
            image: null
        },
        back: {
            src: './assets/parallax/03_backPlantsGreen.png',
            increaseSpeed: 1,
            image: null
        }, 
        middle: {
            src: './assets/parallax/04_middlePlantsGreen.png',
            increaseSpeed: 1.2,
            image: null
        },
        front: {
            src: './assets/parallax/05_frontPlantsGreen.png',
            increaseSpeed: 2,
            image: null
        }
        
    },

    red: {
        sky: {
            src: './assets/parallax/01_skyRed.png',
            increaseSpeed: 0.8,
            image: null
        },
        floor: {
            src: './assets/parallax/02_floorRed.png',
            increaseSpeed: 1.2,
            image: null
        },
        back: {
            src: './assets/parallax/03_backPlantsRed.png',
            increaseSpeed: 1,
            image: null
        }, 
        middle: {
            src: './assets/parallax/04_middlePlantsRed.png',
            increaseSpeed: 1.2,
            image: null
        },
        front: {
            src: './assets/parallax/05_frontPlantsRed.png',
            increaseSpeed: 2,
            image: null
        }
        
    },

    purple: {
        sky: {
            src: './assets/parallax/01_skyPurple.png',
            increaseSpeed: 0.8,
            image: null
        },
        floor: {
            src: './assets/parallax/02_floorPurple.png',
            increaseSpeed: 1.2,
            image: null
        },
        back: {
            src: './assets/parallax/03_backPlantsPurple.png',
            increaseSpeed: 1,
            image: null
        }, 
        middle: {
            src: './assets/parallax/04_middlePlantsPurple.png',
            increaseSpeed: 1.2,
            image: null
        },
        front: {
            src: './assets/parallax/05_frontPlantsPurple.png',
            increaseSpeed: 2,
            image: null
        }
        
    }
}

class Parallax {
    constructor (ctx, state, location) {
        this.ctx = ctx;
        this.parallaxX = -646;
        this.y = 0;
        this.width = 3233;
        this.height = 500;
        this.state = state;
        this.location = location;
        this.sprite = SPRITES[state][location];
        this.image = new Image();
        this.image.src = this.sprite.src;
    }

    update () {
        let increaseSpeed = this.sprite.increaseSpeed;
        this.parallaxX = (this.parallaxX - GLOBALS.gameSpeed * increaseSpeed) % 3233;
        
    }

    render () {
        this.ctx.drawImage(this.image, this.parallaxX, this.y, this.width, this.height);
        
        this.ctx.drawImage(this.image, this.parallaxX + 3233, this.y, this.width, this.height);
    }
}

export default Parallax;