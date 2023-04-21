"use strict";

var holder = document.getElementById('allmaps');
var ij = 1;

while (ij < 33) {
  var div = document.createElement('tr');
  div.innerHTML = "\n    <a href=\"./index.html?map".concat(ij, "\">\n      <h2 >Map ").concat(ij, "</h2>\n      <img src=\"images/map").concat(ij, ".png\" height='150px' alt=\"image of map ").concat(ij, "\">\n    </a>\n  ");
  console.log("map" + ij);

  if (localStorage.getItem("map" + ij) != null) {
    // finished it
    div.innerHTML += "\n      <h3 style=\"color: lightgreen\">Completed in ".concat(localStorage.getItem("map" + ij), " sec</h3>\n    "); // div.style.backgroundColor = 'green';
  } else {
    div.innerHTML += "\n    <h3 style=\"color: black\">\u2022</h3>\n  ";
  }

  div.style["float"] = 'left';
  div.style.width = '17%';
  div.style.marginLeft = '5.5%';
  document.body.appendChild(div);
  ij += 1;
}

function openwelcome() {
  document.getElementById('welcome').style.display = 'block';
  document.getElementById('fullcover').style.display = 'block';
} // is this the users first time


var us = localStorage.getItem('inkballname');

if (us == null) {
  // then its the first time
  // set the name as the default
  localStorage.setItem('inkballname', 'player'); // launch the welcome dialogue

  openwelcome();
}