export const bugState = Object.freeze({
    alive: 'alive',
    death: 'death',
});

export const bugMovement = Object.freeze({
    East: 'E',
    NothEast : 'NE',
    SouthEast: 'SE',
    West: 'W',
    NothWest: 'NW',
    SouthWest: 'SW',
});

export  class Bug {
    constructor(index, x, y, speed) {
        this.type = 'bug';
        this.index = index;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 60;
        this.height = 60;
        this.img = new Image();
        this.img2 = new Image();
        this.img3 = new Image();
        this.motion = false;
        this.ctx = document.querySelector('.canvas-field').getContext('2d');
        this.init();
    }

    setState(arg) {
        this.state = arg;
    }

    draw() {
        if(this.state === bugState.death) {
            this.ctx.drawImage(this.img3, this.x, this.y, this.width, this.height);
        }else {
            if(this.motion) {    
                this.ctx.drawImage(this.img2, this.x, this.y, this.width, this.height);
            } else{
                this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            }
        }
        }

    init() {
        const movementList = ['E','NE','SE','W','NW','SW'];
        const ranNum = Math.floor(Math.random() * 6)
        this.state = bugState.alive;
        if(ranNum < 3) {
            this.movement = {
                direction: bugMovement.East,
                details: movementList[ranNum],
            };
        } else {
            this.movement = {
                direction: bugMovement.West,
                details: movementList[ranNum],
            };
        }        
        if(this.movement.direction === bugMovement.East) {
            this.img.src = './assets/img/bug.png';
            this.img2.src = './assets/img/bug2.png';
            this.img3.src = './assets/img/bug-death.png'
        } else {
            this.img.src = './assets/img/bug-reverse.png';
            this.img2.src = './assets/img/bug2-reverse.png';
            this.img3.src = './assets/img/bug-reverse-death.png';
        }
    }

    }
