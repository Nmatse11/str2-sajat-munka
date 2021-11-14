'use strict';
import board from "./board.js";
import images from "./images.js";
let cards = []

let steps = 0;
let counter = document.querySelector(".counter");
let second = 0;
let minute = 0;
let minuteTimer = document.querySelector(".minute");
let secondTimer = document.querySelector(".second");
let interval;


const resetTimer = () => {
  second = 0;
  minute = 0; 
  minuteTimer.innerHTML = "0";
  secondTimer.innerHTML = "0";
}

const deleteStep = () => {
  steps = 0;
  counter.innerHTML = "0";
};
  
const startTimer = () => {
interval = setInterval(function(){
  minuteTimer.innerHTML = minute;
  secondTimer.innerHTML = second;
  second++;
    if (second == 60){
      minute++;
      second=0;
    }}, 1000)
  }

 
window.onload = () => {
    board(cards)
    resetTimer()
    clickHandler()
};


const stepCounter = () => {
  if (matchedCards.length < 10)
  steps += 1,
  counter.innerHTML = steps;
  else {counter.innerHTML = steps}
};

let openedCards = []   
let openedImages = []   
let matchedCards = []
const pairOfCards = () => {
  if (openedImages.length == 2 && openedImages[0] == openedImages[1]) {
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].firstChild.classList.contains("card-flip")) {
        cards[i].firstChild.classList.add("card-match")
        cards[i].firstChild.classList.remove("card-flip")
        matchedCards.push(cards[i].firstChild),
        openedImages = [],
        openedCards = []}}}
  if (openedCards.length == 2 && openedImages[0] != openedImages[1]) { 
      for (let i = 0; i < cards.length; i++) {
      if (cards[i].classList.contains("card-back") && cards[i].firstChild.classList.contains("card-flip")) {
        setTimeout (function () {
        cards[i].classList.remove("card-back"),
        cards[i].classList.add("card-front"),
        cards[i].firstChild.setAttribute('class', 'card-img'),
          openedImages = [],
          openedCards = []}, 600)}
        }}
endGame()
};

const clickHandler = () => {
  cards.forEach (function(element) {
    element.addEventListener ('click', function () {
        stepCounter();
        if(steps == 1){startTimer()}
        if (element.classList.contains("card-front") && openedCards.length <= 1) {
            element.classList.remove("card-front"),
            element.classList.add("card-back"),
            element.firstChild.setAttribute('class', 'card-flip'),
            openedCards.push(element),
            openedImages.push(element.firstChild.getAttribute('src')),
            pairOfCards()}
         })
    });
}

const endGame = () => {
  if (matchedCards.length == images.length) {
    clearInterval(interval)
    document.getElementById("congratulation").innerHTML = 'Congratulation you won!';
  setTimeout( function() {
    document.querySelector(".game").innerHTML = ''
    document.getElementById("congratulation").innerHTML = '';
    resetTimer()
    deleteStep()
    matchedCards = []
    board(cards)
    clickHandler()
  }, 5000)
}}

