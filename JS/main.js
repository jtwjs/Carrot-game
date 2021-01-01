import Bug from './canvas_bug.js';
import Carrot from './canvas_carrot.js';

(() => {
const main = document.querySelector('#main');
const timerElm = document.querySelector('.timer-text');
 const countElm = document.querySelector('.count-text');
 const BUG_NUM = 20;
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
 const carrotSound = new Audio('./assets/sound/carrot_pull.mp3');
 const alertSound = new Audio('./assets/sound/alert.wav');
 const bgSound = new Audio('./assets/sound/bg.mp3');
 const bugSound = new Audio('./assets/sound/bug_pull.mp3');
 const winSound = new Audio('./assets/sound/game_win.mp3');
 
 let canvasWidth;
 let canvasHeight;
 let rafId;
 let rafCnt = 0;
 let count = 10;
 let sec;
let timerId;
let countId;
let playState = false;
let step = 0;



function canvasSetting() {
    field.objs.canvas.setAttribute('width', innerWidth);
    field.objs.canvas.setAttribute('height',innerHeight / 2);
    canvasWidth = field.objs.canvas.width;
    canvasHeight = field.objs.canvas.height
}


function toRadian(degree) {
    return degree * Math.PI/180;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function timerStart() {
    timerElm.textContent = `00:${--sec < 10 ? '0'+sec : sec}`;
    if(sec === 0) {
        countElm.textContent = `0`;
        step = -1;
        gameState();
    }   
}
function timerHandler() {
    sec = 5;
    timerElm.textContent = `00:${sec < 10 ? '0' + sec: sec}`;
    timerId = setInterval(timerStart, 1000);
}

function countHandler() {
    countId = setInterval(carrotCount, 100);
}

function carrotCount() {
    count = field.objs.carrots.length;
    countElm.textContent = `${count}`;
    if(count === 0) {
        clearInterval(countId);
        step = 2;
        gameState();
    }
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

function gameState() {
    switch(step) {
        case -1:
        case -2:      
            gameEnd();
            stopSound(bgSound);
            playSound(bugSound);
            main.dataset.result = 'lose';
            break;
        case 0: 
            clearInterval(timerId);
            cancelAnimationFrame(rafId);
            main.classList.remove('playing');
            main.classList.add('pause');
            break;
        case 2:
            gameEnd();
            stopSound(bgSound);
            playSound(winSound);
            main.dataset.result = 'win';
            
    }
}

function gameEnd(){
    cancelAnimationFrame(rafId);
    clearInterval(timerId);
    playState = false;
    main.classList.remove('playing');
    main.classList.add('end');
    rafCnt = 0;
    field.objs.carrots = [];    
    generateField();
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
            for(let bug of objs.bugs) {
                bug.draw();
            }   
            gameState();
            return;
        case 0: 
            gameState();
            return;
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
        case 2: 
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
    render();
}



function gameClickHandler(e) {
    let target = e.target;
    if(target.classList.contains('play-btn')) {
        playSound(alertSound);
        playBtnHandler();    
        countHandler();
    }

    if(target.classList.contains('pause-btn')) {
        playSound(alertSound);
        pauseBtnHandler();
    }

    if(target.classList.contains('retry-btn')) {
        playSound(bgSound);
        playSound(alertSound);
        main.dataset.result = '';
        main.classList.remove('end');
        playBtnHandler();    
        countHandler();
        
    }




    if(target.classList.contains('canvas-field')) {
        const objs = field.objs;
        mousePos.x = e.offsetX;
        mousePos.y = e.offsetY;
        let selectedTarget;
        let carrots = objs.carrots;
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

        const bugs = objs.bugs;
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
                    playSound(bugSound);
                    selectedTarget.state -= 6;
                    step = -2;
                break;
                case 'carrot': 
                    playSound(carrotSound);
                    objs.carrots = carrots.filter(carrot => {
                         return selectedTarget.index !== carrot.index
                    }
                    );
                break;
            }
        }
    }
}

 function init() {
     playSound(bgSound);
    canvasSetting();
    generateField();
    main.addEventListener('click',gameClickHandler);
    window.addEventListener('resize', () => {
        location.reload();
    });
    
    window.addEventListener('load', () => {
        document.querySelector('.loading-stroke').style.animationIterationCount = '1';
    })

    document.querySelector('.loading-stroke').addEventListener('animationend', () => {
        document.body.classList.remove('before-load');
    });
    document.querySelector('.loading').addEventListener('transitionend', (e) => {
        document.body.removeChild(e.currentTarget);
    })
    
 }

 init();
})();