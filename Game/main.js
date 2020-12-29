(() => {
 const main = document.querySelector('#main');
 const timerElm = document.querySelector('.timer-text');
 const countElm = document.querySelector('.count-text');
 let count;
 let sec;
let timerId;
let playState = false;
function timerStart() {
    timerElm.textContent = `00:${--sec < 10 ? '0'+sec : sec}`;
    if(sec === 0) {
        clearInterval(timerId);
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

function playBtnHandler() {
    if(!playState) {
        playState = true;
        main.classList.add('playing');
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
 }

 init();
})();