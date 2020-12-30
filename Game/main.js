import Bug from './canvas_bug.js';


(() => {
const main = document.querySelector('#main');
const timerElm = document.querySelector('.timer-text');
 const countElm = document.querySelector('.count-text');
 const BUG_NUM = 6;
 const CARROT_NUM = 10;
 const field = {
     objs: {
         canvas: document.querySelector('.canvas-field'),
         context: document.querySelector('.canvas-field').getContext('2d'),
        bugs: [],
        carrots: [],
     }
 }
 const CANVAS_WIDTH = field.objs.canvas.width;
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
}

function render() {
    rafCnt++;

    const objs = field.objs;
    objs.context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    for(let bug of objs.bugs) {  
        if(rafCnt % (Math.floor(20 / bug.speed)) === 0) {
            bug.motion = !bug.motion;
        }
            bug.draw();
        
    }

    for(let bug of objs.bugs) {
        bug.x += bug.speed;
        if(bug.x > CANVAS_WIDTH) {
            bug.x = -bug.width;
        }
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
}

function gameClickHandler(e) {
    let target = e.target;
    if(target.classList.contains('play-btn')) {
        playBtnHandler();    
        countHandler();
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