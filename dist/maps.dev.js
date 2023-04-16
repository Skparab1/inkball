"use strict";

var canvas = document.querySelector('.myCanvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

var _byte = 2 * ((window.innerHeight - 100) / (16 * 2.2));

var ballwidth = _byte * 0.75;
var sfactor = _byte / 28.41;
var BLUE = "rgb(3, 161, 252)";
var ORANGE = "rgb(252, 115, 3)";
var GREEN = "rgb(3, 252, 115)";
var GOLD = "rgb(255, 215, 0)"; // default, first map

function getmap1() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [2, 0, 0, 2],
    "dy": [0, 2, 2, 0],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[28, 17], [2, 17]],
    "holecolors": [BLUE, ORANGE],
    "releasepoint": [2.25, 2.25],
    "releasetimes": [500, 1000, 1500, 2000],
    "blocks": [[4, 10], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [17, 6], [18, 6], [19, 6], [18, 6], [19, 6], [20, 6], [21, 6], [22, 6], [23, 6], [24, 6], [25, 6], [26, 6], [27, 6], [28, 6], [29, 6], [11, 11], [11, 12], [11, 13], [11, 17], [11, 18], [26, 11], [26, 12], [26, 13], [26, 14], [26, 15], [26, 16], [26, 17], [26, 18]]
  };
  return map;
} // second map, spiral


function getmap2() {
  var map = {
    "bx": [2, 6, 10, 14],
    "by": [3, 3, 3, 3],
    "dx": [2, 2, 2, 2],
    "dy": [0, 0, 0, 0],
    "clrs": [BLUE, ORANGE, GREEN, BLUE],
    "holecenters": [[7.5, 6.5], [7.5, 12.5], [22.5, 12.5]],
    "holecolors": [BLUE, ORANGE, GREEN],
    "blocks": [[6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [26, 5], [27, 5], [28, 5], [29, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [24, 13], [24, 12], [24, 11], [24, 10], [17, 9], [16, 9], [15, 9], [14, 9], [17, 10], [16, 10], [15, 10], [14, 10]]
  };
  return map;
} // third map, interesting thing


function getmap3() {
  var map = {
    "bx": [28, 2, 28, 2],
    "by": [17, 17, 2, 2],
    "dx": [0, 2, -2, 0],
    "dy": [-2, 0, 0, 2],
    "clrs": [BLUE, ORANGE, GREEN, GOLD],
    "holecenters": [[25.5, 17], [28, 4.5], [4.5, 2], [2, 14.5]],
    "holecolors": [ORANGE, BLUE, GREEN, GOLD],
    "blocks": [[24, 18], [24, 17], [24, 16], [24, 15], [24, 14], [24, 13], [24, 12], [24, 11], [24, 10], [24, 13], [24, 12], [24, 11], [24, 10], [29, 6], [28, 6], [27, 6], [26, 6], [25, 6], [24, 6], [23, 6], [22, 6], [21, 6], [20, 6], [19, 6], [18, 6], [17, 6], [16, 6], [15, 6], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13], [6, 13], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [15, 13], [16, 13], [17, 13], [18, 13], [19, 13], [20, 13]]
  };
  return map;
} // fourth map, 2 blocks 10 balls


function getmap4() {
  var map = {
    "bx": [2, 8, 14, 20, 2, 8, 14, 20],
    "by": [3, 3, 3, 3, 6, 6, 6, 6],
    "dx": [2, 2, 2, 2, 2, 2, 2, 2],
    "dy": [0, 0, 0, 0, 0, 0, 0, 0],
    "clrs": [BLUE, ORANGE, GREEN, GOLD, BLUE, ORANGE, GREEN, GOLD],
    "holecenters": [[2, 17], [11, 17], [20, 17], [28, 17]],
    "holecolors": [ORANGE, BLUE, GREEN, GOLD],
    "blocks": []
  };
  return map;
}

function getmap5() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [2, 2, 2, 2],
    "dy": [0, 0, 0, 0],
    "clrs": [BLUE, ORANGE, GREEN, GOLD],
    "holecenters": [[2, 9.5], [15.5, 17], [28, 9.5], [15.5, 2]],
    "holecolors": [ORANGE, BLUE, GREEN, GOLD],
    "releasepoint": [15.5, 9.5],
    "releasetimes": [500, 850, 1500, 2000],
    "blocks": [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [25, 9], [25, 10], [25, 11], [25, 12], [25, 13], [25, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14]]
  };
  return map;
}

function getmap6() {
  var map = {
    "bx": [10, 5, 15, 10],
    "by": [2, 17, 2, 17],
    "dx": [2, 2, 2, 2],
    "dy": [0, 0, 0, 0],
    "clrs": [BLUE, BLUE, ORANGE, ORANGE],
    "holecenters": [[2, 2], [28, 17]],
    "holecolors": [ORANGE, BLUE],
    "blocks": [[7, 1], [6, 2], [5, 3], [4, 4], [5, 5], [6, 6], [7, 7], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12], [13, 13], [14, 14], [15, 15], [15, 4], [16, 5], [17, 6], [18, 7], [19, 8], [20, 9], [21, 10], [22, 11], [23, 12], [24, 13], [25, 14], [26, 15], [25, 16], [24, 17], [23, 18]]
  };
  return map;
}

function getmap7() {
  var map = {
    "bx": [6, 10, 14, 18],
    "by": [16, 16, 16, 16],
    "dx": [2, 2, 2, 2],
    "dy": [0, 0, 0, 0],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[15, 2], [2, 2], [11.5, 2], [18.5, 2], [28, 2], [2, 4], [2, 6], [2, 8], [2, 10], [28, 4], [28, 6], [28, 8], [28, 10]],
    "holecolors": [BLUE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE, ORANGE],
    "blocks": [[13, 1], [13, 2], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [17, 1], [17, 2], [17, 3], [17, 4], [17, 5], [17, 6], [17, 7], [17, 8], [17, 9], [17, 10], [17, 11], [17, 12], [17, 13]]
  };
  return map;
}

function getmap8() {
  var map = {
    "bx": [14, 20, 2, 2],
    "by": [2, 2, 6, 10.5],
    "dx": [0, 0, 2, 2],
    "dy": [2, 2, 0, 0],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[2, 2], [5.5, 13.5], [24.5, 13.5], [24.5, 5.5]],
    "holecolors": [BLUE, ORANGE, GREEN, GOLD],
    "blocks": [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [17, 1], [17, 2], [17, 3], [17, 4], [17, 9], [17, 10], [17, 11], [17, 12], [17, 13], [17, 14], [17, 15], [17, 16], [17, 17], [17, 18], [4, 12], [4, 13], [4, 14], [4, 15], [5, 15], [6, 15], [7, 15], [23, 4], [23, 5], [23, 6], [23, 7], [24, 7], [25, 7], [26, 7], [23, 12], [23, 13], [23, 14], [23, 15], [24, 12], [25, 12], [26, 12]]
  };
  return map;
}

function getmap9() {
  var map = {
    "bx": [11, 11, 11, 11, 11],
    "by": [4, 7, 10, 13, 16],
    "dx": [2, 2, 2, 2, 2],
    "dy": [0, 0, 0, 0, 0],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE, BLUE],
    "holecenters": [[2, 2], [2, 6], [2, 10], [2, 14], [28, 2], [28, 6], [28, 10], [28, 14]],
    "holecolors": [BLUE, BLUE, BLUE, BLUE, ORANGE, ORANGE, ORANGE, ORANGE],
    "blocks": [[10, 1], [21, 1], [10, 4], [21, 4], [10, 7], [21, 7], [10, 10], [21, 10], [10, 13], [21, 13], [10, 16], [21, 16]]
  };
  return map;
}

function getmap10() {
  var map = {
    "bx": [2, 2, 2, 2],
    "by": [4, 7, 10, 13, 16],
    "dx": [0, 0, 0, 0],
    "dy": [2, 2, 2, 2],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[11.5, 17], [18.5, 17], [27.5, 17]],
    "holecolors": [BLUE, ORANGE, GREEN],
    "blocks": [[10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [14, 9], [10, 9], [16, 9], [20, 9], [20, 8], [20, 7], [20, 6], [20, 5], [19, 5], [18, 5], [12, 5], [11, 5], [10, 5], [10, 10], [10, 11], [10, 12], [10, 13], [10, 14], [11, 14], [12, 14], [13, 14], [17, 14], [18, 14], [19, 14], [20, 14], [20, 13], [20, 12], [20, 11], [20, 10], [10, 15], [10, 16], [10, 17], [10, 18], [20, 15], [20, 16], [20, 17], [20, 18], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15], [4, 16], [4, 17], [4, 18], [26, 4], [26, 5], [26, 6], [26, 7], [26, 8], [26, 9], [26, 10], [26, 11], [26, 12], [26, 13], [26, 14], [26, 15], [26, 16], [26, 17], [26, 18]]
  };
  return map;
}

function getmap11() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 0, 0, 0],
    "dy": [2, 2, 2, 2],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "releasepoint": [2.25, 2.25],
    "releasetimes": [500, 1000, 1200, 2000],
    "holecenters": [[8.5, 10], [18.5, 17], [28, 2]],
    "holecolors": [BLUE, GREEN, ORANGE],
    "blocks": [[4, 4], [5, 4], [6, 4], [12, 4], [13, 4], [14, 4], [20, 4], [21, 4], [22, 4], [28, 4], [29, 4], [7, 7], [8, 7], [9, 7], [15, 7], [16, 7], [17, 7], [23, 7], [24, 7], [25, 7], [10, 10], [11, 10], [12, 10], [18, 10], [19, 10], [20, 10], [26, 10], [27, 10], [28, 10], [7, 13], [8, 13], [9, 13], [15, 13], [16, 13], [17, 13], [23, 13], [24, 13], [25, 13], [4, 16], [5, 16], [6, 16], [12, 16], [13, 16], [14, 16], [20, 16], [21, 16], [22, 16], [28, 16], [29, 16]]
  };
  return map;
}

function getmap12() {
  var map = {
    "bx": [2, 2, 2, 2],
    "by": [4, 7, 10, 13, 16],
    "dx": [0, 0, 0, 0],
    "dy": [2, 2, 2, 2],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[18.5, 10], [18.5, 17], [26.5, 17]],
    "holecolors": [BLUE, GREEN, ORANGE],
    "blocks": [[4, 4], [5, 4], [6, 4], [12, 4], [13, 4], [14, 4], [20, 4], [21, 4], [22, 4], [28, 4], [29, 4], [7, 7], [8, 7], [9, 7], [15, 7], [16, 7], [17, 7], [23, 7], [24, 7], [25, 7], [10, 10], [11, 10], [12, 10], [18, 10], [19, 10], [20, 10], [26, 10], [27, 10], [28, 10], [7, 13], [8, 13], [9, 13], [15, 13], [16, 13], [17, 13], [23, 13], [24, 13], [25, 13], [4, 16], [5, 16], [6, 16], [12, 16], [13, 16], [14, 16], [20, 16], [21, 16], [22, 16], [28, 16], [29, 16]]
  };
  return map;
}