"use strict";

var holder = document.getElementById('allmaps');
var ij = 1;

while (ij < 27) {
  var div = document.createElement('tr');
  div.innerHTML = "\n    <a href=\"./index.html?map".concat(ij, "\">\n      <h2 >Map ").concat(ij, "</h2>\n      <img src=\"images/map").concat(ij, ".png\" height='150px' alt=\"image of map ").concat(ij, "\">\n    </a>\n  ");
  console.log("map" + ij);

  if (localStorage.getItem("map" + ij) != null) {
    // finished it
    div.innerHTML += "\n      <h3 style=\"color: green\">Completed in ".concat(localStorage.getItem("map" + ij), " sec</h3>\n    "); // div.style.backgroundColor = 'green';
  } else {
    div.innerHTML += "\n    <h3 style=\"color: black\">hi</h3>\n  ";
  }

  div.style["float"] = 'left';
  div.style.width = '17%';
  div.style.marginLeft = '5.5%';
  document.body.appendChild(div);
  ij += 1;
}