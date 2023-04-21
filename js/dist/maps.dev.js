"use strict";

var canvas = document.querySelector('.myCanvas');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

var _byte = 2 * ((window.innerHeight - 100) / (16 * 2.25));

var canvasdv = document.getElementById('canvas-container');
var pushdown = (window.innerHeight - _byte * 19) / 2; // take into account for drawing

canvasdv.style.marginTop = pushdown + 'px';
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
    "dx": [0, 2, 2, 0],
    "dy": [2, 0, 0, 2],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "releasepoint": [2.25, 2.25],
    "releasetimes": [500, 1000, 1200, 2000],
    "holecenters": [[8, 10], [18, 17], [28, 2]],
    "holecolors": [BLUE, GREEN, ORANGE],
    "blocks": [[4, 4], [5, 4], [6, 4], [12, 4], [13, 4], [14, 4], [20, 4], [21, 4], [22, 4], [28, 4], [29, 4], [7, 7], [8, 7], [9, 7], [15, 7], [16, 7], [17, 7], [23, 7], [24, 7], [25, 7], [10, 10], [11, 10], [12, 10], [18, 10], [19, 10], [20, 10], [26, 10], [27, 10], [28, 10], [7, 13], [8, 13], [9, 13], [15, 13], [16, 13], [17, 13], [23, 13], [24, 13], [25, 13], [4, 16], [5, 16], [6, 16], [12, 16], [13, 16], [14, 16], [20, 16], [21, 16], [22, 16], [28, 16], [29, 16]]
  };
  return map;
}

function getmap12() {
  var map = {
    "bx": [2, 2, 2, 2],
    "by": [4, 7, 10, 13],
    "dx": [0, 0, 0, 0],
    "dy": [2, 2, 2, 2],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[14.5, 17], [21.5, 17], [26.5, 17]],
    "holecolors": [BLUE, GREEN, ORANGE],
    "blocks": [[4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4], [28, 4], [29, 4], [4, 8], [5, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [20, 8], [21, 8], [22, 8], [23, 8], [24, 8], [25, 8], [26, 8], [27, 8], [28, 8], [29, 8], [4, 12], [5, 12], [6, 12], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [16, 12], [17, 12], [18, 12], [19, 12], [20, 12], [21, 12], [22, 12], [23, 12], [27, 12], [28, 12], [29, 12], [4, 15], [5, 15], [6, 15], [7, 15], [8, 15], [12, 15], [13, 15], [14, 15], [15, 15], [16, 15], [24, 15], [25, 15], [4, 5], [4, 6], [4, 7], [4, 9], [4, 10], [4, 11], [4, 13], [4, 14], [4, 16], [4, 17], [4, 18], [13, 15], [13, 16], [13, 17], [13, 18], [20, 12], [20, 13], [20, 14], [20, 15], [20, 16], [20, 17], [20, 18], [25, 15], [25, 16], [25, 17], [25, 18]]
  };
  return map;
}

function getmap13() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 0, 0, 0],
    "dy": [-1.5, -1.5, -1.5, -1.5],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[8, 6], [25.5, 14.5]],
    "holecolors": [BLUE, ORANGE],
    "releasepoint": [19.5, 14.5],
    "releasetimes": [500, 1000, 1200, 2000],
    "blocks": [[4.5, 4], [5.5, 4], [6.5, 4], [7.5, 4], [8.5, 4], [6.5, 5], [6.5, 6], [6.5, 7], [6.5, 8], [4.5, 8], [5.5, 8], [6.5, 8], [7.5, 8], [8.5, 8], [13.5, 4], [13.5, 5], [13.5, 6], [13.5, 7], [13.5, 8], [14.5, 5], [15.5, 6], [16.5, 7], [17.5, 8], [17.5, 7], [17.5, 6], [17.5, 5], [17.5, 4], [22.5, 4], [22.5, 5], [22.5, 6], [22.5, 7], [22.5, 8], [23.5, 6], [24.5, 5], [25.5, 4], [24.5, 7], [25.5, 8], [4.5, 12], [4.5, 13], [4.5, 14], [4.5, 15], [4.5, 16], [5.5, 12], [6.5, 12], [7, 13], [5.5, 14], [6.5, 14], [7, 15], [5.5, 16], [6.5, 16], [11.5, 12], [11, 13], [11, 14], [11, 15], [11, 16], [12.5, 12], [13.5, 12], [14, 13], [13, 14], [14, 15], [14, 16], [12, 14], [14, 14], [18, 12], [18, 13], [18, 14], [18, 15], [18, 16], [19, 16], [20, 16], [24, 12], [24, 13], [24, 14], [24, 15], [24, 16], [25, 16], [26, 16]]
  };
  return map;
}

function getmap14() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [1.2, 1.2, 1.2, 1.2],
    "dy": [-1, -1, -1, -1],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[2.5, 2.5]],
    "holecolors": [BLUE],
    "releasepoint": [3, 14.5],
    "releasetimes": [500, 1000, 1200, 2000],
    "timedblocks": [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [6, 15], [6, 16], [6, 17], [6, 18], [5, 5], [4, 5], [3, 5], [2, 5], [1, 5]],
    "antitimedblocks": [[20, 15], [20, 14], [20, 13], [20, 12], [20, 11], [20, 10], [20, 9]],
    "timedblockinterval": 1800,
    "blocks": []
  };
  return map;
}

function getmap15() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [1.2, 1.2, 1.2, 1.2],
    "dy": [-1, -1, -1, -1],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[2.5, 10]],
    "holecolors": [BLUE],
    "releasepoint": [2.5, 2.75],
    "releasetimes": [500, 1000, 1500, 2000],
    "timedblocks": [[15, 1], [15, 2], [15, 3], [15, 4], [15, 9], [15, 10], [15, 11], [15, 12], [15, 13], [15, 14], [16, 9], [17, 9], [18, 9], [19, 9], [20, 9], [21, 9], [21, 10], [21, 11], [21, 12], [21, 13], [21, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14]],
    "antitimedblocks": [[10, 1], [10, 2], [10, 3], [10, 4], [20, 1], [20, 2], [20, 3], [20, 4], [5, 9], [5, 10], [5, 11], [5, 12]],
    "timedblockinterval": 1800,
    "blocks": [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5]]
  };
  return map;
}

function getmap16() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [1.2, 1.2, 1.2, 1.2],
    "dy": [-1, -1, -1, -1],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[15, 9.5]],
    "holecolors": [BLUE],
    "releasepoint": [2.5, 2.75],
    "releasetimes": [500, 1000, 1500, 2000],
    "timedblocks": [[5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [25, 14], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [25, 6], [25, 7], [25, 8], [25, 9], [25, 10], [25, 11], [25, 12], [25, 13]],
    "antitimedblocks": [[10, 8], [10, 9], [10, 10], [10, 11], [20, 8], [20, 9], [20, 10], [20, 11], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [11, 11], [12, 11], [13, 11], [14, 11], [15, 11], [16, 11], [17, 11], [18, 11], [19, 11]],
    "timedblockinterval": 1800,
    "blocks": []
  };
  return map;
}

function getmap17() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75, 30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10, -14, -19, -25, -32],
    "dx": [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2],
    "dy": [-1, -1, -1, -1, -1, -1, -1, -1],
    "clrs": [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[27.5, 16.5]],
    "holecolors": [BLUE],
    "releasepoint": [2.5, 2.75],
    "releasetimes": [500, 750, 1000, 1250, 3500, 3750, 4000, 4250],
    "timedblocks": [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [6, 15], [6, 16], [6, 17], [6, 18], [12, 1], [12, 2], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15], [12, 16], [12, 17], [12, 18], [18, 1], [18, 2], [18, 3], [18, 4], [18, 5], [18, 6], [18, 7], [18, 8], [18, 9], [18, 10], [18, 11], [18, 12], [18, 13], [18, 14], [18, 15], [18, 16], [18, 17], [18, 18], [24, 1], [24, 2], [24, 3], [24, 4], [24, 5], [24, 6], [24, 7], [24, 8], [24, 9], [24, 10], [24, 11], [24, 12], [24, 13], [24, 14], [24, 15], [24, 16], [24, 17], [24, 18]],
    "antitimedblocks": [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [26, 5], [27, 5], [28, 5], [29, 5], [1, 9.5], [2, 9.5], [3, 9.5], [4, 9.5], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9.5], [10, 9.5], [11, 9.5], [12, 9.5], [13, 9.5], [14, 9.5], [15, 9.5], [16, 9.5], [17, 9.5], [18, 9.5], [19, 9.5], [20, 9.5], [21, 9.5], [22, 9.5], [23, 9.5], [24, 9.5], [25, 9.5], [26, 9.5], [27, 9.5], [28, 9.5], [29, 9.5], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [25, 14], [26, 14], [27, 14], [28, 14], [29, 14]],
    "timedblockinterval": 1800,
    "blocks": []
  };
  return map;
}

function getmap18() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [1.2, 1.2, 1.2, 1.2],
    "dy": [-1, -1, -1, -1],
    "clrs": [BLUE, ORANGE, GREEN, GOLD],
    "holecenters": [[2.5, 2.5], [2.5, 16.5], [27.5, 2.5], [27.5, 16.5]],
    "holecolors": [BLUE, ORANGE, GREEN, GOLD],
    "releasepoint": [15, 11.5],
    "releasetimes": [500, 1500, 2500, 3500],
    "timedblocks": [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [6, 15], [6, 16], [6, 17], [6, 18], [12, 1], [12, 2], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14], [12, 15], [12, 16], [12, 17], [12, 18], [18, 1], [18, 2], [18, 3], [18, 4], [18, 5], [18, 6], [18, 7], [18, 8], [18, 9], [18, 10], [18, 11], [18, 12], [18, 13], [18, 14], [18, 15], [18, 16], [18, 17], [18, 18], [24, 1], [24, 2], [24, 3], [24, 4], [24, 5], [24, 6], [24, 7], [24, 8], [24, 9], [24, 10], [24, 11], [24, 12], [24, 13], [24, 14], [24, 15], [24, 16], [24, 17], [24, 18]],
    "antitimedblocks": [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [26, 5], [27, 5], [28, 5], [29, 5], [1, 9.5], [2, 9.5], [3, 9.5], [4, 9.5], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9.5], [10, 9.5], [11, 9.5], [12, 9.5], [13, 9.5], [14, 9.5], [15, 9.5], [16, 9.5], [17, 9.5], [18, 9.5], [19, 9.5], [20, 9.5], [21, 9.5], [22, 9.5], [23, 9.5], [24, 9.5], [25, 9.5], [26, 9.5], [27, 9.5], [28, 9.5], [29, 9.5], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [25, 14], [26, 14], [27, 14], [28, 14], [29, 14]],
    "timedblockinterval": 1200,
    "blocks": []
  };
  return map;
}

function getmap19() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 0, 0, 0],
    "dy": [-1, -1, -1, -1],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[15, 9.5]],
    "holecolors": [BLUE],
    "releasepoint": [2.5, 2.5],
    "releasetimes": [500, 750, 1000, 1250],
    "leftpusher": [[27.5, 2.5], [26.5, 2.5], [25.5, 2.5], [24.5, 2.5], [23.5, 2.5], [22.5, 2.5], [21.5, 2.5], [20.5, 2.5], [19.5, 2.5], [18.5, 2.5], [17.5, 2.5], [16.5, 2.5], [15.5, 2.5], [14.5, 2.5], [13.5, 2.5], [12.5, 2.5], [11.5, 2.5], [10.5, 2.5], [9.5, 2.5], [8.5, 2.5], [7.5, 2.5], [6.5, 2.5], [5.5, 2.5], [4.5, 2.5], [3.5, 2.5], [2.5, 2.5]],
    "rightpusher": [[2, 16], [3, 16], [4, 16], [5, 16], [6, 16], [7, 16], [8, 16], [9, 16], [10, 16], [11, 16], [12, 16], [13, 16], [14, 16], [15, 16], [16, 16], [17, 16], [18, 16], [19, 16], [20, 16], [21, 16], [22, 16], [23, 16], [24, 16], [25, 16], [26, 16]],
    "uppusher": [[27, 16.5], [27, 15.5], [27, 14.5], [27, 13.5], [27, 12.5], [27, 11.5], [27, 10.5], [27, 9.5], [27, 8.5], [27, 7.5], [27, 6.5], [27, 5.5], [27, 4.5], [27, 3.5]],
    "downpusher": [[2.5, 2], [2.5, 3], [2.5, 4], [2.5, 5], [2.5, 6], [2.5, 7], [2.5, 8], [2.5, 9], [2.5, 9], [2.5, 10], [2.5, 11], [2.5, 12], [2.5, 13], [2.5, 14], [2.5, 15]],
    "timedblocks": [[5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [25, 14], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [25, 6], [25, 7], [25, 8], [25, 9], [25, 10], [25, 11], [25, 12], [25, 13]],
    "antitimedblocks": [],
    "timedblockinterval": 1000,
    "blocks": []
  };
  return map;
}

function getmap20() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 1, -1, 0],
    "dy": [-1, -1, -1, -1],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[23.5, 12.5], [23.5, 6.5]],
    "holecolors": [BLUE, ORANGE],
    "releasepoint": [2.5, 2.5],
    "releasetimes": [500, 750, 1000, 1250],
    "leftpusher": [[27.5, 2.5], [26.5, 2.5], [25.5, 2.5], [24.5, 2.5], [23.5, 2.5], [22.5, 2.5], [21.5, 2.5], [20.5, 2.5], [19.5, 2.5], [18.5, 2.5], [17.5, 2.5], [16.5, 2.5], [15.5, 2.5], [14.5, 2.5], [13.5, 2.5], [12.5, 2.5], [11.5, 2.5], [10.5, 2.5], [9.5, 2.5], [8.5, 2.5], [7.5, 2.5], [6.5, 2.5], [5.5, 2.5], [4.5, 2.5], [3.5, 2.5], [2.5, 2.5]],
    "rightpusher": [[2, 16], [3, 16], [4, 16], [5, 16], [6, 16], [7, 16], [8, 16], [9, 16], [10, 16], [11, 16], [12, 16], [13, 16], [14, 16], [15, 16], [16, 16], [17, 16], [18, 16], [19, 16], [20, 16], [21, 16], [22, 16], [23, 16], [24, 16], [25, 16], [26, 16]],
    "uppusher": [[27, 16.5], [27, 15.5], [27, 14.5], [27, 13.5], [27, 12.5], [27, 11.5], [27, 10.5], [27, 9.5], [27, 8.5], [27, 7.5], [27, 6.5], [27, 5.5], [27, 4.5], [27, 3.5]],
    "downpusher": [[2.5, 2], [2.5, 3], [2.5, 4], [2.5, 5], [2.5, 6], [2.5, 7], [2.5, 8], [2.5, 9], [2.5, 9], [2.5, 10], [2.5, 11], [2.5, 12], [2.5, 13], [2.5, 14], [2.5, 15]],
    "timedblocks": [[6, 5], [7, 5], [8, 5], [9, 5]],
    "antitimedblocks": [],
    "timedblockinterval": 1000,
    "blocks": [[5, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5], [24, 5], [25, 5], [5, 14], [6, 14], [7, 14], [8, 14], [9, 14], [10, 14], [11, 14], [12, 14], [13, 14], [14, 14], [15, 14], [16, 14], [17, 14], [18, 14], [19, 14], [20, 14], [21, 14], [22, 14], [23, 14], [24, 14], [25, 14], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11], [5, 12], [5, 13], [25, 6], [25, 7], [25, 8], [25, 9], [25, 10], [25, 11], [25, 12], [25, 13]]
  };
  return map;
}

function getmap21() {
  var map = {
    "bx": [7, 7, 7, 7],
    "by": [5, 8, 11, 14],
    "dx": [1, 1, 1, 1],
    "dy": [0, 0, 0, 0],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[27.5, 16.5], [2.5, 16.5]],
    "holecolors": [BLUE, ORANGE],
    "leftpusher": [[23, 5], [23, 8], [23, 11], [23, 14]],
    "rightpusher": [[6, 5], [6, 8], [6, 11], [6, 14]],
    "uppusher": [],
    "downpusher": [[3.5, 5], [3.5, 6], [3.5, 7], [3.5, 8], [3.5, 9], [3.5, 10], [3.5, 11], [3.5, 12], [3.5, 13], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10], [2, 11], [2, 12], [2, 13]],
    "timedblocks": [[1.5, 14.5], [2.5, 14.5], [3.5, 14.5], [4.5, 14.5], [4.5, 15.5], [4.5, 16.5], [4.5, 17.5]],
    "antitimedblocks": [[25.5, 14.5], [26.5, 14.5], [27.5, 14.5], [28.5, 14.5], [25.5, 15.5], [25.5, 16.5], [25.5, 17.5]],
    "timedblockinterval": 1000,
    "blocks": []
  };
  return map;
}

function getmap22() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 1, 1, 0],
    "dy": [-1, 0, 0, -1],
    "clrs": [BLUE, ORANGE, GREEN, GOLD],
    "holecenters": [[27.5, 16.5], [27.5, 12.5], [27.5, 8.5], [27.5, 4.5]],
    "holecolors": [BLUE, ORANGE, GOLD, GREEN],
    "releasepoint": [2.5, 2],
    "releasetimes": [500, 750, 1000, 1250],
    "leftpusher": [],
    "rightpusher": [[5, 16.5], [6, 16.5], [7, 16.5], [8, 16.5], [9, 16.5], [10, 16.5], [11, 16.5], [12, 16.5], [13, 16.5], [14, 16.5], [15, 16.5], [16, 16.5], [17, 16.5], [18, 16.5], [19, 16.5], [20, 16.5], [21, 16.5], [22, 16.5], [23, 16.5], [5, 12.5], [6, 12.5], [7, 12.5], [8, 12.5], [9, 12.5], [10, 12.5], [11, 12.5], [12, 12.5], [13, 12.5], [14, 12.5], [15, 12.5], [16, 12.5], [17, 12.5], [18, 12.5], [19, 12.5], [20, 12.5], [21, 12.5], [22, 12.5], [23, 12.5], [5, 8.5], [6, 8.5], [7, 8.5], [8, 8.5], [9, 8.5], [10, 8.5], [11, 8.5], [12, 8.5], [13, 8.5], [14, 8.5], [15, 8.5], [16, 8.5], [17, 8.5], [18, 8.5], [19, 8.5], [20, 8.5], [21, 8.5], [22, 8.5], [23, 8.5], [5, 5], [6, 5], [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [21, 5], [22, 5], [23, 5]],
    "timedblocks": [[5, 10.5], [6, 10.5], [9, 10.5], [10, 10.5], [13, 10.5], [14, 10.5], [17, 10.5], [18, 10.5], [21, 10.5], [22, 10.5]],
    "antitimedblocks": [[7, 10.5], [8, 10.5], [11, 10.5], [12, 10.5], [15, 10.5], [16, 10.5], [19, 10.5], [20, 10.5], [23, 10.5]],
    "timedblockinterval": 1000,
    "blocks": [[5, 14.5], [6, 14.5], [7, 14.5], [8, 14.5], [9, 14.5], [10, 14.5], [11, 14.5], [12, 14.5], [13, 14.5], [14, 14.5], [15, 14.5], [16, 14.5], [17, 14.5], [18, 14.5], [19, 14.5], [20, 14.5], [21, 14.5], [22, 14.5], [23, 14.5], [5, 6.5], [6, 6.5], [7, 6.5], [8, 6.5], [9, 6.5], [10, 6.5], [11, 6.5], [12, 6.5], [13, 6.5], [14, 6.5], [15, 6.5], [16, 6.5], [17, 6.5], [18, 6.5], [19, 6.5], [20, 6.5], [21, 6.5], [22, 6.5], [23, 6.5], [5, 3.5], [6, 3.5], [7, 3.5], [8, 3.5], [9, 3.5], [10, 3.5], [11, 3.5], [12, 3.5], [13, 3.5], [14, 3.5], [15, 3.5], [16, 3.5], [17, 3.5], [18, 3.5], [19, 3.5], [20, 3.5], [21, 3.5], [22, 3.5], [23, 3.5]]
  };
  return map;
}

function getmap23() {
  var map = {
    "bx": [2, 2, 2, 2],
    "by": [2.5, 2.5, 15.5, 15.5],
    "dx": [0, 1, 1, 0],
    "dy": [-1, 0, 0, -1],
    "clrs": [BLUE, BLUE, ORANGE, ORANGE],
    "holecenters": [[27.5, 16.5], [27.5, 2.5]],
    "holecolors": [BLUE, ORANGE],
    "leftpusher": [],
    "rightpusher": [[6, 2], [6, 3], [6, 4], [6, 5], [6, 14], [6, 15], [6, 16], [6, 17]],
    "uppusher": [[2, 13], [3, 13], [4, 13], [5, 13]],
    "downpusher": [[2, 6], [3, 6], [4, 6], [5, 6]],
    "timedblocks": [[5, 5], [4, 5], [3, 5], [2, 5], [1, 5], [5, 4], [5, 3], [5, 2], [5, 1], [25, 14], [25, 15], [25, 16], [25, 17], [25, 18], [26, 14], [27, 14], [28, 14], [29, 14], [5, 14], [4, 14], [3, 14], [2, 14], [1, 14], [5, 15], [5, 16], [5, 17], [5, 18]],
    "antitimedblocks": [[25, 5], [25, 4], [25, 3], [25, 2], [25, 1], [26, 5], [27, 5], [28, 5], [29, 5]],
    "timedblockinterval": 1500,
    "blocks": []
  };
  return map;
}

function getmap24() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 0, 0, 0],
    "dy": [-1, 1, 1, -1],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[7.5, 17]],
    "holecolors": [BLUE],
    "releasepoint": [2.5, 2],
    "releasetimes": [500, 1000, 1500, 2000],
    "leftpusher": [[22, 8], [21, 8], [24.5, 5], [23.5, 5], [10.5, 8], [9.5, 8], [28, 17], [27, 17]],
    "rightpusher": [[6, 11], [7, 11], [8, 11], [16, 11], [17, 11], [18, 11], [13, 14], [14, 14], [7.5, 2], [8.5, 2]],
    "uppusher": [[21.5, 11], [21.5, 10], [24.5, 14], [24.5, 13], [7.5, 8], [7.5, 7], [10.5, 17], [10.5, 16]],
    "downpusher": [[13.5, 8], [10.5, 5], [10.5, 6], [27.75, 2], [27.75, 3]],
    "timedblocks": [[13, 9.5], [14, 9.5], [13, 12.5], [14, 12.5]],
    "antitimedblocks": [[12, 10.5], [12, 11.5], [15, 10.5], [15, 11.5]],
    "timedblockinterval": 2000,
    "blocks": [[6, 12.5], [7, 12.5], [8, 12.5], [9, 12.5], [10, 12.5], [11, 12.5], [12, 12.5], [15, 12.5], [16, 12.5], [17, 12.5], [18, 12.5], [19, 12.5], [20, 12.5], [21, 12.5], [22, 12.5], [23, 12.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9.5], [10, 9.5], [11, 9.5], [12, 9.5], [15, 9.5], [16, 9.5], [17, 9.5], [18, 9.5], [19, 9.5], [20, 9.5], [23, 11.5], [23, 10.5], [23, 9.5], [23, 8.5], [23, 7.5], [23, 6.5], [22, 6.5], [21, 6.5], [20, 6.5], [19, 6.5], [18, 6.5], [17, 6.5], [16, 6.5], [15, 6.5], [14, 6.5], [13, 6.5], [12, 6.5], [12, 7.5], [12, 8.5], [12, 13.5], [12, 14.5], [12, 15.5], [13, 15.5], [14, 15.5], [15, 15.5], [16, 15.5], [17, 15.5], [18, 15.5], [19, 15.5], [20, 15.5], [21, 15.5], [22, 15.5], [23, 15.5], [24, 15.5], [25, 15.5], [26, 15.5], [26, 14.5], [26, 13.5], [26, 12.5], [26, 11.5], [26, 10.5], [26, 9.5], [26, 8.5], [26, 7.5], [26, 6.5], [26, 5.5], [26, 4.5], [26, 3.5], [25, 3.5], [24, 3.5], [23, 3.5], [22, 3.5], [21, 3.5], [20, 3.5], [19, 3.5], [18, 3.5], [17, 3.5], [16, 3.5], [15, 3.5], [14, 3.5], [13, 3.5], [12, 3.5], [11, 3.5], [10, 3.5], [9, 3.5], [6, 1.5], [6, 2.5], [6, 3.5], [6, 4.5], [6, 5.5], [6, 6.5], [6, 7.5], [6, 8.5], [9, 4.5], [9, 5.5], [9, 6.5], [9, 15.5], [9, 16.5], [9, 17.5], [6, 13.5], [6, 14.5], [6, 15.5], [6, 16.5], [6, 17.5]]
  };
  return map;
}

function getmap25() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 0, 0, 0],
    "dy": [-2, 2, 2, -2],
    "clrs": [BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[27.5, 16.5]],
    "holecolors": [BLUE],
    "releasepoint": [2.5, 2],
    "releasetimes": [500, 1000, 1500, 2000],
    "timedblockinterval": 2000,
    "blocks": [[13, 4], [14, 4], [15, 4], [16, 4], [17, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11], [13, 12], [13, 13], [13, 14], [13, 15], [13, 16], [13, 17], [14, 8], [15, 8], [16, 8], [17, 8], [17, 9], [16, 10], [15, 11], [14, 12], [14, 13], [15, 14], [16, 15], [17, 16], [18, 17]]
  };
  return map;
}

function getmap26() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 0, 0, 0],
    "dy": [1.66, 1.66, 1.66, 1.66],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[11.33, 16.88], [18.66, 16.88]],
    "holecolors": [BLUE, ORANGE],
    "releasepoint": [15, 2],
    "releasetimes": [500, 1000, 1500, 2000],
    "timedblockinterval": 2000,
    "blocks": [[4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15], [11.33, 4], [11.33, 5], [11.33, 6], [11.33, 7], [11.33, 8], [11.33, 9], [11.33, 10], [11.33, 11], [11.33, 12], [11.33, 13], [11.33, 14], [11.33, 15], [11.33, 15.25], [18.66, 4], [18.66, 5], [18.66, 6], [18.66, 7], [18.66, 8], [18.66, 9], [18.66, 10], [18.66, 11], [18.66, 12], [18.66, 13], [18.66, 14], [18.66, 15], [18.66, 15.25], [26, 4], [26, 5], [26, 6], [26, 7], [26, 8], [26, 9], [26, 10], [26, 11], [26, 12], [26, 13], [26, 14], [26, 15], [5, 9.5], [6, 9.5], [7, 9.5], [8, 9.5], [9, 9.5], [10, 9.5], [11, 9.5], [12, 9.5], [13, 9.5], [14, 9.5], [15, 9.5], [16, 9.5], [17, 9.5], [18, 9.5], [19, 9.5], [20, 9.5], [21, 9.5], [22, 9.5], [23, 9.5], [24, 9.5], [25, 9.5]]
  };
  return map;
}

function getmap27() {
  var map = {
    "bx": [2, 9, 15, 5, 12, 19],
    "by": [2.25, 2.25, 2.25, 5.5, 5.5, 5.5],
    "dx": [0, 0, 0, 0, 0, 0],
    "dy": [0, 0, 0, 0, 0, 0],
    "clrs": [BLUE, BLUE, BLUE, ORANGE, ORANGE, ORANGE],
    "holecenters": [[2.5, 11], [2.5, 15]],
    "holecolors": [BLUE, ORANGE],
    "timedblocks": [[5, 1], [5, 2], [5, 3], [13, 1], [13, 2], [13, 3], [21, 1], [21, 2], [21, 3], [9, 5], [9, 6], [17, 5], [17, 6]],
    "antitimedblocks": [[9, 1], [9, 2], [9, 3], [17, 1], [17, 2], [17, 3], [5, 5], [5, 6], [13, 5], [13, 6], [21, 5], [21, 6]],
    "rightpusher": [[2, 2.25], [3, 2.25], [6, 2.25], [7, 2.25], [10, 2.25], [11, 2.25], [14, 2.25], [15, 2.25], [18, 2.25], [19, 2.25], [2, 5.5], [3, 5.5], [6, 5.5], [7, 5.5], [10, 5.5], [11, 5.5], [14, 5.5], [15, 5.5], [18, 5.5], [19, 5.5]],
    "downpusher": [[27, 2.25], [28, 2.25], [27, 5.5], [28, 5.5], [11, 13.5], [10, 13.5], [9, 13.5], [8, 13.5], [7, 13.5], [6, 13.5]],
    "leftpusher": [[12, 13], [13, 13], [14, 13], [15, 13], [16, 13], [17, 13], [18, 13], [19, 13], [20, 13], [21, 13], [22, 13], [23, 13], [24, 13]],
    "uppusher": [[11, 12.5], [10, 12.5], [9, 12.5], [8, 12.5], [7, 12.5], [6, 12.5]],
    "timedblockinterval": 1000,
    "blocks": [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4], [20, 4], [21, 4], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [1, 13], [2, 13], [3, 13], [4, 13], [5, 13]]
  };
  return map;
}

function getmap28() {
  var map = {
    "bx": [8, 13, 12, 17],
    "by": [2, 2, 6.5, 6.5],
    "dx": [1, 1, 1, 1],
    "dy": [0, 0, 0, 0],
    "clrs": [BLUE, BLUE, ORANGE, ORANGE],
    "holecenters": [[2.5, 16.5], [27.5, 16.5]],
    "holecolors": [BLUE, ORANGE],
    "timedblocks": [[10, 1], [10, 2], [10, 3], [10, 4], [20, 1], [20, 2], [20, 3], [20, 4]],
    "antitimedblocks": [[6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [7, 5], [8, 5], [9, 5], [24, 1], [24, 2], [24, 3], [24, 4], [24, 5], [23, 5], [22, 5], [21, 5]],
    "rightpusher": [],
    "downpusher": [[10, 10], [11, 10], [19, 10], [20, 10]],
    "leftpusher": [],
    "uppusher": [],
    "bluelockblock": [[10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [10, 6], [10, 7], [10, 8], [11, 8], [12, 8], [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8], [19, 8], [20, 8], [20, 7], [20, 6]],
    "initiallock": true,
    "timedblockinterval": 1000,
    "blocks": []
  };
  return map;
}

function getmap29() {
  var map = {
    "bx": [8, 13, 12, 17, 12, 17],
    "by": [2, 2, 6.5, 6.5, 8.5, 8.5],
    "dx": [1, 1, 1, 1, 1, 1],
    "dy": [0, 0, 0, 0, 0, 0],
    "clrs": [BLUE, BLUE, BLUE, BLUE, BLUE, BLUE],
    "holecenters": [[2.5, 16.5], [27.5, 16.5]],
    "holecolors": [BLUE, BLUE],
    "timedblocks": [],
    "antitimedblocks": [],
    "rightpusher": [],
    "downpusher": [],
    "leftpusher": [],
    "uppusher": [],
    "bluelockblock": [[11, 10], [12, 10], [13, 10], [14, 10], [15, 10], [16, 10], [17, 10], [18, 10], [19, 10], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15], [16, 15], [17, 15], [18, 15], [19, 15]],
    "initiallock": true,
    "timedblockinterval": 1000,
    "blocks": [[10, 5], [11, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5], [19, 5], [20, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10], [10, 11], [10, 12], [10, 13], [10, 14], [10, 15], [20, 15], [20, 14], [20, 13], [20, 12], [20, 11], [20, 10], [20, 9], [20, 8], [20, 7], [20, 6]]
  };
  return map;
}

function getmap30() {
  var map = {
    "bx": [4, 5.5, 7.5, 9.5, 11.5, 13.5],
    "by": [2, 17, 17, 17, 17, 17],
    "dx": [0, 0, 0, 0, 0, 0],
    "dy": [1, 0, 0, 0, 0, 0],
    "clrs": [BLUE, BLUE, BLUE, ORANGE, ORANGE, ORANGE, ORANGE],
    "holecenters": [[2.25, 16.75], [24.5, 13.5]],
    "holecolors": [BLUE, ORANGE],
    "timedblocks": [[10, 6], [10, 5], [15, 1]],
    "antitimedblocks": [[10, 1], [10, 2], [10, 3], [15, 1]],
    "rightpusher": [[7, 2.25], [8, 2.25], [7, 5.5], [8, 5.5], [11.5, 2.25], [12.5, 2.25], [11.5, 5.5], [12.5, 5.5], [16.5, 2.25], [17.5, 2.25], [19.5, 2.25], [20.5, 2.25], [8, 10.5], [9, 10.5], [17, 16.75], [18, 16.75], [20, 13.5], [21, 13.5]],
    "downpusher": [[27.75, 2], [27.75, 3], [21.5, 5], [21.5, 6], [8.5, 8], [8.5, 9], [17.5, 10], [17.5, 11], [20.5, 11], [20.5, 12]],
    "leftpusher": [[28, 8.5], [27, 8.5], [25, 5.5], [24, 5.5], [21, 8.5], [22, 8.5], [18, 8.5], [19, 8.5], [28, 11.5], [27, 11.5]],
    "uppusher": [[5.5, 17.5], [7.5, 17.5], [9.5, 17.5], [11.5, 17.5], [13.5, 17.5], [16.5, 5.5], [17.5, 4.5], [18.5, 3.5], [24.5, 9], [24.5, 8], [27.75, 17], [27.75, 16]],
    "bluelockblock": [[5, 15], [6, 15], [7, 15], [8, 15], [9, 15], [10, 15], [11, 15], [12, 15], [13, 15], [14, 15], [15, 15], [15, 2], [15, 3], [15, 5], [15, 6]],
    "initiallock": true,
    "timedblockinterval": 1000,
    "blocks": [[4, 12], [4, 13], [4, 14], [4, 15], [4, 16], [4, 17], [4, 18], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [8, 12], [9, 12], [10, 12], [11, 12], [12, 12], [13, 12], [14, 12], [15, 12], [16, 12], [16, 13], [16, 14], [16, 15], [16, 16], [16, 17], [16, 18], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4], [15, 4], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7], [14, 7], [15, 7], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [20, 6], [20, 5], [20, 4], [21, 4], [22, 4], [23, 4], [24, 4], [25, 4], [26, 4], [26, 5], [26, 6], [26, 7], [29, 10], [28, 10], [27, 10], [26, 10], [25, 10], [24, 10], [23, 10], [22, 10], [21, 10], [20, 10], [19, 10], [23, 9], [23, 8], [23, 7], [19, 11], [19, 12], [19, 13], [19, 14], [19, 15], [20, 15], [21, 15], [22, 15], [23, 15], [24, 15], [25, 15], [26, 15], [26, 14], [26, 13]]
  };
  return map;
}

function getmap31() {
  var map = {
    "bx": [30.75, 30.75, 30.75, 30.75],
    "by": [-2, -4.5, -7, -10],
    "dx": [0, 1, 1, 0],
    "dy": [1, 1, 1, 1],
    "clrs": [BLUE, ORANGE, BLUE, ORANGE],
    "holecenters": [[2.25, 16.75], [27.75, 16.75], [27.75, 2.25]],
    "holecolors": [BLUE, ORANGE, GREEN],
    "releasepoint": [2.5, 2],
    "releasetimes": [500, 1000, 1500, 2000],
    "bluebreakblocks": [[6, 6], [5, 6], [4, 6], [3, 6], [2, 6], [6, 5], [6, 4], [6, 3], [6, 2], [4, 15], [3, 15], [2, 15], [4, 16], [4, 17], [26, 15], [26, 16], [26, 17], [27, 15], [28, 15], [26, 4], [26, 3], [26, 2], [27, 4], [28, 4]],
    "initiallock": true,
    "timedblockinterval": 1000,
    "blocks": []
  };
  return map;
}

function getmap32() {
  var map = {
    "bx": [2, 2.25, 2.25, 2.25],
    "by": [2, 12, 15, 17],
    "dx": [1, 0, 0, 0],
    "dy": [0, 1, 0.5, 0.5],
    "clrs": [BLUE, ORANGE, ORANGE, BLUE],
    "holecenters": [[5.75, 16.75], [5.75, 13.75], [27.75, 2.25]],
    "holecolors": [BLUE, ORANGE, GREEN],
    "timedblocks": [[8, 3], [9, 3], [13, 10], [13, 11], [13, 13], [13, 14], [16, 10], [16, 11], [16, 13], [16, 14]],
    "antitimedblocks": [[11, 3], [12, 3], [14, 9], [15, 9], [14, 12], [15, 12], [14, 15], [15, 15]],
    "uppusher": [[2.25, 12], [8.5, 4.75], [11.5, 4.75], [21.5, 17.5], [21.5, 16.5], [27.75, 17.5], [27.75, 16.5], [21.5, 12], [21.5, 11], [11.5, 11], [11.5, 10]],
    "rightpusher": [[4, 4.5], [5, 4.5], [11, 1.75], [12, 1.75], [14, 16.75], [15, 16.75], [21, 14.5], [22, 14.5], [24, 16.75], [25, 16.75], [5, 10.5], [6, 10.5]],
    "leftpusher": [[27, 5.5], [28, 5.5], [28.5, 8.5], [27.5, 8.5], [24, 11.5], [25, 11.5], [22, 8.5], [21, 8.5], [18, 13.5], [12, 16.75], [11, 16.75], [12, 7.5], [11, 7.5], [9, 13.5], [8, 13.5]],
    "downpusher": [[21.5, 1.5], [21.5, 2.5], [14.5, 5], [14.5, 6], [24.5, 14], [24.5, 15], [24.5, 8], [24.5, 9], [11.5, 13], [11.5, 14], [5.5, 7], [5.5, 8], [8.5, 10], [8.5, 11]],
    "bluebreakblocks": [[1, 9], [2, 9], [3, 9]],
    "bluelockblock": [[1, 13], [2, 13], [3, 13], [2, 5]],
    "initiallock": true,
    "timedblockinterval": 1000,
    "blocks": [[4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15], [4, 16], [4, 17], [4, 18], [4, 1], [4, 2], [4, 3], [4, 7], [4, 8], [5, 3], [6, 3], [7, 3], [10, 3], [10, 2], [10, 1], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [13, 5], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4], [20, 4], [23, 4], [24, 4], [25, 4], [26, 4], [27, 4], [28, 4], [29, 4], [16, 7], [17, 7], [18, 7], [19, 7], [20, 7], [21, 7], [22, 7], [23, 7], [24, 7], [25, 7], [26, 7], [27, 7], [28, 7], [29, 7], [16, 8], [16, 9], [16, 12], [16, 15], [13, 7], [13, 8], [13, 9], [13, 12], [13, 15], [13, 16], [13, 17], [13, 18], [17, 15], [18, 15], [19, 15], [20, 15], [26, 15], [20, 14], [20, 13], [21, 13], [22, 13], [23, 13], [24, 13], [25, 13], [26, 13], [26, 14], [23, 16], [23, 17], [23, 18], [17, 12], [20, 12], [20, 11], [20, 10], [17, 9], [17, 8], [23, 10], [23, 9], [23, 8], [26, 10], [26, 11], [26, 12], [12, 12], [11, 12], [10, 12], [10, 11], [10, 10], [10, 9], [9, 9], [8, 9], [7, 9], [7, 12], [6, 12], [5, 12], [10, 13], [10, 14], [10, 15], [10, 15.25], [9, 15.25], [8, 15.25], [7, 15.25]]
  };
  return map;
}