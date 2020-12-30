export default class Carrot {
    constructor(index, x, y) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 200;
        this.img = new Image();
        this.img.src = './assets/img/carrot.png';
        this.ctx = document.querySelector('.canvas-field').getContext('2d');
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}