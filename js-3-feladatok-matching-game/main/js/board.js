'use strict';
import images from "./images.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


function createBoardGame () {
  const boardGameDiv = document.querySelector(".game")
  const div = document.createElement("div")
  if (images.length <= 10) {
    div.setAttribute("class", "gameBoard")}
  else {div.classList.add("gameBoard-more")}
  boardGameDiv.appendChild(div)
  shuffleArray(images)
  for (let i = 0; i < images.length; i++) {
    const span = document.createElement("span")
    if (images.length > 10) {
      span.classList.add("card-more")
    } else
    {span.setAttribute("class", "card")}
    div.appendChild(span);

    for (let j = 0; j < 1; j++) {
      const div = document.createElement("div");
      div.setAttribute("class", "card-inner card-front");
      span.appendChild(div);
      const img = document.createElement("img");
      img.setAttribute('src', `${images[i]}`);
      img.setAttribute('id', 'img');
      img.setAttribute('class', 'image');
      div.appendChild(img)
    }}
}

function init (cards) {
  let card = document.querySelectorAll('.card-inner');
  for (let i = 0; i < card.length; i++) {
  cards.push(card[i])}
}


const board = (cards) => {
  createBoardGame(),
  init(cards)
}

export default board;