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
 let canvasWidth;
 let canvasHeight;
 let rafId;
 let rafCnt = 0;
 let count = 10;
 let sec;
let timerId;
let playState = false;
let step = 0;



function canvasSetting() {
    // field.objs.canvas.style.width = `${window.innerWidth}px`;
    // field.objs.canvas.style.height = `${window.innerHeight / 2}px`;
    field.objs.canvas.setAttribute('width', innerWidth);
    field.objs.canvas.setAttribute('height',innerHeight / 2);
    canvasWidth = field.objs.canvas.width;
    canvasHeight = field.objs.canvas.height
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
        step = -1;
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
        tempX = Math.floor(Math.random() * (canvasWidth * 0.8));
        tempY = Math.floor(Math.random() * (canvasHeight * 0.8));
        tempSpeed = Math.floor(Math.random() * 4 + 1);
        if(objs.bugs.length === BUG_NUM) {
            objs.bugs = [];
        }
        objs.bugs.push(new Bug(i, tempX, tempY, tempSpeed));
    }

    for(let i=0; i<CARROT_NUM; i++) {
        tempX = Math.floor(Math.random() * (canvasWidth * 0.8));
        tempY = Math.floor(Math.random() * (canvasHeight * 0.8));
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
    objs.context.clearRect(0,0,canvasWidth,canvasHeight);
    for(let carrot of objs.carrots) {
        carrot.draw();
    }

    switch(step) {
        case -2: 
            clearInterval(timerId);
            for(let bug of objs.bugs) {
                bug.draw();
            }   
            break;
        
        case 1:
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
        
                if(bug.x > canvasWidth) {
                    bug.x = -bug.width;
                } else if(bug.x === -bug.width) {
                    bug.x = canvasHeight;
                }
                
                if(bug.y > canvasHeight) {
                    bug.y = -bug.height;
                } else if(bug.y === -bug.height) {
                    bug.y = canvasHeight;
                }
            
                    bug.draw();
                
            }
            break;
        
    }

    rafId = requestAnimationFrame(render);
}

function fieldHandler() {
    generateField();
    render();
}

function playBtnHandler() {
    console.log(step);
    

    if(!playState) {
        step = 1;
        playState = true;
        main.classList.add('playing');
        fieldHandler();
        timerHandler();
    }
    if(main.classList.contains('pause')) {
        step = 1;
        rafId = requestAnimationFrame(render)
        timerId = setInterval(timerStart, 1000);
        main.classList.remove('pause');
        main.classList.add('playing');
    }
}

function pauseBtnHandler() {
    step = 0;
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
        if(step === -2) {
            return;
        }
        pauseBtnHandler();
    }

    if(target.classList.contains('canvas-field')) {
        mousePos.x = e.offsetX;
        mousePos.y = e.offsetY;
        let selectedTarget;
        const carrots = field.objs.carrots;
        let carrot;
        for(let i=0; i<carrots.length; i++) {
            carrot = carrots[i];
            if(mousePos.x > carrot.x &&
                mousePos.x < carrot.x + carrot.width &&
                mousePos.y > carrot.y && 
                mousePos.y < carrot.y + carrot.height) {
                    selectedTarget = carrot;
                }
        }

        const bugs = field.objs.bugs;
        let bug;
        for(let i=0; i<bugs.length; i++) {
            bug = bugs[i];
            if(mousePos.x > bug.x &&
                mousePos.x < bug.x + bug.width &&
                mousePos.y > bug.y &&
                mousePos.y < bug.y + bug.height) {
                    selectedTarget = bug;
                }
        }
        if(selectedTarget && step === 1) {
            switch(selectedTarget.type) {
                case 'bug': 
                    selectedTarget.state -= 6;
                    step = -2;
                break;
                case 'carrot': 
                    console.log('당근 수확');
                break;
            }
        }
    }
}

 function init() {
    canvasSetting();
     console.log(canvasWidth);
     console.log(canvasHeight);
    main.addEventListener('click',gameClickHandler);
    window.addEventListener('resize', () => {
        canvasSetting();
    })
    
    generateField();
 }

 init();
})();