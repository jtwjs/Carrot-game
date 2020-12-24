(() => {
    const sizeValueElemList = document.querySelectorAll('.sizeValue');


    function setSize() {
        const arr = Array.from(sizeValueElemList);
        let valueList = [ {
            width: window.screen.width,
            height: window.screen.height,
        },{
            width: window.outerWidth,
            height: window.outerHeight,
        }, {
            width: window.innerWidth,
            height: window.innerHeight,
        }, {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
        ];
        for(const idx in arr) {
            arr[idx].innerText = `${valueList[idx].width}, ${valueList[idx].height}`;
            
        }
    }

    window.addEventListener('resize', () => {
        setSize();
    });

    window.addEventListener('DOMContentLoaded', () => {
        setSize();
    });
})();