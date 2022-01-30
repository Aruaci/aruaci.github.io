class Text {
    constructor(ctx, text, x, y, alignment, color, size) {
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;
        this.alignment = alignment;
        this.color = color;
        this.size = size;
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.font = this.size + 'px Roboto';
        this.ctx.textAlign = this.alignment;
        this.ctx.fillText(this.text, this.x, this.y);
    }
}

export default Text;