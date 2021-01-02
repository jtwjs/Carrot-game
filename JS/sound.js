const carrotSound = new Audio('./assets/sound/carrot_pull.mp3');
 const alertSound = new Audio('./assets/sound/alert.wav');
 const bgSound = new Audio('./assets/sound/bg.mp3');
 const bugSound = new Audio('./assets/sound/bug_pull.mp3');
 const winSound = new Audio('./assets/sound/game_win.mp3'); 

export function playCarrot() {   
    playSound(carrotSound);
}
export function playAlert() {   
    playSound(alertSound);
}
export function playBackground() {   
    playSound(bgSound);
}
export function stopBackground() {
    stopSound(bgSound);
    
}
export function playWin() {   
    playSound(winSound);
}
export function playBug() {   
    playSound(bugSound);
}
export function stopBg() {

}

 function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}