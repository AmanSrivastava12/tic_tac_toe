"use strict";
document.onkeypress = function (evt) {
  evt = evt || window.event;
  var modal = document.getElementsByClassName("modal")[0];
  if (evt.keyCode === 27) {
    modal.style.display = "none";
  }
};

window.onclick = function (evt) {
  var modal = document.getElementsByClassName("modal")[0];
  if (evt.target === modal) {
    modal.style.display = "none";
  }
};

function sumArray(array) {
  var sum = 0,
    i = 0;
  for (i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

function isInArray(element, array) {
  if (array.indexOf(element) > -1) {
    return true;
  }
  return false;
}
function shuffleArray(array) {
  var counter = array.length,
    temp,
    index;
  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function intRandom(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var moves = 0,
  winner = 0,
  x = 1,
  o = 3,
  player = x,
  computer = o,
  whoseTurn = x,
  gameOver = false,
  score = {
    ties: 0,
    player: 0,
    computer: 0,
  },
  xText = '<span class="x">&times;</class>',
  oText = '<span class="o">o</class>',
  playerText = xText,
  computerText = oText,
  difficulty = 1,
  myGrid = null;

function Grid() {
  this.cells = new Array(9);
}

Grid.prototype.getFreeCellIndices = function () {
  var i = 0,
    resultArray = [];
  for (i = 0; i < this.cells.length; i++) {
    if (this.cells[i] === 0) {
      resultArray.push(i);
    }
  }
  return resultArray;
};

Grid.prototype.getRowValues = function (index) {
  if (index !== 0 && index !== 1 && index !== 2) {
    console.error("Wrong arg for getRowValues!");
    return undefined;
  }
  var i = index * 3;
  return this.cells.slice(i, i + 3);
};

Grid.prototype.getRowIndices = function (index) {
  if (index !== 0 && index !== 1 && index !== 2) {
    console.error("Wrong arg for getRowIndices!");
    return undefined;
  }
  var row = [];
  index = index * 3;
  row.push(index);
  row.push(index + 1);
  row.push(index + 2);
  return row;
};

Grid.prototype.getColumnValues = function (index) {
  if (index !== 0 && index !== 1 && index !== 2) {
    console.error("Wrong arg for getColumnValues!");
    return undefined;
  }
  var i,
    column = [];
  for (i = index; i < this.cells.length; i += 3) {
    column.push(this.cells[i]);
  }
  return column;
};

Grid.prototype.getColumnIndices = function (index) {
  if (index !== 0 && index !== 1 && index !== 2) {
    console.error("Wrong arg for getColumnIndices!");
    return undefined;
  }
  var i,
    column = [];
  for (i = index; i < this.cells.length; i += 3) {
    column.push(i);
  }
  return column;
};

Grid.prototype.getDiagValues = function (arg) {
  var cells = [];
  if (arg !== 1 && arg !== 0) {
    console.error("Wrong arg for getDiagValues!");
    return undefined;
  } else if (arg === 0) {
    cells.push(this.cells[0]);
    cells.push(this.cells[4]);
    cells.push(this.cells[8]);
  } else {
    cells.push(this.cells[2]);
    cells.push(this.cells[4]);
    cells.push(this.cells[6]);
  }
  return cells;
};
Grid.prototype.getDiagIndices = function (arg) {
  if (arg !== 1 && arg !== 0) {
    console.error("Wrong arg for getDiagIndices!");
    return undefined;
  } else if (arg === 0) {
    return [0, 4, 8];
  } else {
    return [2, 4, 6];
  }
};

Grid.prototype.getFirstWithTwoInARow = function (agent) {
  if (agent !== computer && agent !== player) {
    console.error(
      "Function getFirstWithTwoInARow accepts only player or computer as argument."
    );
    return undefined;
  }
  var sum = agent * 2,
    freeCells = shuffleArray(this.getFreeCellIndices());
  for (var i = 0; i < freeCells.length; i++) {
    for (var j = 0; j < 3; j++) {
      var rowV = this.getRowValues(j);
      var rowI = this.getRowIndices(j);
      var colV = this.getColumnValues(j);
      var colI = this.getColumnIndices(j);
      if (sumArray(rowV) == sum && isInArray(freeCells[i], rowI)) {
        return freeCells[i];
      } else if (sumArray(colV) == sum && isInArray(freeCells[i], colI)) {
        return freeCells[i];
      }
    }
    for (j = 0; j < 2; j++) {
      var diagV = this.getDiagValues(j);
      var diagI = this.getDiagIndices(j);
      if (sumArray(diagV) == sum && isInArray(freeCells[i], diagI)) {
        return freeCells[i];
      }
    }
  }
  return false;
};

Grid.prototype.reset = function () {
  for (var i = 0; i < this.cells.length; i++) {
    this.cells[i] = 0;
  }
  return true;
};

function initialize() {
  myGrid = new Grid();
  moves = 0;
  winner = 0;
  gameOver = false;
  whoseTurn = player;
  for (var i = 0; i <= myGrid.cells.length - 1; i++) {
    myGrid.cells[i] = 0;
  }
  setTimeout(showOptions, 500);
}

function assignRoles() {
  askUser("Do you want to go first?");
  document.getElementById("yesBtn").addEventListener("click", makePlayerX);
  document.getElementById("noBtn").addEventListener("click", makePlayerO);
}
function makePlayerX() {
  player = x;
  computer = o;
  whoseTurn = player;
  playerText = xText;
  computerText = oText;
  document.getElementById("userFeedback").style.display = "none";
  document.getElementById("yesBtn").removeEventListener("click", makePlayerX);
  document.getElementById("noBtn").removeEventListener("click", makePlayerO);
}

function makePlayerO() {
  player = o;
  computer = x;
  whoseTurn = computer;
  playerText = oText;
  computerText = xText;
  setTimeout(makeComputerMove, 400);
  document.getElementById("userFeedback").style.display = "none";
  document.getElementById("yesBtn").removeEventListener("click", makePlayerX);
  document.getElementById("noBtn").removeEventListener("click", makePlayerO);
}

function cellClicked(id) {
  var idName = id.toString();
  var cell = parseInt(idName[idName.length - 1]);
  if (myGrid.cells[cell] > 0 || whoseTurn !== player || gameOver) {
    return false;
  }
  moves += 1;
  document.getElementById(id).innerHTML = playerText;
  var rand = Math.random();
  if (rand < 0.3) {
    document.getElementById(id).style.transform = "rotate(180deg)";
  } else if (rand > 0.6) {
    document.getElementById(id).style.transform = "rotate(90deg)";
  }
  document.getElementById(id).style.cursor = "default";
  myGrid.cells[cell] = player;
  if (moves >= 5) {
    winner = checkWin();
  }
  if (winner === 0) {
    whoseTurn = computer;
    makeComputerMove();
  }
  return true;
}

function restartGame(ask) {
  if (moves > 0) {
    var response = confirm("Are you sure you want to start over?");
    if (response === false) {
      return;
    }
  }
  gameOver = false;
  moves = 0;
  winner = 0;
  whoseTurn = x;
  myGrid.reset();
  for (var i = 0; i <= 8; i++) {
    var id = "cell" + i.toString();
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).style.cursor = "pointer";
    document.getElementById(id).classList.remove("win-color");
  }
  if (ask === true) {
    setTimeout(showOptions, 200);
  } else if (whoseTurn == computer) {
    setTimeout(makeComputerMove, 800);
  }
}
