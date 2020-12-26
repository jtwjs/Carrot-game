(() => {
    const svgEyeElm = document.querySelector('.svg-mon');
    const eyePoint = document.querySelector('.eye-point');
    const svgTextX = document.querySelector('.text-x');
    const svgTextY = document.querySelector('.text-y');

    const targetPos = {
        x: 0,
        y: 0,
    };
    const easeValue = 0.05;
    const eyeInfo = {
        x: 0,
        y: 0,
    };
    const EYE_POS = 30;
    let rafId;
    let rafState = false;

    window.addEventListener('mousemove', (e) => {
        targetPos.x = e.clientX - window.innerWidth * 0.5;
        targetPos.y = e.clientY - window.innerHeight * 0.5;
        svgTextX.textContent = `x: ${e.clientX}`;
        svgTextY.textContent = `y: ${e.clientY}`;
        if(!rafState) {
            rafId = requestAnimationFrame(render);
            rafState = true;
        }
    });

    let dx;
    let dy;
    function render() {
        dx = targetPos.x - eyeInfo.x;
        dy = targetPos.y - eyeInfo.y;
        eyeInfo.x = eyeInfo.x + dx * easeValue;
        eyeInfo.y = eyeInfo.y + dy * easeValue;
        svgEyeElm.style.transform = `translate3d(${eyeInfo.x}px,${eyeInfo.y}px,0)`;
        if(Math.abs(dx) < 1) dx = 0;
        if(Math.abs(dy) < 1) dy = 0;
        const signX = Math.sign(dx);
        const signY = Math.sign(dy);
        const ratio = {
            x:Math.min(1, Math.abs(dx / targetPos.x)),
            y:Math.min(1, Math.abs(dy / targetPos.y)),
        } 
        eyePoint.style.transform = `translate(${EYE_POS*ratio.x*signX}px,${EYE_POS*ratio.y*signY}px)`;
    
        rafId = requestAnimationFrame(render);
        if(signX === 0 && signY ===0) {
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }
    render();
    

})();