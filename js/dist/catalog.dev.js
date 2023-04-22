"use strict";

var holder = document.getElementById('allmaps'); // document.body.innerHTML += "<div><h2>Medium</h2></div>";

var ij = 1;

while (ij < 33) {
  var div = document.createElement('tr');
  div.innerHTML = "\n    <a href=\"./index.html?map".concat(ij, "\">\n      <h2 >Map ").concat(ij, "</h2>\n      <img src=\"images/m").concat(ij, ".png\" height='150px' alt=\"image of map ").concat(ij, "\">\n    </a>\n  ");
  console.log("map" + ij);

  if (localStorage.getItem("map" + ij) != null) {
    // finished it
    div.innerHTML += "\n      <h3 class='chroma'>Completed in ".concat(localStorage.getItem("map" + ij), " sec</h3>\n    "); // div.style.backgroundColor = 'green';
  } else {
    div.innerHTML += "\n    <h3 style=\"color: black\">\u2022</h3>\n  ";
  }

  div.style["float"] = 'left';
  div.style.width = '17%';
  div.style.marginLeft = '5.5%';

  if (ij < 5 || ij > 12 && ij < 17 || ij > 24 && ij < 29) {
    div.style.marginTop = '66px';
  }

  if (ij == 1) {
    document.getElementById('easy').style.top = div.offsetTop + div.style.marginTop + 10 + 'px';
    document.getElementById('easy').style.left = '5.5%';
  }

  if (ij == 13) {
    document.getElementById('medium').style.top = 200 * 4 + 66 * 2 + 10 + 'px';
    document.getElementById('medium').style.left = '5.5%';
  }

  if (ij == 25) {
    document.getElementById('hard').style.top = 200 * 8 + 66 * 3 + 10 + 'px';
    document.getElementById('hard').style.left = '5.5%';
  }

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