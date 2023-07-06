const moves = ["rock", "paper", "scissors"];
function getComputerChoice() {
  const rand = Math.floor(Math.random() * 3);
  return rand;
}

function parseMove(playerMove) {
  return moves.indexOf(playerMove.toLowerCase());
}

function playRound(playerMove, computerMove) {
  if (playerMove == computerMove) {
    return 0;
  }

  if (playerMove > computerMove && computerMove != 0) {
    return 1;
  }

  if (playerMove == 0 && computerMove == 2) {
    return 1;
  }

  return -1;
}

function game() {
  let countPlayer = 0;
  let countComputer = 0;

  while (true) {
    if (countPlayer > 2) {
      console.log("Player has won!");
      break;
    }

    if (countComputer > 2) {
      console.log("Computer has won!");
      break;
    }

    let playerMove;
    do {
      playerMove = parseMove(
        prompt("Choose rock, paper, or scissors (Case insensitive)")
      );
    } while (playerMove == -1);

    const res = playRound(playerMove, getComputerChoice());

    if (res > 0) {
      console.log("Player won this round!");
      countPlayer++;
    } else if (res < 0) {
      console.log("Computer won this round!");
      countComputer++;
    } else {
      console.log("This round was a draw!");
    }
  }
}

game();
