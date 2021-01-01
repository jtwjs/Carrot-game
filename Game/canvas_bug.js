export default class Bug {
    constructor(index, x, y, speed) {
        this.type = 'bug';
        this.index = index;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 60;
        this.height = 60;
        this.state = Math.floor(Math.random() * 6);
        this.img = new Image();
        this.img2 = new Image();
         if (this.state < 3) {
            this.img.src = './assets/img/bug.png';
            this.img2.src = './assets/img/bug2.png';
        }else {
            this.img.src = './assets/img/bug-reverse.png';
            this.img2.src = './assets/img/bug2-reverse.png';
        }
        this.motion = false;
        this.ctx = document.querySelector('.canvas-field').getContext('2d');
    }

    draw() {

        if(this.state < 0) {
            if(this.state < -3) {
                this.img.src = './assets/img/bug-reverse-death.png';
            } else {
                this.img.src = './assets/img/bug-reverse-death.png';
            }
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            return;
        }

        if(this.motion) {    
            this.ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
        } else{
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        }
    }
