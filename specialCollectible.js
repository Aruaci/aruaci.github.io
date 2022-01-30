import GLOBALS from './script.js';

class SpecialCollectible {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.feather = new Image();
    }

    update() {
        this.x -= GLOBALS.gameSpeed;
        this.feather.src = './assets/feather.png';
    }

    render() {
        this.ctx.drawImage(this.feather, this.x, this.y, this.width, this.height);

        /*
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        */
    }

}

export default SpecialCollectible;