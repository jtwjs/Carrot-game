import GameBuilder from './game.js';
import * as sound from './sound.js';

(() => {
 const game = new GameBuilder()
    .withGameDuration(5)
    .withBugCount(20)
    .withCarrotCount(10)
    .build();


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