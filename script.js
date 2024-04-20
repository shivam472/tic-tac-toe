/*
Write a program that allows two players to play a game of Tic-Tac-Toe on the command line. The program should display the current state of the game and ask each player to enter their moves alternately. It should check for a winning condition or a draw and declare the result.*/

const boxArr = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]

const containerElement = document.querySelector('.container');

let currentPlayingUser = 0;
let numberOfBoxesFilled = 0;
let winnerDecided = false;

for (let i = 0; i < boxArr.length; i++) {
  const row = boxArr[i];
  const rowContainer = document.createElement('div');
  for (let j = 0; j < row.length; j++) {
    rowContainer.className = 'row';
    const box = document.createElement('div');
    box.innerText = row[j];
    box.className = 'box';
    box.id = `${i}-${j}`
    box.addEventListener('click', () => handleBoxClick(i, j))
    rowContainer.appendChild(box);
  }

  containerElement.appendChild(rowContainer);
}

const map = {
  row0: "",
  row1: "",
  row2: "",
  col0: "",
  col1: "",
  col2: "",
  diagonal1: "",
  diagonal2: "",
}

function handleBoxClick(row, column) {
  if (winnerDecided) return;

  const clickedBox = document.getElementById(`${row}-${column}`);
  if (clickedBox.innerText === "") {
    if (currentPlayingUser === 0) {
      clickedBox.innerText = "X";
      currentPlayingUser = 1;

      map[`row${row}`] += "X"
      map[`col${column}`] += "X"

      handleDiagonal(row, column, 'X');
    }
    else {
      clickedBox.innerText = "0"
      currentPlayingUser = 0;

      map[`row${row}`] += "0"
      map[`col${column}`] += "0"

      handleDiagonal(row, column, '0');
    }
    numberOfBoxesFilled += 1;
    setTimeout(() => checkWinner(), 1000);
  }

}


function handleDiagonal(row, column, state) {
  if ((row === 0 && column === 0) || (row === 1 && column === 1) || (row === 2 && column === 2)) {
    map[`diagonal1`] += state
  }

  // for diagonal 2
  if ((row === 0 && column === 2) || (row === 1 && column === 1) || (row === 2 && column === 0)) {
    map[`diagonal2`] += state
  }
}

function checkWinner() {
  // console.log(map);
  const mapValues = Object.values(map)
  for (let i = 0; i < mapValues.length; i++) {
    const value = mapValues[i];
    if (value === 'XXX') {
      console.log('User 1 is the winner!')
      winnerDecided = true;
      return;
    }
    else if (value === '000') {
      console.log('User 2 is the winner!')
      winnerDecided = true;
      return;
    }
  }

  if (numberOfBoxesFilled === 9)
    console.log("it's a Draw!");
}


// diagonal: 
// (0, 0), (1, 1), (2, 2)
// (0, 2), (1, 1), (2, 0)

// row:
// (0, 0), (0, 1), (0, 2)
// (1, 0), (1, 1), (1, 2)
// (2, 0), (2, 1), (2, 2)

// column:
// (0, 0), (1, 0), (2, 0)
// (0, 1), (1, 1), (2, 1)
// (0, 2), (1, 2), (2, 2)