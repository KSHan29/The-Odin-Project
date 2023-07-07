const moves = ["rock", "paper", "scissors"];
let countPlayer = 0;
let countComputer = 0;
const toWin = 3;
const resultsText = document.querySelector(".results-text");
const score = document.querySelector(".score");
const titleGif = document.querySelector(".title-gif");

function gameEnded() {
  if (countComputer >= toWin) {
    titleGif.src = "./Images/cat-win.png";
    return "Computer has won!";
  }

  if (countPlayer >= toWin) {
    titleGif.src = "./Images/cat-lose.png";
    return "Player has won!";
  }

  return "";
}

function getComputerChoice() {
  const rand = Math.floor(Math.random() * 3);
  return rand;
}

function parseMove(playerMove) {
  return moves.indexOf(playerMove.toLowerCase());
}

function playRound(playerMove, computerMove) {
  console.log(playerMove, computerMove);
  if (playerMove == computerMove) {
    return 0;
  }

  if (playerMove - computerMove == 1) {
    return 1;
  }

  if (playerMove == 0 && computerMove == 2) {
    return 1;
  }

  return -1;
}

function tabulatePoints(roundResults) {
  if (roundResults == 0) {
    resultsText.textContent = "This round is a draw!";
    return;
  }

  if (roundResults > 0) {
    countPlayer++;
    if (countPlayer < toWin) {
      resultsText.textContent = "Player has won this round!";
    }
  } else if (roundResults < 0) {
    countComputer++;
    if (countComputer < toWin) {
      resultsText.textContent = "Computer has won this round!";
    }
  }

  score.textContent = `${countPlayer} - ${countComputer}`;
}

function handleClick(playerMove) {
  if (parseMove == -1) {
    return;
  }

  const roundResults = playRound(parseMove(playerMove), getComputerChoice());
  console.log(roundResults);
  tabulatePoints(roundResults);

  const gameResults = gameEnded();

  if (gameResults != "") {
    resultsText.textContent =
      gameResults + "\nClick below to start a new game!";

    // remove all event listeners
    var old_element = document.querySelector(".options");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);

    newGame();
  }
}

function init() {
  countPlayer = 0;
  countComputer = 0;

  score.textContent = "0 - 0";
  resultsText.textContent = "Your move!";
  titleGif.src = "./Images/cat-fight.gif";
  // add all event listeners
  document.querySelectorAll(".option-image").forEach((e) =>
    e.addEventListener("click", (e) => {
      handleClick(e.target.name);
    })
  );
}

function newGame() {
  const results = document.querySelector(".results");
  let btn = document.createElement("button");
  btn.classList.add("new-game");
  btn.textContent = "New game";
  results.appendChild(btn);
  btn.addEventListener("click", (e) => {
    init();
    btn.remove();
  });
}

init();
