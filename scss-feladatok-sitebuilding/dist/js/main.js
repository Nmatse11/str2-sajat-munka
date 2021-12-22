import {clickHandler, closeClick, outsideClick, closeEvent} from "./modal.js";

'use strict';

const navbar = document.querySelector('.nav');
const link = document.querySelector('.nav__link');
const startLinks = document.querySelectorAll('.nav__button');

window.onscroll = () => {
 if (screen.width > 768) {
    if (window.scrollY > 0) {
      for (let i = 0; i < startLinks.length; i++) {
        startLinks[i].classList.remove('nav__button')
        startLinks[i].classList.add('nav__button-active')}
        link.classList.remove('nav__link');
        link.classList.add('nav__link-active');
        navbar.classList.remove('nav-default');
        navbar.classList.add('nav-active');
    } else {
      navbar.classList.remove('nav-active');
      navbar.classList.add('nav-default');
      link.classList.remove('nav__link-active');
      link.classList.add('nav__link');
      for (let i = 0; i < startLinks.length; i++) {
        startLinks[i].classList.remove('nav__button-active')
        startLinks[i].classList.add('nav__button')
    }
  }}
  else {
    mobilMenu()
  }
};

const mobilMenu = () => {
    for (let i = 0; i < startLinks.length; i++) {
      startLinks[i].classList.remove('nav__button')
      startLinks[i].classList.add('nav__button-active')}
      navbar.classList.remove('nav-default');
      navbar.classList.add('nav-active');
      link.classList.remove('nav__link-active');
      link.classList.add('nav__link');
}

const desktopMenu = () => {
  for (let i = 0; i < startLinks.length; i++) {
    startLinks[i].classList.remove('nav__button-active')
    startLinks[i].classList.add('nav__button')}
    navbar.classList.remove('nav-active');
    navbar.classList.add('nav-default');
    link.classList.add('nav__link');
}

window.onload = () => {
  clickHandler();
  closeEvent();
  closeClick();
  if (screen.width < 768) {
  mobilMenu()} else {desktopMenu()}
}; 

window.addEventListener('click', outsideClick);
