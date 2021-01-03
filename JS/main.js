import Game from './game.js';
import * as sound from './sound.js';

(() => {
 const BUG_NUM = 20;
 const CARROT_NUM = 10;
 const TIME_LIMIT = 5;
 const game = new Game(TIME_LIMIT,BUG_NUM,CARROT_NUM);


 function init() {
     game.init();

    window.addEventListener('resize', () => {
        location.reload();
    });
    
    window.addEventListener('load', () => {
        document.querySelector('.loading-stroke').style.animationIterationCount = '1';
        
    })

    window.addEventListener('orientationchange', () => {
        game.init();
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