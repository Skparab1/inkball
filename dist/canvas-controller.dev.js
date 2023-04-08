"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// canvas template
var canvas = document.querySelector('.myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 20;

var _byte = 2 * ((window.innerHeight - 100) / (16 * 2.2));

var width = window.innerWidth - 20 - window.innerWidth / 25 - window.innerWidth / 60;
var height = canvas.height = window.innerHeight - 20; // gonna make a full sized canvas with a little bit of ground leeway
// now you can clearred fillrect fillstyle arc on the ctx
// for animations

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
    ctx.fillStyle = 'orange';
    ctx.fillRect(holecenters[j][0] - holewidth * 1.5 / 2, holecenters[j][1] - holewidth * 1.5 / 2, holewidth * 1.5, holewidth * 1.5);
    ctx.fillStyle = 'black';
    ctx.arc(holecenters[j][0], holecenters[j][1], holewidth / 2, 0, Math.PI * 2);
    ctx.fill();
    j += 1;
  }
}

function mouse_position() {
  var e = window.event;
  var posX = e.clientX;
  var posY = e.clientY;
  mousepos = [posX, posY]; //console.log(mousetrail);

  if (mousedown) {
    mousetrail[mousetrail.length - 1].push(mousepos); //console.log(mousetrail);
  }
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
        ctx.lineTo(xp, yp); // just quickly check if it is in contact with any of the balls

        var bl = 0;

        while (bl < bx.length) {
          if (bx[bl] - ld < xp && bx[bl] + ld > xp && by[bl] - ld < yp && by[bl] + ld > yp) {
            // process it
            // so basically ball bl and line r have contacted
            // get the general angle of r
            var deltax = void 0;
            var deltay = void 0;

            if (s <= 2) {
              deltax = mousetrail[r][s + 2][0] - mousetrail[r][s][0];
              deltay = mousetrail[r][s + 2][1] - mousetrail[r][s][1];
              console.log('called this btw', mousetrail[r][s + 1][1], mousetrail[r][s][1]);
            } else {
              deltax = mousetrail[r][s][0] - mousetrail[r][s - 2][0];
              deltay = mousetrail[r][s][1] - mousetrail[r][s - 2][1];
            }

            if (deltax == 0) {
              if (deltay < 0) {
                deltax = 0.01;
              } else {
                deltax = -0.01;
              }
            } // let vn = [deltay*100,deltax*100];
            // let vi = [dx[bl],dy[bl]];
            // let vidotvn = dot(vi,vn);
            // let zx = vidotvn; // this is the x component if it was straight
            // // now we have to conserve the magnitude so
            // let zy = Math.sqrt((dx[bl]*dx[bl]+dy[bl]*dy[bl])-zx*zx);
            // // let currentdeltamag = Math.sqrt(deltax*deltax+deltay*deltay);
            // // let wantedmagnitude = zx;
            // // let pushx = wantedmagnitude/currentdeltamag*deltax;
            // // let pushy = wantedmagnitude/currentdeltamag*deltay;
            // // now actual
            // zx = dot([zx,zy],[100,0]);
            // // now conserve magnitude so
            // zy = Math.sqrt((dx[bl]*dx[bl]+dy[bl]*dy[bl])-zx*zx);
            // dx[bl] = zx;
            // dy[bl] = zy;
            // //Ve = Vi - 2 * (Vi dot Vn) * Vn


            var theta = radians_to_degrees(Math.atan(deltay / deltax));
            var e = radians_to_degrees(Math.atan(dy[bl] / dx[bl]));
            var endangle = 2 * theta - e; // // sometimes this angle will have to be changed
            // if (deltax/deltay < 0){
            //   if (by/bx < 0){
            //     // endangle = 180-endangle;
            //     // endangle = endangle;
            //   } else {
            //     // dont need to do anything ig
            //   }
            // } else {
            //   if (by/bx < 0){
            //   } else {
            //     //endangle = 180-endangle;
            //   }
            // }
            // the magnitude should still be the same
            // let magnitude = Math.sqrt(dx[bl]*dx[bl]+dy[bl]*dy[bl]);

            console.log('old velocities', dx[bl], dy[bl]); // let supnewx = magnitude*Math.cos(degreestoradians(endangle));
            // let supnewy = magnitude*Math.sin(degreestoradians(endangle));
            // if (supnewx == dx[bl]){
            //   dx[bl] = -supnewx;
            // } else {
            //   dx[bl] = supnewx;
            // }
            // if (supnewy == dy[bl]){
            //   dy[bl] = -supnewy;
            // } else {
            //   dy[bl] = supnewy;
            // }
            // if (Math.abs(deltax) < 5){
            //   console.log('vertical triggered');
            //   dx[bl] = -dx[bl];
            //   dy[bl] = supnewy;
            // } else if (Math.abs(deltay) < 5){
            //   console.log('horizontal triggered');
            //   dy[bl] = -dy[bl];
            //   dx[bl] = supnewx;
            // } else {
            //   dx[bl] = supnewx;
            //   dy[bl] = supnewy;
            // }
            // ok this is gonna be another try

            var Velocity_Magnitude = Math.sqrt(dx[bl] * dx[bl] + dy[bl] * dy[bl]); // let new_x = dx + vx * Velocity_Magnitude * Time_Interval

            var nx = -Math.sin(degreestoradians(theta));
            var ny = Math.cos(degreestoradians(theta));

            var _dot = dx[bl] * nx + dy[bl] * ny;

            var vnewx = vx - 2 * _dot * nx;
            var vnewy = vy - 2 * _dot * ny;
            dx[bl] = vnewx;
            dy[bl] = vnewy;
            console.log('new velocities', dx[bl], dy[bl]); // in contact
            // disable that line

            mousetrail[r] = []; // we cud have splcied but this garuntees a break

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

function shrinkball(num) {
  var u;
  return regeneratorRuntime.async(function shrinkball$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          u = 100;

        case 1:
          if (!(u > 0)) {
            _context.next = 8;
            break;
          }

          bwidths[num] = u / 100 * ballwidth; //console.log(bwidths);

          _context.next = 5;
          return regeneratorRuntime.awrap(sleep(2));

        case 5:
          u -= 1;
          _context.next = 1;
          break;

        case 8:
          bwidths[num] = ballwidth;
          bx[num] = width + borderwidth + ballwidth;
          by[num] = ballwidth;
          dx[num] = 0; // shud already be but anyway

          dy[num] = 0; // but we accelerate this;

        case 13:
        case "end":
          return _context.stop();
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

var ballwidth = window.innerWidth / 55;
var borderwidth = window.innerWidth / 60;
var holewidth = ballwidth * 2;
var numgotten = 0;
var bx = [100];
var by = [100];
var dx = [1];
var dy = [0];
var BLUE = "rgb(3, 161, 252)";
var ORANGE = "rgb(252, 115, 3)";
var clrs = [BLUE];
var bwidths = [ballwidth];
var bounceexp = [0, 0, 0, 0];
var mousedown = false;
var mousepos = [0, 0];
var mousetrail = []; //addball();
// addball();
//holes

var holecenters = [[width - borderwidth - holewidth / 1.33, height - borderwidth - holewidth / 1.33], [borderwidth + holewidth / 1.33, height - borderwidth - holewidth / 1.33]]; // the centers

var testing = true; // main loop

var y = 0;

(function _callee() {
  var lucid, subs, newsubs, i, g, allowd;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(y < 10 || testing)) {
            _context2.next = 24;
            break;
          }

          //a big ol background rect
          drawbg();
          drawmousetrail();

          if (mousedown) {
            mousetrail[mousetrail.length - 1].push(mousepos); //console.log(mousetrail);
          }

          ctx.fillStyle = 'red';
          lucid = 0;

          while (lucid < bx.length) {
            ctx.beginPath();
            ctx.arc(bx[lucid], by[lucid], bwidths[lucid], 0, Math.PI * 2);
            ctx.fillStyle = clrs[lucid];
            ctx.fill();
            lucid += 1;
          }

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
              if (bx[lucid] > width + borderwidth) {// an out ball
              } else {
                // bounce at full
                dy[lucid] = -Math.abs(dy[lucid]);
              }
            }

            if (bx[lucid] > width + borderwidth) {
              // it is an out ball
              if (by[lucid] < height - borderwidth - ballwidth * numgotten * 2) {
                // in range
                dy[lucid] += 1;
              } else {
                dy[lucid] = -Math.abs(dy[lucid] * 0.7);
              }
            }

            lucid += 1;
          } // now process hitting each other
          // are they close enough
          // assume 4 balls max for now
          // get the subsets


          subs = getAllSubsets(_toConsumableArray(Array(dx.length).keys())); //console.log(subs);
          // filter for length 2;

          newsubs = [];
          i = 0;

          while (i < subs.length) {
            if (subs[i].length == 2) {
              newsubs.push(subs[i]);
            }

            i += 1;
          } //console.log(newsubs);
          // now try each of them


          i = 0;

          while (i < newsubs.length) {
            if (touching(newsubs[i][0], newsubs[i][1])) {
              bounce(newsubs[i][0], newsubs[i][1]);
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
                  shrinkball(lucid);
                  numgotten += 1;
                }
              }

              g += 1;
            }

            lucid += 1;
          }

          y += 1;
          _context2.next = 22;
          return regeneratorRuntime.awrap(sleep());

        case 22:
          _context2.next = 0;
          break;

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  });
})(); // ok thats it for the main loop
// keypress processing


(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
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
          return _context3.stop();
      }
    }
  });
})();