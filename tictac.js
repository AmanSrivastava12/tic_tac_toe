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
