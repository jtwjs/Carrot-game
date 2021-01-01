'use strict';
(() => {
    console.log(innerHeight);
    const timerElm = document.querySelector('.timer');
    const shoppingListElm = document.querySelector('.shopping-list');
    const inputElm = document.querySelector('.shopping-input');
    const addBtn = document.querySelector('.add-btn');
    const SHOP_LS = "shoppingList";
    let shoppingList = [];

    function currentTime() {
        const time = new Date();
        const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        const min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        
        timerElm.textContent = `${hour}:${min}`;
    }

    function deleteItem(elm) {
        const targetId = parseInt(elm.parentNode.id);
        shoppingList = shoppingList.filter(item => 
            item.id !== targetId
        );
        saveItem();
        shoppingListElm.removeChild(elm.parentNode);
    }

    function saveItem() {
        localStorage.setItem(SHOP_LS, JSON.stringify(shoppingList));
    }

    function paintItem(value) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');
        const i = document.createElement('i');
        const newId = shoppingList.length + 1;
        li.id = newId;
        li.classList.add('shopping-item');
        span.textContent = value;
        i.setAttribute('class', 'far fa-trash-alt');
        button.classList.add('del-btn');
        button.appendChild(i);
        li.appendChild(span);
        li.appendChild(button);
        shoppingListElm.appendChild(li);
        const listObj = {
            text: value,
            id: newId,
        }
        shoppingList.push(listObj);
        saveItem();
    }
    function submitHandler() {
        paintItem(inputElm.value);
        inputElm.value = '';
        addBtn.classList.remove('active');
    }
    function loadList() {
        const loadedList = localStorage.getItem(SHOP_LS);
        if(loadedList !== null) {
            const parseList = JSON.parse(loadedList);
            parseList.forEach(item => {
                paintItem(item.text);
            });
        }
    }

    function init() {
        loadList();
        inputElm.addEventListener('input', (e) => {
            if(e.currentTarget.value) {
                addBtn.classList.add('active');
            } else {
                addBtn.classList.remove('active');
            }
        });
        inputElm.addEventListener('keydown', (e) => {
            if(e.code === 'Enter') {
                submitHandler();
            }
        })
        addBtn.addEventListener('click', (e) => {
            if(e.currentTarget.classList.contains('active')) {
                submitHandler();
            }
        });
        shoppingListElm.addEventListener('click',(e) => {
            let target = e.target;
            
            if(target.classList.contains('del-btn')) {
                deleteItem(target);
            }

        })
    }
    setInterval(currentTime,1000);
    init();
})();