/*----- constants -----*/
const COLORS = {
    "0": "white",
    "1": "blue",
    "-1": "red",
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
// board reset
const resetButton = document.querySelector("button");
const markerEls = [...document.querySelectorAll("#board > div")];


/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", positionSelect);
resetButton.addEventListener("click", init)


/*----- functions -----*/
init()

function init() {
    board = [0,0,0,0,0,0,0,0,0]
    turn = 1;
    winner = null;
    render();
}

function positionSelect (event) {

    const Idx = event.target.id;
    if (board[Idx] !== 0 || winner) return;
    board[Idx] = turn;
    turn *= -1;

    // winner = getWinner();
    render();
}

function render() {
    renderBoard();
    renderMessage();
    renderMessage();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
      //iterate over the cells and cur column [calArr]
      colArr.forEach(function(cellVal, rowIdx) {
        const cellId = `c${colIdx}r${rowIdx}`;
        const cellEl = document.getElementById(cellId); //cellId gets the div. we can use that to innerText
        cellEl.style.backgroundColor = COLORS[cellVal]; //cellVal 0 1 -1 LETTERS[cellVal]
        //shouldn't this work like adding color? 
        cellEl.innerHTML = LETTERS[cellVal]; 
      });  
    });
  }
  
  function renderMessage() {
  if (winner === 'T') { 
    messageEl.innerText = "You have tied.";
  } else if (winner) { 
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${LETTERS[winner]}</span> Wins`; 
  } else {
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${LETTERS[turn]}</span>'s Turn'`; 
  }
  }
  
  function renderControls() {
   playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
  }
  
  // squareEls[6] needs to equal board[0][0]
  //click on <div#c0r0> =  board[0][0] = changes to 1 / -1 = marks x / o = evalautes for win = win || or next move = change player = player clicks the cycle continues till win or tie. 