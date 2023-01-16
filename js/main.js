/*----- constants -----*/
const COLORS = {
    "0": "white",
    "1": "#0b4b9f",
    "-1": "gold",
}

const LETTERS = {
    "0": "",
    "1": "X",
    "-1": "O",
}

/*----- state variables -----*/
let board;
let turn;
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const resetButton = document.querySelector("button");


/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", squareSelect);
resetButton.addEventListener("click", init);


/*----- functions -----*/
init()

function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = null;
    render();
    resetButton.style.visibility = "hidden";
}

function squareSelect (event) {

    const idx = event.target.id;
    console.log(idx);
    if (board[idx] !== 0 || winner) return;
    board[idx] = turn;
    turn *= -1;

   winner = getWinner();
    render();
}

function getWinner() {
    
    // checking for ties
    let emptySpaces = 0;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) emptySpaces++;
    }
    if (emptySpaces === 0) {
        winner = "T";
        return winner;
    }

    // check for horizontal
    for (let i = 0; i <= 6; i +=3) {
        if (board[i] + board[i + 1] + board[i + 2] === 3) {
            return 1;
        } else if (board[i] + board[i + 1] + board[i + 2] === -3) {
            return -1;
        }
    }

    // check for vertical
    for (let i = 0; i <= 2; i++) {
        if (board[i] + board[i + 3] + board[i + 6] === 3) {
            return 1;
        } else if (board[i] + board[i + 3] + board[i + 6] === -3) {
            return -1;
        }
    }

    // check for diagonals
    if (board[0] + board[4] + board[8] === 3) {
        return 1;
      } else if (board[0] + board[4] + board[8] === -3) {
        return -1;
      }else if(board[2] + board[4] + board[6] === 3) {
        return 1;
      } else if (board[2] + board[4] + board[6] === -3) {
        return -1;
      }
      return null;
  }

function render() {
    renderBoard();
    renderMessage();
}

function renderBoard() { 
  //iterate over the cells
  board.forEach(function (cellVal, boardArr) {
    const cellId = `${boardArr}`;
    const cellEl = document.getElementById(cellId);
    cellEl.style.backgroundColor = COLORS[cellVal];
    cellEl.innerHTML = LETTERS[cellVal];
  });
}


  function renderMessage() {

  if (winner === "T") {
    messageEl.innerText = "It's a Tie!!!";
    resetButton.style.visibility = "visible";
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${LETTERS[
      winner
    ].toUpperCase()}</span> Wins!`;
    resetButton.style.visibility = "visible";
  } else {
    // Game is in play
    resetButton.style.visibility = "hidden";
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${LETTERS[
      turn
    ].toUpperCase()}</span>'s Turn`;
  }
}