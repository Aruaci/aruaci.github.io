import GLOBALS from './script.js';

class Obstacle {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.state = 'ground';
        
        this.img = new Image();
        this.img.src = './assets/Rock1.png';
        this.init();
    
    }

    init() {
        this.sprites = {
            air: {
                src: './assets/Rock2.png',
                frameSize: {
                    width: 309,
                    height: 309,
                },
                image: null
            },
            ground: {
                src: './assets/Rock1.png',
                frameSize: {
                    width: 309,
                    height: 309,
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
        this.x -= GLOBALS.gameSpeed * 1.2  ;
        // this.rock.src = './assets/Rock1.png';
    }

    render() {
        this.ctx.drawImage(
        this.sprites[this.state].image,
        this.x,
        this.y,
        this.width,
        this.height,

        );
        // this.ctx.drawImage(this.rock, this.x, this.y, this.width, this.height);
        /*
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        */
    }

}

export default Obstacle;