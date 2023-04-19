"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// canvas template
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20; // byte, canvas declared in first.js

var width = byte * 30;
var height = byte * 19; // gonna make a full sized canvas with a little bit of ground leeway
// just to make sure that the canvas is sized right
// alternate times reload

if (localStorage.getItem('mapreload') == 'declined') {
  localStorage.setItem('mapreload', 'valid');
  location.reload();
} else {
  localStorage.setItem('mapreload', 'declined');
} // set up the audio


var randad = Math.floor(Math.random() * 3); // 0 1 2

var audi;

if (randad == 0) {
  audi = new Audio('audio/inkball_theme.mp3');
} else if (randad == 1) {
  audi = new Audio('audio/inkball_2.mp3');
} else {
  audi = new Audio('audio/inkball_3.mp3');
}

audi.volume = 0.5;
audi.play();
var getaudio = new Audio('audio/inkball_get.mp3');
var winaudio = new Audio('audio/inkball_win.mp3');
var loseaudio = new Audio('audio/inkball_lose.mp3');
var collisionaudio = new Audio('audio/inkball_collision.mp3'); // for animations

var sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

function drawbg() {
  ctx.beginPath();
  ctx.clearRect(0, 0, width + borderwidth * 4, height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width + borderwidth * 4, height); // lets draw some borders

  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, width, borderwidth);
  ctx.fillRect(0, 0, borderwidth, height);
  ctx.fillRect(width - borderwidth, 0, borderwidth, height);
  ctx.fillRect(0, height - borderwidth, width, borderwidth); // this is a supposed hole

  var j = 0;

  while (j < holecenters.length) {
    ctx.beginPath();
    ctx.fillStyle = holecolors[j];
    ctx.fillRect(holecenters[j][0] - holewidth * 1.5 / 2, holecenters[j][1] - holewidth * 1.5 / 2, holewidth * 1.5, holewidth * 1.5);
    ctx.fillStyle = 'black';
    ctx.arc(holecenters[j][0], holecenters[j][1], holewidth / 2, 0, Math.PI * 2);
    ctx.fill();
    j += 1;
  } // these are blocks


  j = 0;
  ctx.fillStyle = 'gray';

  while (j < blocks.length) {
    ctx.fillRect(blocks[j][0] - byte / 2, blocks[j][1] - byte / 2, byte, byte);
    j += 1;
  } // these are timed blocks


  j = 0;
  ctx.lineWidth = ballwidth / 4;

  while (j < timedblocks.length && tbtimer < timedblockinterval / 2 + 50) {
    if (tbtimer < 100) {
      var tv = tbtimer / 100;
      ctx.strokeStyle = 'rgba(128,128,128,' + tv + ')';
    } else if (tbtimer < timedblockinterval / 2 - 50) {
      ctx.strokeStyle = 'gray';
    } else {
      var _tv = (timedblockinterval / 2 + 50 - tbtimer) / 100;

      ctx.strokeStyle = 'rgba(128,128,128,' + _tv + ')';
    }

    ctx.strokeRect(timedblocks[j][0] - byte / 2, timedblocks[j][1] - byte / 2, byte, byte);
    j += 1;
  } // these are antitimed blocks


  j = 0;

  while (j < antitimedblocks.length && tbtimer > timedblockinterval / 2 - 50) {
    if (tbtimer < timedblockinterval / 2 + 50) {
      var _tv2 = (tbtimer - (timedblockinterval / 2 - 50)) / 100;

      ctx.strokeStyle = 'rgba(128,128,128,' + _tv2 + ')';
    } else if (tbtimer < timedblockinterval / 2 - 50) {
      ctx.strokeStyle = 'gray';
    } else {
      var _tv3 = (timedblockinterval - tbtimer) / 100;

      ctx.strokeStyle = 'rgba(128,128,128,' + _tv3 + ')';
    }

    ctx.strokeRect(antitimedblocks[j][0] - byte / 2, antitimedblocks[j][1] - byte / 2, byte, byte);
    j += 1;
  } // these are pushers


  j = 0;
  var rrr = 75;

  if (pushtimer < 4) {
    rrr = pushtimer * 85 / 4;
  } else if (pushtimer > byte / 2 - 4) {
    rrr = (byte / 2 - pushtimer) * 85 / 4;
  }

  ctx.fillStyle = 'rgb(' + rrr + ',' + rrr + ',' + rrr + ')';

  while (j < leftpusher.length) {
    drawpusherleft(leftpusher[j][0] - pushtimer, leftpusher[j][1]);
    j += 1;
  }

  j = 0;

  while (j < rightpusher.length) {
    drawpusherright(rightpusher[j][0] + pushtimer, rightpusher[j][1]);
    j += 1;
  }

  j = 0;

  while (j < uppusher.length) {
    drawpusherup(uppusher[j][0], uppusher[j][1] - pushtimer);
    j += 1;
  }

  j = 0;

  while (j < downpusher.length) {
    drawpusherdown(downpusher[j][0], downpusher[j][1] + pushtimer);
    j += 1;
  } // this is blue lock blocks


  j = 0;
  ctx.lineWidth = ballwidth / 4;
  ctx.fillStyle = "rgb(" + 3 * bluefade / 100 + "," + 161 * bluefade / 100 + "," + 252 * bluefade / 100 + ")";
  ctx.strokeStyle = "rgb(" + 128 * bluefade / 100 + "," + 128 * bluefade / 100 + "," + 128 * bluefade / 100 + ")";

  while (j < bluelocks.length && bluefade != 0) {
    ctx.fillRect(bluelocks[j][0] - byte / 2, bluelocks[j][1] - byte / 2, byte, byte);
    ctx.strokeRect(bluelocks[j][0] - byte / 2, bluelocks[j][1] - byte / 2, byte, byte);
    j += 1;
  }

  j = 0;
  ctx.lineWidth = ballwidth / 4;
  ctx.lineJoin = "bevel";
  ctx.fillStyle = 'gray';
  ctx.strokeStyle = BLUE;

  while (j < bluebreakers.length) {
    ctx.fillRect(bluebreakers[j][0] - byte / 2, bluebreakers[j][1] - byte / 2, byte, byte);
    ctx.strokeRect(bluebreakers[j][0] - byte / 2, bluebreakers[j][1] - byte / 2, byte, byte);
    j += 1;
  }

  ctx.fillStyle = 'gray'; // releaser

  if (releaser != null) {
    ctx.fillRect(width + ballwidth * 2, 0, byte / 2, byte * 7);
    ctx.fillRect(width, byte * 6.5, ballwidth * 2 + byte / 2, byte / 2);
    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(releaser[0], releaser[1], ballwidth / 2, ballwidth / 2);
    ctx.fillRect(releaser[0] - ballwidth / 2, releaser[1], ballwidth / 2, ballwidth / 2);
    ctx.fillRect(releaser[0] + ballwidth / 2, releaser[1], ballwidth / 2, ballwidth / 2);
    ctx.fillRect(releaser[0], releaser[1] - ballwidth / 2, ballwidth / 2, ballwidth / 2);
    ctx.fillRect(releaser[0], releaser[1] + ballwidth / 2, ballwidth / 2, ballwidth / 2); // a pie chart sort of thing
    //ctx.fillStyle = 'rgb(200,200,200)';
    // max is 200

    var tc = 0;

    if (nextt / nextgap > 0.75) {
      tc = 800 * (1 - nextt / nextgap);
    } else {
      tc = 200;
    }

    ctx.fillStyle = 'rgb(' + tc + ',' + tc + ',' + tc + ')';
    ctx.beginPath();
    ctx.arc(width + byte, byte * 8, ballwidth, 0, Math.PI * 2 * (nextt / nextgap));
    ctx.lineTo(width + byte, byte * 8);
    ctx.fill();
  }
}

function togglebluelock() {
  return regeneratorRuntime.async(function togglebluelock$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          blueon = !blueon; // now its the new setting

          if (!blueon) {
            _context.next = 10;
            break;
          }

        case 2:
          if (!(bluefade < 100)) {
            _context.next = 8;
            break;
          }

          bluefade += 1;
          _context.next = 6;
          return regeneratorRuntime.awrap(sleep());

        case 6:
          _context.next = 2;
          break;

        case 8:
          _context.next = 16;
          break;

        case 10:
          if (!(bluefade > 0)) {
            _context.next = 16;
            break;
          }

          bluefade -= 1;
          _context.next = 14;
          return regeneratorRuntime.awrap(sleep());

        case 14:
          _context.next = 10;
          break;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}

function drawpusherright(x, y) {
  ctx.beginPath();
  ctx.moveTo(x - byte / 2, y - byte / 2);
  ctx.lineTo(x, y - byte / 2);
  ctx.lineTo(x + byte / 2, y);
  ctx.lineTo(x, y + byte / 2);
  ctx.lineTo(x - byte / 2, y + byte / 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x - byte / 2, y - byte / 2);
  ctx.fill();
}

function drawpusherleft(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y - byte / 2);
  ctx.lineTo(x + byte / 2, y - byte / 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x + byte / 2, y + byte / 2);
  ctx.lineTo(x, y + byte / 2);
  ctx.lineTo(x - byte / 2, y);
  ctx.lineTo(x, y - byte / 2);
  ctx.fill();
}

function drawpusherup(x, y) {
  ctx.beginPath();
  ctx.moveTo(x - byte / 2, y + byte / 2);
  ctx.lineTo(x - byte / 2, y);
  ctx.lineTo(x, y - byte / 2);
  ctx.lineTo(x + byte / 2, y);
  ctx.lineTo(x + byte / 2, y + byte / 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x - byte / 2, y + byte / 2);
  ctx.fill();
}

function drawpusherdown(x, y) {
  ctx.beginPath();
  ctx.moveTo(x + byte / 2, y - byte / 2);
  ctx.lineTo(x + byte / 2, y);
  ctx.lineTo(x, y + byte / 2);
  ctx.lineTo(x - byte / 2, y);
  ctx.lineTo(x - byte / 2, y - byte / 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x + byte / 2, y - byte / 2);
  ctx.fill();
}

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function degreestoradians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function vproduct(arr1, arr2) {
  var sum = 0;

  for (var i = 0; i < arr1.length; i++) {
    sum += arr1[i] * arr2[i];
  }

  return sum;
}

function dot(v1, v2) {
  return v1[0] * v1[1] + v2[0] * v2[1];
}

function drawmousetrail() {
  try {
    ctx.strokeStyle = 'white';
    var draww = ballwidth / 2;
    ctx.lineWidth = draww;
    var ld = ballwidth + draww / 2;
    var r = 0;

    while (r < mousetrail.length) {
      ctx.beginPath();
      var s = 0;

      while (s < mousetrail[r].length) {
        var xp = mousetrail[r][s][0];
        var yp = mousetrail[r][s][1];

        if (xp < width && yp < height) {
          ctx.lineTo(xp, yp);
        } // just quickly check if it is in contact with any of the balls


        var bl = 0;

        while (bl < bx.length) {
          if (bx[bl] - ld < xp && bx[bl] + ld > xp && by[bl] - ld < yp && by[bl] + ld > yp) {
            // process it
            // so basically ball bl and line r have contacted
            // get the general angle of r
            var deltax = void 0;
            var deltay = void 0;

            if (s < 2) {
              deltax = mousetrail[r][s + 1][0] - mousetrail[r][s][0];
              deltay = mousetrail[r][s + 1][1] - mousetrail[r][s][1]; //console.log('called this btw',mousetrail[r][s+1][1], mousetrail[r][s][1]);
            } else {
              deltax = mousetrail[r][s][0] - mousetrail[r][s - 2][0];
              deltay = mousetrail[r][s][1] - mousetrail[r][s - 2][1];
            }

            if (deltax == 0) {
              if (deltay > 0) {
                deltax = 0.01;
              } else {
                deltax = -0.01;
              }
            }

            var theta = radians_to_degrees(Math.atan(deltay / deltax)); //console.log('old velocities',dx[bl],dy[bl]);
            // ok this is gonna be another try

            var Velocity_Magnitude = Math.sqrt(dx[bl] * dx[bl] + dy[bl] * dy[bl]); //console.log('mid');
            // let new_x = dx + vx * Velocity_Magnitude * Time_Interval

            var nx = -Math.sin(degreestoradians(theta));
            var ny = Math.cos(degreestoradians(theta)); //console.log('nx ny',nx,ny);

            var dt = dx[bl] * nx + dy[bl] * ny; //console.log('dt',dt);

            var vnewx = dx[bl] - 2 * dt * nx;
            var vnewy = dy[bl] - 2 * dt * ny; //console.log('vnews',vnewx,vnewy);

            dx[bl] = vnewx;
            dy[bl] = vnewy; //console.log('new velocities',dx[bl],dy[bl]);
            // in contact
            // disable that line

            mousetrail[r] = []; // we cud have splcied lets just splice

            mousetrail.splice(r, 1);
            mousedown = false;
          }

          bl += 1;
        }

        s += 1;
      }

      ctx.stroke();
      r += 1;
    }
  } catch (_unused) {}
}

function inholerange(lucid, hole) {
  var holerangerad = holewidth * 1.5 / 2;
  return bx[lucid] > holecenters[hole][0] - holerangerad && bx[lucid] < holecenters[hole][0] + holerangerad && by[lucid] > holecenters[hole][1] - holerangerad && by[lucid] < holecenters[hole][1] + holerangerad;
}

function yoinkball(ball, hole) {
  var distx = holecenters[hole][0] - bx[ball];
  var disty = holecenters[hole][1] - by[ball];
  var accx = distx * 0.05;
  var accy = disty * 0.05;

  if (accx < 0) {
    accx = -(accx * accx);
  } else {
    accx = accx * accx;
  }

  if (accy < 0) {
    accy = -(accy * accy);
  } else {
    accy = accy * accy;
  }

  dx[ball] += accx;
  dy[ball] += accy; // dampen both

  dx[ball] = dx[ball] * 0.6;
  dy[ball] = dy[ball] * 0.6; // the acceleration is proportional to the actual distance
}

function randcolor() {
  return "rgb(" + Math.floor(Math.random() * 200 + 55) + "," + Math.floor(Math.random() * 200 + 55) + "," + Math.floor(Math.random() * 200 + 55) + ")";
}

function quadfm(a, b, c) {
  var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a);
  var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a); // we only care about the first one
  //return Math.max(result2,result);

  return [result, result2];
}

function computev(v1, v2) {
  var x = v1 * v1 + v2 * v2;
  var z = v1 + v2;
  var v1f = quadfm(2, -2 * z, z * z - x); // final v for v1
  // so we have 2 options pick the one thats differnt

  if (v1f[0] == v1) {
    v1f = v1f[1]; // pick the other one
  } else {
    v1f = v1f[0];
  }

  var v2f = z - v1f;
  return [v1f, v2f];
}

function bounce(num1, num2) {
  var thexx = computev(dx[num1], dx[num2]);
  dx[num1] = thexx[0];
  dx[num2] = thexx[1];
  var theyy = computev(dy[num1], dy[num2]);
  dy[num1] = theyy[0];
  dy[num2] = theyy[1];
}

function touching(num1, num2) {
  return Math.sqrt(Math.pow(bx[num1] - bx[num2], 2) + Math.pow(by[num1] - by[num2], 2)) <= ballwidth * 2 && bx[num1] < width + borderwidth;
}

function dist1(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function shrinkball(num, hole) {
  var loser, u, endTime, time, wn;
  return regeneratorRuntime.async(function shrinkball$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(clrs[num] != holecolors[hole])) {
            _context2.next = 9;
            break;
          }

          // you lost
          //alert("Oops! Ball entered hole of wrong color");
          //location.reload();
          audi.pause();
          loseaudio.play();
          loser = document.getElementById('lose-dialogue');
          loser.style.display = 'block';
          loser.style.opacity = 1;
          lost = true;
          _context2.next = 25;
          break;

        case 9:
          // you got a ball
          getaudio.play();
          u = 100;

        case 11:
          if (!(u > 0)) {
            _context2.next = 18;
            break;
          }

          bwidths[num] = u / 100 * ballwidth; //console.log(bwidths);

          _context2.next = 15;
          return regeneratorRuntime.awrap(sleep(2));

        case 15:
          u -= 1;
          _context2.next = 11;
          break;

        case 18:
          if (clrs[num] == BLUE) {
            togglebluelock();
          }

          bwidths[num] = ballwidth;
          bx[num] = width + byte * 2; // this may be wrong

          by[num] = byte * 8;
          dx[num] = 0; // shud already be but anyway

          dy[num] = 0; // but we accelerate this;

          if (numgotten >= bx.length) {
            // you won
            audi.pause();
            winaudio.play();
            endTime = new Date();
            time = endTime - startTime;
            time = time / 1000;
            console.log('map' + mapnum);
            localStorage.setItem('map' + mapnum, time); //alert('You won! Time taken: '+time+" sec");

            lost = true; // ik its not loss but whatever LMAO

            wn = document.getElementById('win-dialogue');
            wn.style.opacity = 1;
            wn.style.display = 'block';
          }

        case 25:
        case "end":
          return _context2.stop();
      }
    }
  });
}

var getAllSubsets = function getAllSubsets(theArray) {
  return theArray.reduce(function (subsets, value) {
    return subsets.concat(subsets.map(function (set) {
      return [value].concat(_toConsumableArray(set));
    }));
  }, [[]]);
};

function releaseball(r) {
  return regeneratorRuntime.async(function releaseball$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // release it
          releasedstatuses[r] = true;
          console.log("releasing", r, bx); // let u = 100;
          // while (u > 0){
          //   bwidths[r] = u/100*ballwidth;
          //   //console.log(bwidths);
          //   await sleep(2);
          //   u -= 1;
          // }

          bx[r] = releaser[0]; // set the coord;

          by[r] = releaser[1]; // while (u < 100){
          //   bwidths[r] = u/100*ballwidth;
          //   //console.log(bwidths);
          //   await sleep(2);
          //   u += 1;
          // }

          dx[r] = tempdx[r];
          dy[r] = tempdy[r];
          console.log(dx, tempdx);
          pushballs();
          univrb = true;

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function pushballs() {
  // we have nextgap time to move it down ballwidth/2 px;
  // we are nextt/nextgap through this
  // to move it ballwidth px in nextgap time it needs to have velocity ballwidth/nextgap
  var d = 0;

  while (d < dy.length) {
    if (!releasedstatuses[d]) {
      dy[d] = ballwidth / nextgap / 20;
    }

    d += 1;
  }
}

function addball() {
  bx.push(Math.floor(Math.random() * width));
  by.push(Math.floor(Math.random() * height));
  dx.push(Math.floor(Math.random() * 6) - 3);
  dy.push(Math.floor(Math.random() * 6) - 3);
  bwidths.push(ballwidth);

  if (Math.random() < 0.5) {
    clrs.push(BLUE);
  } else {
    clrs.push(ORANGE);
  }
}

function sfactorize(arr) {
  var t = 0;

  while (t < arr.length) {
    arr[t] = arr[t] * sfactor;
    t += 1;
  }

  return arr;
}

function byteize(arr) {
  var t = 0;

  while (t < arr.length) {
    arr[t] = [arr[t][0] * byte, arr[t][1] * byte];
    t += 1;
  }

  return arr;
}

function byteize1d(arr) {
  var t = 0;

  while (t < arr.length) {
    arr[t] = arr[t] * byte;
    t += 1;
  }

  return arr;
}

function zeroarr(arr) {
  var e = 0;
  var newarr = [];

  while (e < arr.length) {
    newarr.push(0); // no this overwrites it

    e += 1;
  }

  return newarr;
}

function setarr(arr) {
  var e = 0;
  var newarr = [];

  while (e < arr.length) {
    newarr.push(3.5); // no this overwrites it

    e += 1;
  }

  return newarr;
}

function addpoint() {
  // adding mousetrail[mousetrail.length-1].push(mousepos);
  var ln = mousetrail[mousetrail.length - 1];

  if (ln.length > 0) {
    var lp = ln[ln.length - 1];

    if (dist1(lp[0], lp[1], mousepos[0], mousepos[1]) > ballwidth) {
      console.log('called this');
      var midp = [(mousepos[0] + lp[0]) / 2, (mousepos[1] + lp[1]) / 2];
      mousetrail[mousetrail.length - 1].push(midp);
    }
  }

  mousetrail[mousetrail.length - 1].push(mousepos); // add this point regardless
}

var loaded = false; // ballwidth, sfactor and other defined in first.js

var borderwidth = byte;
var holewidth = ballwidth * 2;
var mousedown = false;
var mousepos = [0, 0];
var mousetrail = [];
var startTime = new Date();
var numgotten = 0;
var lost = false; //get the map we are going to use

var map;
var mapnum = -1;
var pushlimit = 2;

if (window.location.href.includes("map10")) {
  map = getmap10();
  mapnum = 10;
} else if (window.location.href.includes("map11")) {
  map = getmap11();
  mapnum = 11;
} else if (window.location.href.includes("map12")) {
  map = getmap12();
  mapnum = 12;
} else if (window.location.href.includes("map13")) {
  map = getmap13();
  mapnum = 13;
} else if (window.location.href.includes("map14")) {
  map = getmap14();
  mapnum = 14;
} else if (window.location.href.includes("map15")) {
  map = getmap15();
  mapnum = 15;
} else if (window.location.href.includes("map16")) {
  map = getmap16();
  mapnum = 16;
} else if (window.location.href.includes("map17")) {
  map = getmap17();
  mapnum = 17;
} else if (window.location.href.includes("map18")) {
  map = getmap18();
  mapnum = 18;
} else if (window.location.href.includes("map19")) {
  map = getmap19();
  mapnum = 19;
} else if (window.location.href.includes("map20")) {
  map = getmap20();
  mapnum = 20;
} else if (window.location.href.includes("map21")) {
  map = getmap21();
  mapnum = 21;
} else if (window.location.href.includes("map22")) {
  map = getmap22();
  mapnum = 22;
} else if (window.location.href.includes("map23")) {
  map = getmap23();
  mapnum = 23;
} else if (window.location.href.includes("map24")) {
  map = getmap24();
  mapnum = 24;
} else if (window.location.href.includes("map25")) {
  map = getmap25();
  mapnum = 25;
} else if (window.location.href.includes("map26")) {
  map = getmap26();
  mapnum = 26;
} else if (window.location.href.includes("map27")) {
  map = getmap27();
  mapnum = 27;
  pushlimit = 1.6;
} else if (window.location.href.includes("map28")) {
  map = getmap28();
  mapnum = 28;
} else if (window.location.href.includes("map29")) {
  map = getmap29();
  mapnum = 29;
} else if (window.location.href.includes("map30")) {
  map = getmap30();
  mapnum = 30;
} else if (window.location.href.includes("map31")) {
  map = getmap31();
  mapnum = 31;
} else if (window.location.href.includes("map1")) {
  map = getmap1();
  mapnum = 1;
} else if (window.location.href.includes("map2")) {
  map = getmap2();
  mapnum = 2;
} else if (window.location.href.includes("map3")) {
  map = getmap3();
  mapnum = 3;
} else if (window.location.href.includes("map4")) {
  map = getmap4();
  mapnum = 4;
} else if (window.location.href.includes("map5")) {
  map = getmap5();
  mapnum = 5;
} else if (window.location.href.includes("map6")) {
  map = getmap6();
  mapnum = 6;
} else if (window.location.href.includes("map7")) {
  map = getmap7();
  mapnum = 7;
} else if (window.location.href.includes("map8")) {
  map = getmap8();
  mapnum = 8;
} else if (window.location.href.includes("map9")) {
  map = getmap9();
  mapnum = 9;
} else {
  window.location.href = "./app.html";
}

var bx = byteize1d(map.bx);
var by = byteize1d(map.by);
var dx = sfactorize(map.dx);
var dy = sfactorize(map.dy);
var lastdx = dx;
var lastdy = dy;
var tempdx = dx; //if needed

var tempdy = dy;
var clrs = map.clrs; //holes

var holecenters = byteize(map.holecenters); // the centers

var holecolors = map.holecolors; // the centers
// blocks

var blocks = byteize(map.blocks);
var testing = true; //timedblocks

var timedblocks = [];
var antitimedblocks = [];
var timedblockinterval = 3000;

if (map.timedblocks != null) {
  timedblocks = byteize(map.timedblocks);
  antitimedblocks = byteize(map.antitimedblocks);
  timedblockinterval = map.timedblockinterval;
}

var tbtimer = 0; // pushers

var leftpusher = [];
var rightpusher = [];
var uppusher = [];
var downpusher = [];
var pushtimer = 0;

if (map.uppusher != null) {
  uppusher = byteize(map.uppusher);
}

if (map.rightpusher != null) {
  rightpusher = byteize(map.rightpusher);
}

if (map.downpusher != null) {
  downpusher = byteize(map.downpusher);
}

if (map.leftpusher != null) {
  leftpusher = byteize(map.leftpusher);
} // lock blocks


var bluelocks = [];
var bluefade = 100;
var blueon = true;

if (map.bluelockblock != null) {
  blueon = map.initiallock;

  if (!blueon) {
    bluefade = 0;
  }

  bluelocks = byteize(map.bluelockblock);
} // blue breakers


var bluebreakers = [];

if (map.bluebreakblocks != null) {
  bluebreakers = byteize(map.bluebreakblocks);
} // releaser


var releaser = map.releasepoint;

if (releaser != null) {
  releaser = [releaser[0] * byte - ballwidth / 4, releaser[1] * byte - ballwidth / 4];
  dx = zeroarr(dx);
  dy = setarr(dx);
}

var releasetimes = map.releasetimes;
var releasedstatuses = [false, false, false, false, false, false, false, false, false, false, false, false];
var nextgap = 1;
var nextt = 1;
var univtimer = 0;
var univrb = false;
var bwidths = [ballwidth, ballwidth, ballwidth, ballwidth];
var bounceexp = [0, 0, 0, 0];

if (bx.length > 4) {
  bwidths = [ballwidth, ballwidth, ballwidth, ballwidth, ballwidth, ballwidth, ballwidth, ballwidth];
  bounceexp = [0, 0, 0, 0, 0, 0, 0, 0];
} // some collision presets
// not presets just defined things


var subs = getAllSubsets(_toConsumableArray(Array(dx.length).keys())); //console.log(subs);
// filter for length 2;

var newsubs = [];
var i = 0;

while (i < subs.length) {
  if (subs[i].length == 2) {
    newsubs.push(subs[i]);
  }

  i += 1;
} // now create a timer sort of thing


var collisiontimer = [];
var hee = 0;

while (hee < newsubs.length) {
  collisiontimer.push(60);
  hee += 1;
} // size the control panel rlly quickly


var cpanel = document.getElementById('right-panel');
cpanel.style.left = width + byte * 2.5 + ballwidth + 'px';
cpanel.style.height = window.innerHeight - 20 + 'px';
cpanel.style.width = window.innerWidth - (width + byte * 3.5 + ballwidth) + 'px'; // main loop

var y = 0; // start the async here so we dont start the game before loading the data

(function _callee() {
  var lucid, o, ye, g, allowd, lasttimee, r;
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(y < 1 || testing)) {
            _context4.next = 35;
            break;
          }

          //a big ol background rect
          drawbg();
          drawmousetrail();

          if (mousedown) {
            addpoint(); //console.log(mousetrail);
          }

          ctx.fillStyle = 'red';
          lucid = 0;

          while (lucid < bx.length) {
            ctx.beginPath();
            ctx.arc(bx[lucid], by[lucid], bwidths[lucid], 0, Math.PI * 2);
            ctx.fillStyle = clrs[lucid];
            ctx.fill();

            if (dx[lucid] == NaN || isNaN(dx[lucid])) {
              dx[lucid] = lastdx[lucid];
            }

            if (dy[lucid] == NaN || isNaN(dy[lucid])) {
              dy[lucid] = lastdy[lucid];
            }

            lucid += 1;
          }

          lastdx = dx;
          lastdy = dy;

          if (!lost) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("break", 35);

        case 11:
          lucid = 0;

          while (lucid < bx.length) {
            bx[lucid] += dx[lucid];
            by[lucid] += dy[lucid];
            lucid += 1;
          }

          lucid = 0;

          while (lucid < bx.length) {
            if (bx[lucid] < ballwidth + borderwidth) {
              dx[lucid] = Math.abs(dx[lucid]);
            } else if (bx[lucid] > width - ballwidth - borderwidth) {
              dx[lucid] = -Math.abs(dx[lucid]);
            }

            if (by[lucid] < ballwidth + borderwidth) {
              dy[lucid] = Math.abs(dy[lucid]);
            } else if (by[lucid] > height - ballwidth - borderwidth) {
              if (bx[lucid] > width + borderwidth && by[lucid] > byte * 7) {// an out ball
              } else {
                // bounce at full
                dy[lucid] = -Math.abs(dy[lucid]);
              }
            }

            if (bx[lucid] > width + borderwidth && by[lucid] > byte * 7) {
              // it is an out ball
              // make sure its at rest horizontally
              dx[lucid] = 0;

              if (by[lucid] < height - borderwidth - ballwidth * numgotten * 2) {
                // in range
                dy[lucid] += 1;
              } else {
                dy[lucid] = -Math.abs(dy[lucid] * 0.7);
              }
            } else if (bx[lucid] > width) {
              // this is a starting ball
              if (by[lucid] > byte * 6.5 - ballwidth) {
                // it is over
                dy[lucid] = 0;
                by[lucid] = byte * 6.5 - ballwidth;
              }
            } // quickly check if it is contacting any of the blocks


            o = 0;

            while (o < blocks.length) {
              //console.log(dist1(4*byte,4*byte,bx[0],by[0]),ballwidth+byte/2);
              if (dist1(blocks[o][0], blocks[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                //console.log('close enough');
                // contacted
                // is it in line horizontally
                if (bx[lucid] > blocks[o][0] - byte / 2 - ballwidth / 1.5 && bx[lucid] < blocks[o][0] + byte / 2 + ballwidth / 1.5) {
                  // it is either above or below
                  if (by[lucid] < blocks[o][1]) {
                    // reflect up
                    //console.log('tried to reflect up');
                    dy[lucid] = -Math.abs(dy[lucid]);
                  } else {
                    // reflect down
                    //console.log('tried to reflect down', by[lucid] , blocks[o][1]);
                    dy[lucid] = Math.abs(dy[lucid]);
                  }
                } // is it in line vertically


                if (by[lucid] > blocks[o][1] - byte / 2 - ballwidth / 1.5 && by[lucid] < blocks[o][1] + byte / 2 + ballwidth / 1.5) {
                  if (bx[lucid] < blocks[o][0] - byte / 2) {
                    // reflect left
                    dx[lucid] = -Math.abs(dx[lucid]);
                  } else {
                    // reflect right
                    dx[lucid] = Math.abs(dx[lucid]);
                  }
                }
              }

              o += 1;
            } // timedblocks


            o = 0;

            while (o < timedblocks.length && tbtimer < timedblockinterval / 2 - 50) {
              if (dist1(timedblocks[o][0], timedblocks[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                if (bx[lucid] > timedblocks[o][0] - byte / 2 - ballwidth / 1.5 && bx[lucid] < timedblocks[o][0] + byte / 2 + ballwidth / 1.5) {
                  if (by[lucid] < timedblocks[o][1]) {
                    dy[lucid] = -Math.abs(dy[lucid]);
                  } else {
                    dy[lucid] = Math.abs(dy[lucid]);
                  }
                }

                if (by[lucid] > timedblocks[o][1] - byte / 2 - ballwidth / 1.5 && by[lucid] < timedblocks[o][1] + byte / 2 + ballwidth / 1.5) {
                  if (bx[lucid] < timedblocks[o][0] - byte / 2) {
                    dx[lucid] = -Math.abs(dx[lucid]);
                  } else {
                    dx[lucid] = Math.abs(dx[lucid]);
                  }
                }
              }

              o += 1;
            } // antitimedblocks


            o = 0;

            while (o < antitimedblocks.length && tbtimer > timedblockinterval / 2 + 50) {
              if (dist1(antitimedblocks[o][0], antitimedblocks[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                if (bx[lucid] > antitimedblocks[o][0] - byte / 2 - ballwidth / 1.5 && bx[lucid] < antitimedblocks[o][0] + byte / 2 + ballwidth / 1.5) {
                  if (by[lucid] < antitimedblocks[o][1]) {
                    dy[lucid] = -Math.abs(dy[lucid]);
                  } else {
                    dy[lucid] = Math.abs(dy[lucid]);
                  }
                }

                if (by[lucid] > antitimedblocks[o][1] - byte / 2 - ballwidth / 1.5 && by[lucid] < antitimedblocks[o][1] + byte / 2 + ballwidth / 1.5) {
                  if (bx[lucid] < antitimedblocks[o][0] - byte / 2) {
                    dx[lucid] = -Math.abs(dx[lucid]);
                  } else {
                    dx[lucid] = Math.abs(dx[lucid]);
                  }
                }
              }

              o += 1;
            } // blue locks


            o = 0;

            while (o < bluelocks.length && blueon) {
              if (dist1(bluelocks[o][0], bluelocks[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                if (bx[lucid] > bluelocks[o][0] - byte / 2 - ballwidth / 1.5 && bx[lucid] < bluelocks[o][0] + byte / 2 + ballwidth / 1.5) {
                  if (by[lucid] < bluelocks[o][1]) {
                    dy[lucid] = -Math.abs(dy[lucid]);
                  } else {
                    dy[lucid] = Math.abs(dy[lucid]);
                  }
                }

                if (by[lucid] > bluelocks[o][1] - byte / 2 - ballwidth / 1.5 && by[lucid] < bluelocks[o][1] + byte / 2 + ballwidth / 1.5) {
                  if (bx[lucid] < bluelocks[o][0] - byte / 2) {
                    dx[lucid] = -Math.abs(dx[lucid]);
                  } else {
                    dx[lucid] = Math.abs(dx[lucid]);
                  }
                }
              }

              o += 1;
            } // blue breakers


            o = 0;

            while (o < bluebreakers.length) {
              if (dist1(bluebreakers[o][0], bluebreakers[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                if (bx[lucid] > bluebreakers[o][0] - byte / 2 - ballwidth / 1.5 && bx[lucid] < bluebreakers[o][0] + byte / 2 + ballwidth / 1.5) {
                  if (by[lucid] < bluebreakers[o][1]) {
                    dy[lucid] = -Math.abs(dy[lucid]);
                  } else {
                    dy[lucid] = Math.abs(dy[lucid]);
                  }
                }

                if (by[lucid] > bluebreakers[o][1] - byte / 2 - ballwidth / 1.5 && by[lucid] < bluebreakers[o][1] + byte / 2 + ballwidth / 1.5) {
                  if (bx[lucid] < bluebreakers[o][0] - byte / 2) {
                    dx[lucid] = -Math.abs(dx[lucid]);
                  } else {
                    dx[lucid] = Math.abs(dx[lucid]);
                  }
                } // we are bouncing


                if (clrs[lucid] == BLUE) {
                  bluebreakers.splice(o, 1);
                }
              }

              o += 1;
            } // pushers


            o = 0;

            while (o < leftpusher.length) {
              if (dist1(leftpusher[o][0], leftpusher[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                // accelerate if not above threshold
                if (dx[lucid] > -pushlimit) {
                  dx[lucid] -= 0.1;
                }
              }

              o += 1;
            }

            o = 0;

            while (o < downpusher.length) {
              if (dist1(downpusher[o][0], downpusher[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                // accelerate if not above threshold
                if (dy[lucid] < pushlimit) {
                  dy[lucid] += 0.1;
                }
              }

              o += 1;
            }

            o = 0;

            while (o < rightpusher.length) {
              if (dist1(rightpusher[o][0], rightpusher[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                // accelerate if not above threshold
                if (dx[lucid] < pushlimit) {
                  dx[lucid] += 0.1;
                }
              }

              o += 1;
            }

            o = 0;

            while (o < uppusher.length) {
              if (dist1(uppusher[o][0], uppusher[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                // accelerate if not above threshold
                if (dy[lucid] > -pushlimit) {
                  dy[lucid] -= 0.1;
                }
              }

              o += 1;
            }

            lucid += 1;
          } // now process hitting each other
          // are they close enough
          // assume 4 balls max for now
          // get the subsets
          // we already got the subsets
          // upgrade the collision timers


          ye = 0;

          while (ye < collisiontimer.length) {
            collisiontimer[ye] += 1;
            ye += 1;
          } //console.log(newsubs);
          // now try each of them


          i = 0;

          while (i < newsubs.length) {
            if ((collisiontimer[i] > 30 || bx[newsubs[i][0]] > width && bx[newsubs[i][1]] > width) && touching(newsubs[i][0], newsubs[i][1])) {
              bounce(newsubs[i][0], newsubs[i][1]); // now if we do the bounce set the timer

              collisiontimer[i] = 0;

              if (!(bx[newsubs[i][0]] > width && bx[newsubs[i][1]] > width)) {
                collisionaudio.play();
              }
            }

            i += 1;
          } // is its center close enough to the hole


          lucid = 0; // for every single ball

          while (lucid < bx.length) {
            // for every single hole
            g = 0;

            while (g < holecenters.length) {
              if (inholerange(lucid, g)) {
                // this is in
                // so basically have some acceleration towards the hole   
                yoinkball(lucid, g);
              }

              g += 1;
            } // is it inside the hole


            allowd = holewidth / 20;
            g = 0;

            while (g < holecenters.length) {
              if (bx[lucid] > holecenters[g][0] - allowd && bx[lucid] < holecenters[g][0] + allowd && by[lucid] > holecenters[g][1] - allowd && by[lucid] < holecenters[g][1] + allowd) {
                // this one is in the hole
                if (bwidths[lucid] == ballwidth) {
                  dx[lucid] = 0;
                  dy[lucid] = 0;
                  shrinkball(lucid, g);
                  numgotten += 1;
                }
              }

              g += 1;
            }

            lucid += 1;
          } // if (univrb){
          //   console.log('pushed');
          //   pushballs();
          //   univrb = false;
          // }


          nextgap = 1;
          lasttimee = 0;

          if (releaser != null) {
            r = 0;

            while (r < releasetimes.length) {
              if (univtimer > releasetimes[r] && !releasedstatuses[r]) {
                // release it
                //console.log('called for ',r,' on time ',releasetimes[r]);
                releaseball(r);
              }

              if (nextgap == 1 && !releasedstatuses[r]) {
                // what was the total time since the last one
                nextgap = releasetimes[r] - lasttimee; // what is the time remaining from now till that time

                nextt = releasetimes[r] - univtimer;
              }

              lasttimee = releasetimes[r];
              r += 1;
            }
          }

          if (audi.currentTime >= audi.duration) {
            audi.currentTime = 0;
            audi.play();
          }

          tbtimer += 1;

          if (tbtimer >= timedblockinterval) {
            tbtimer = 0;
          }

          pushtimer += 0.1;

          if (pushtimer >= byte / 2) {
            pushtimer = 0;
          }

          y += 1;
          univtimer += 1;
          _context4.next = 33;
          return regeneratorRuntime.awrap(sleep());

        case 33:
          _context4.next = 0;
          break;

        case 35:
        case "end":
          return _context4.stop();
      }
    }
  });
})(); // ok thats it for the main loop
// keypress processing


(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
              return;
            }

            var actkey = event.code.replace('Key', '');
            var filterletters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
          }, true);

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
})();