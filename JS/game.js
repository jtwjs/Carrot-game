import Field from './field.js';
import * as sound from './sound.js';


export default class gameBuilder {
    withGameDuration(duration) {
         this.gameDuration = duration;
         return this;
    }

    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    withCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration, //
            this.bugCount,
            this.carrotCount
        );
    }
}

class Game {
    constructor(limitTime, bugNum, carrotNum) {
        this.timerElm = document.querySelector('.timer-text');
        this.countElm = document.querySelector('.count-text');
        this.mainElm = document.querySelector('#main');
        this.limitTime = limitTime;
        this.gameField = new Field(bugNum, carrotNum);
        this.timerId;
        this.countId;
        this.count = 10;
        this.sec;
        this.init();
    }

    timerHandler() {
        this.sec = this.limitTime;
        this.timerElm.textContent = `00:${this.sec < 10 ? '0' + this.sec: this.sec}`;
        this.timerId = setInterval(() => this.timerStart(), 1000);
        this.gameField.setTimerId(this.timerId);
    }

    timerStart() {
        this.timerElm.textContent = `00:${--this.sec < 10 ? '0'+this.sec : this.sec}`;
        if(this.sec === 0) {
            this.countElm.textContent = `0`;
            this.gameField.setStep(-1);
            this.gameField.gameEnd();
        }   
    }

    countHandler() {
        this.countId = setInterval(() => this.carrotCount(), 100);
    }

    carrotCount() {
        this.count = this.gameField.getCarrotList().length;
        this.countElm.textContent = `${this.count}`;
        if(this.count === 0) {
            clearInterval(this.countId);
            this.gameField.setStep(2);
        }
    }

    playBtnHandler() {
        if(!this.gameField.getPlayState()) {
            this.gameField.setStep(1);
            this.gameField.setPlayState(true);
            this.mainElm.classList.add('playing');
            this.gameField.generate();
            this.gameField.render();       
            this.timerHandler();
        }
        if(this.mainElm.classList.contains('pause')) {
            this.gameField.setStep(1);
            this.gameField.setRafId(requestAnimationFrame(() => this.gameField.render())); 
            this.timerId = setInterval(() => this.timerStart(), 1000);
            this.gameField.setTimerId(this.timerId);
            this.mainElm.classList.remove('pause');
            this.mainElm.classList.add('playing');
        }
    }

     gameClickHandler(e) {
        let target = e.target;
        if(target.classList.contains('play-btn')) {
            sound.playAlert();
            this.playBtnHandler();    
            this.countHandler();
        }
    
        if(target.classList.contains('pause-btn')) {
            sound.playAlert();
            this.gameField.setStep(0);
        }
    
        if(target.classList.contains('retry-btn')) {
            sound.playBackground();
            sound.playAlert();
            this.mainElm.dataset.result = '';
            this.mainElm.classList.remove('end');
            this.playBtnHandler();    
            this.countHandler();
        }
    }

    init() {
        this.gameField.init();
        this.gameField.generate();
        this.mainElm.addEventListener('click',(e) => {
            this.gameClickHandler(e);
        });
    }

}