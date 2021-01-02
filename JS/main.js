import Field from './field.js';
import * as sound from './sound.js';

(() => {
const main = document.querySelector('#main');
const timerElm = document.querySelector('.timer-text');
 const countElm = document.querySelector('.count-text');
 const BUG_NUM = 20;
 const CARROT_NUM = 10;
 const TIME_LIMIT = 5;
 const gameField = new Field(BUG_NUM, CARROT_NUM);
 
 let count = 10;
 let sec;
let timerId;
let countId;

function toRadian(degree) {
    return degree * Math.PI/180;
}

function timerStart() {
    timerElm.textContent = `00:${--sec < 10 ? '0'+sec : sec}`;
    if(sec === 0) {
        countElm.textContent = `0`;
        gameField.setStep(-1);
        gameField.gameEnd();
    }   
}
function timerHandler() {
    sec = TIME_LIMIT;
    timerElm.textContent = `00:${sec < 10 ? '0' + sec: sec}`;
    timerId = setInterval(timerStart, 1000);
    gameField.setTimerId(timerId);
}

function countHandler() {
    countId = setInterval(carrotCount, 100);
}

function carrotCount() {
    count = gameField.getCarrotList().length;
    countElm.textContent = `${count}`;
    if(count === 0) {
        clearInterval(countId);
        gameField.setStep(2);
    }
}

function playBtnHandler() {
    if(!gameField.getPlayState()) {
        gameField.setStep(1);
        gameField.setPlayState(true);
        main.classList.add('playing');
        gameField.generateField();
        gameField.render();       
        timerHandler();
    }
    if(main.classList.contains('pause')) {
        gameField.setStep(1);
        gameField.setRafId(requestAnimationFrame(() => gameField.render())); 
        timerId = setInterval(timerStart, 1000);
        gameField.setTimerId(timerId);
        main.classList.remove('pause');
        main.classList.add('playing');
    }
}

function gameClickHandler(e) {
    let target = e.target;
    if(target.classList.contains('play-btn')) {
        sound.playAlert();
        playBtnHandler();    
        countHandler();
    }

    if(target.classList.contains('pause-btn')) {
        sound.playAlert();
        gameField.setStep(0);
    }

    if(target.classList.contains('retry-btn')) {
        sound.playBackground();
        sound.playAlert();
        main.dataset.result = '';
        main.classList.remove('end');
        playBtnHandler();    
        countHandler();
    }

}

 function init() {
     gameField.init();
     gameField.generateField();
    main.addEventListener('click',gameClickHandler);
    window.addEventListener('resize', () => {
        location.reload();
    });
    
    window.addEventListener('load', () => {
        document.querySelector('.loading-stroke').style.animationIterationCount = '1';
        
    })

    window.addEventListener('orientationchange', () => {
        gameField.init();
        gameField.generateField();
    })

    document.querySelector('.loading-stroke').addEventListener('animationend', () => {
        document.body.classList.remove('before-load');
    });
    document.querySelector('.loading').addEventListener('transitionend', (e) => {
        document.body.removeChild(e.currentTarget);
        sound.playBackground();
    })
    
 }
 init();
 
})();