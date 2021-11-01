'use strict';

let mark = 'X';
let gameStatus = "Game On";

const cells = document.getElementsByClassName("cell");

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        if (cells[i].innerHTML.trim() == "" && gameStatus == "Game On") {
            cells[i].innerHTML = mark;
            mark = mark == "X" ? "O" : "X";
            document.getElementById("player").innerHTML = mark.toUpperCase();
            
            //lehetséges megoldások
            if (
                //első sor egyforam
                cells[0].innerHTML == cells[1].innerHTML &&
                cells[1].innerHTML == cells[2].innerHTML &&
                cells[0].innerHTML.trim() != ""
              ) {
                endGame();
              } else if (
                //második sor egyforma
                cells[3].innerHTML == cells[4].innerHTML &&
                cells[4].innerHTML == cells[5].innerHTML &&
                cells[3].innerHTML.trim() != ""
              ) {
                endGame();
              } else if (
                //harmadik sor egyforma
                cells[6].innerHTML == cells[7].innerHTML &&
                cells[7].innerHTML == cells[8].innerHTML &&
                cells[6].innerHTML.trim() != ""
              ) {
                endGame();
              } else if (
                //első oszlop egyforma
                cells[0].innerHTML == cells[3].innerHTML &&
                cells[3].innerHTML == cells[6].innerHTML &&
                cells[0].innerHTML.trim() != ""
              ) {
                endGame();
              } else if (
                //második oszlop egyform
                cells[1].innerHTML == cells[4].innerHTML &&
                cells[4].innerHTML == cells[7].innerHTML &&
                cells[7].innerHTML.trim() != ""
              ) {
                endGame();
              } else if (
                //harmadik oszlop egyform
                cells[2].innerHTML == cells[5].innerHTML &&
                cells[5].innerHTML == cells[8].innerHTML &&
                cells[8].innerHTML.trim() != ""
              ) {
                endGame();
              } else if (
                //jobbra lefelé átló egyform
                cells[0].innerHTML == cells[4].innerHTML &&
                cells[4].innerHTML == cells[8].innerHTML &&
                cells[0].innerHTML.trim() != ""
              ) {
                endGame();
            } else if (
                //jobbra felfelé átló egyform
                cells[2].innerHTML == cells[4].innerHTML &&
                cells[4].innerHTML == cells[6].innerHTML &&
                cells[2].innerHTML.trim() != ""
              ) {
                endGame();
              };

        }
    })
};

function endGame() {
    document.getElementById("winner").innerHTML =
    mark == "X" ? "O" : "X";
    document.getElementById("message").style.display = "block"
    gameStatus = "Game Over";
  }

const newGameBtn = document.getElementById("newGame-btn");

newGameBtn.addEventListener("click", function() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
    }
    document.getElementById("message").style.display = "none"
    document.getElementById("player").innerHTML = "X";
    mark = 'X';
    gameStatus = "Game On";
});


