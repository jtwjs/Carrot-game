(() => {
    const buttonList = document.querySelector('.button-list');
    const speicalElm = document.querySelector('.special');

    buttonList.addEventListener('click', (e) => {
        const target = e.target;
        switch(target.dataset.category) {
            case 'scrollBy': 
                window.scrollBy({top: 100,behavior:'smooth'}); 
                break;
            case 'scrollTo': 
                window.scrollTo({top: 0,behavior:'smooth'});
                break;
            case 'special': 
                speicalElm.scrollIntoView({behavior:'smooth'});
                break;
        }
    });
})();