import Bug from './canvas_bug.js';
import Carrot from './canvas_carrot.js';

(() => {
const main = document.querySelector('#main');
const timerElm = document.querySelector('.timer-text');
 const countElm = document.querySelector('.count-text');
 const BUG_NUM = 10;
 const CARROT_NUM = 10;
 const field = {
     objs: {
         canvas: document.querySelector('.canvas-field'),
         context: document.querySelector('.canvas-field').getContext('2d'),
        bugs: [],
        carrots: [],
     }
 }
 const mousePos = {
     x:0,
     y:0,
 };
 
 const CANVAS_WIDTH = field.objs.canvas.width
 const CANVAS_HEIGHT = field.objs.canvas.height;
 let rafId;
 let rafCnt = 0;
 let count = 10;
 let sec;
let timerId;
let playState = false;


function canvasSetting() {
    field.objs.canvas.style.width = `${window.innerWidth}px`;
    field.objs.canvas.style.height = `${window.innerHeight / 2}px`;

}


function toRadian(degree) {
    return degree * Math.PI/180;
}


function timerStart() {
    timerElm.textContent = `00:${--sec < 10 ? '0'+sec : sec}`;
    if(sec === 0) {
        clearInterval(timerId);
        cancelAnimationFrame(rafId);
        main.classList.remove('playing');
        countElm.textContent = `0`;
        playState = false;
    }   
}
function timerHandler() {
    sec = 10;
    timerElm.textContent = `00:${sec}`;
    timerId = setInterval(timerStart, 1000);
}

function countHandler() {
    count = 10;
    countElm.textContent = `${count}`;
}

function generateField() {
    const objs = field.objs;
    let tempX;
    let tempY;
    let tempSpeed;


    for(let i=0; i<BUG_NUM; i++) {
        tempX = Math.floor(Math.random() * (CANVAS_WIDTH * 0.8));
        tempY = Math.floor(Math.random() * (CANVAS_HEIGHT * 0.8));
        tempSpeed = Math.floor(Math.random() * 4 + 1);
        if(objs.bugs.length === BUG_NUM) {
            objs.bugs = [];
        }
        objs.bugs.push(new Bug(i, tempX, tempY, tempSpeed));
    }

    for(let i=0; i<CARROT_NUM; i++) {
        tempX = Math.floor(Math.random() * (CANVAS_WIDTH * 0.8));
        tempY = Math.floor(Math.random() * (CANVAS_HEIGHT * 0.8));
        if(objs.carrots.length === CARROT_NUM) {
            objs.carrots = [];
        }
        objs.carrots.push(new Carrot(i, tempX, tempY));
    }
}

function render() {
    rafCnt++;
    const bugStateList = ['E','NE','SE','W','NW','SW'];
    const objs = field.objs;
    objs.context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for(let carrot of objs.carrots) {
        carrot.draw();
    }
    for(let bug of objs.bugs) {  
        if(rafCnt % (Math.floor(20 / bug.speed)) === 0) {
            bug.motion = !bug.motion;
        }

        switch(bugStateList[bug.state]) {
            case 'E':
                 bug.x += bug.speed; 
                 break;
            case 'NE': 
                bug.x += bug.speed; 
                bug.y -= bug.speed;
                break;
            case 'SE':
                bug.x += bug.speed; 
                bug.y += bug.speed;
                break;
            case 'W':
                bug.x -= bug.speed; 
                break;
            case 'NW':
                bug.x -= bug.speed; 
                bug.y -= bug.speed;
                break;
            case 'SW':
                bug.x -= bug.speed; 
                bug.y += bug.speed;
                break;
        };

        if(bug.x > CANVAS_WIDTH) {
            bug.x = -bug.width;
        } else if(bug.x === -bug.width) {
            bug.x = CANVAS_WIDTH;
        }
        
        if(bug.y > CANVAS_HEIGHT) {
            bug.y = -bug.height;
        } else if(bug.y === -bug.height) {
            bug.y = CANVAS_HEIGHT;
        }
    
            bug.draw();
        
    }

    rafId = requestAnimationFrame(render);
}

function fieldHandler() {
    generateField();
    render();
}

function playBtnHandler() {
    if(!playState) {
        playState = true;
        main.classList.add('playing');
        fieldHandler();
        timerHandler();
    }
    if(main.classList.contains('pause')) {
        rafId = requestAnimationFrame(render)
        timerId = setInterval(timerStart, 1000);
        main.classList.remove('pause');
        main.classList.add('playing');
    }
}

function pauseBtnHandler() {
    clearInterval(timerId);
    cancelAnimationFrame(rafId);
    main.classList.remove('playing');
    main.classList.add('pause');
}



function gameClickHandler(e) {
    let target = e.target;
    if(target.classList.contains('play-btn')) {
        playBtnHandler();    
        countHandler();
    }
    if(target.classList.contains('pause-btn')) {
        pauseBtnHandler();
    }

    if(target.classList.contains('canvas-field')) {
        mousePos.x = e.layerX;
        mousePos.y = e.layerY;
        const carrots = field.objs.carrots;
        console.log(mousePos);
        console.log(CANVAS_WIDTH,CANVAS_HEIGHT);
        let carrot;
        let selectedCarrot;
        for(let i=0; i<carrots.length; i++) {
            carrot = carrots[i];
            if(mousePos.x > carrot.x &&
                mousePos.x < carrot.x + carrot.width &&
                mousePos.y > carrot.y && 
                mousePos.y < carrot.y + carrot.height) {
                    selectedCarrot = carrot;
                }
        }
        console.log(selectedCarrot);

        const bugs = field.objs.bugs;
        let selectedBug;
        let bug;
        for(let i=0; i<bugs.length; i++) {
            bug = bugs[i];
            if(mousePos.x > bug.x &&
                mousePos.x < bug.x + bug.width &&
                mousePos.y > bug.y &&
                mousePos.y < bug.y + bug.height) {
                    selectedBug = bug;
                }
        }
        console.log(selectedBug);
    }
}

 function init() {
    main.addEventListener('click',gameClickHandler);
    window.addEventListener('resize', () => {
        canvasSetting();
    })
    canvasSetting();
    generateField();
 }

 init();
})();