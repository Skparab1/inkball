"use strict";

function mouse_position() {
  var e = window.event;
  var posX = e.clientX;
  var posY = e.clientY;
  mousepos = [posX, posY - pushdown]; //console.log(mousetrail);

  if (mousedown) {
    addpoint(); //console.log(mousetrail);
  }
}