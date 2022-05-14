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
