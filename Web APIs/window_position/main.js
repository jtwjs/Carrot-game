(() => {
    const specialElm = document.querySelector('.special');
    
    specialElm.addEventListener('click', (e) => {
        const target = e.target;
        const domRect = target.getBoundingClientRect();
        console.log(domRect);
        console.log(`x: ${e.clientX}, y: ${e.clientY}`);
        console.log(`x: ${e.pageX}, y: ${e.pageY}`);

        
    })
})();