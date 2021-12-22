import titles from './modal-titles.js';
import texts from './modal-texts.js';

'use strict';

const modalBtn = document.querySelectorAll('#modalbtn');
const modalHeader = document.querySelector('.modal-header');
const modalBody = document.querySelector('.modal-content');

const clickHandler = () => {
  for (let i = 0; i < modalBtn.length; i++) {
    modalBtn[i].addEventListener ('click', function () {
    modalHeader.textContent = '';
    modalBody.textContent = '';
    const h1 = document.createElement("h1");
    h1.textContent = `${titles[i]}`;
    modalHeader.appendChild(h1);
    const p = document.createElement("p");
    p.textContent = `${texts[i]}`;
    modalBody.appendChild(p);

    modal.classList.add("animation-open");
    modal.style.display = "block";
    modalPage.style.display = "block";
    setTimeout (function () {
    modal.classList.remove("animation-open");
    }, 1500);
    })
  }
}

let modalPage = document.querySelector(".modal__page");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelectorAll(".close-btn")

const closeClick = () => {
   modal.classList.add("animation-close");
   setTimeout (function () {
       modal.style.display = "none";
       modalPage.style.display = "none";
       modal.classList.remove("animation-close");
   }, 1250);
  }

const closeEvent = () => {
  closeBtn.forEach (function(element) {
  element.addEventListener ('click', closeClick)
})
};

function outsideClick(event) {
  if (event.target == modalPage) {
      modal.style.display = 'none';
      modalPage.style.display = 'none';
  }
}

export {clickHandler, closeClick, outsideClick, closeEvent};

