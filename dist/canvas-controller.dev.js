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
// set up the audio

var audi = new Audio('audio.mp3');
audi.play(); // for animations

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

  while (j < blocks.length) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(blocks[j][0] - byte / 2, blocks[j][1] - byte / 2, byte, byte);
    j += 1;
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

            if (s <= 2) {
              deltax = mousetrail[r][s + 2][0] - mousetrail[r][s][0];
              deltay = mousetrail[r][s + 2][1] - mousetrail[r][s][1]; //console.log('called this btw',mousetrail[r][s+1][1], mousetrail[r][s][1]);
            } else {
              deltax = mousetrail[r][s][0] - mousetrail[r][s - 2][0];
              deltay = mousetrail[r][s][1] - mousetrail[r][s - 2][1];
            }

            if (deltax == 0) {
              if (deltax < 0) {
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

function dist1(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function shrinkball(num, hole) {
  var u, endTime, time;
  return regeneratorRuntime.async(function shrinkball$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // first of all is the ball in the holw of its color or not
          // cuz if not then you lost
          if (clrs[num] != holecolors[hole]) {
            // you lost
            alert("Oops! Ball entered hole of wrong color");
            location.reload();
          }

          u = 100;

        case 2:
          if (!(u > 0)) {
            _context.next = 9;
            break;
          }

          bwidths[num] = u / 100 * ballwidth; //console.log(bwidths);

          _context.next = 6;
          return regeneratorRuntime.awrap(sleep(2));

        case 6:
          u -= 1;
          _context.next = 2;
          break;

        case 9:
          bwidths[num] = ballwidth;
          bx[num] = width + byte * 2; // this may be wrong

          by[num] = ballwidth;
          dx[num] = 0; // shud already be but anyway

          dy[num] = 0; // but we accelerate this;

          if (numgotten >= bx.length) {
            // you won
            endTime = new Date();
            time = endTime - startTime;
            time = time / 1000;
            console.log('map' + mapnum);
            localStorage.setItem('map' + mapnum, time);
            alert('You won! Time taken: ' + time + " sec");
          }

        case 15:
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
var numgotten = 0; //get the map we are going to use

var map;
var mapnum = -1;

if (window.location.href.includes("map1")) {
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
} else {
  window.location.href = "./app.html";
}

var bx = byteize1d(map.bx);
var by = byteize1d(map.by);
var dx = sfactorize(map.dx);
var dy = sfactorize(map.dy);
var clrs = map.clrs; //holes

var holecenters = byteize(map.holecenters); // the centers

var holecolors = map.holecolors; // the centers
// blocks

var blocks = byteize(map.blocks);
var testing = true;
var bwidths = [ballwidth, ballwidth, ballwidth, ballwidth];
var bounceexp = [0, 0, 0, 0];

if (bx.length > 4) {
  bwidths = [ballwidth, ballwidth, ballwidth, ballwidth, ballwidth, ballwidth, ballwidth, ballwidth];
  bounceexp = [0, 0, 0, 0, 0, 0, 0, 0];
} // main loop


var y = 0; // start the async here so we dont start the game before loading the data

(function _callee() {
  var lucid, o, subs, newsubs, i, g, allowd;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(y < 1 || testing)) {
            _context2.next = 24;
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
              // make sure its at rest horizontally
              dx[lucid] = 0;

              if (by[lucid] < height - borderwidth - ballwidth * numgotten * 2) {
                // in range
                dy[lucid] += 1;
              } else {
                dy[lucid] = -Math.abs(dy[lucid] * 0.7);
              }
            } // quickly check if it is contacting any of the blocks


            o = 0;

            while (o < blocks.length) {
              //console.log(dist1(4*byte,4*byte,bx[0],by[0]),ballwidth+byte/2);
              if (dist1(blocks[o][0], blocks[o][1], bx[lucid], by[lucid]) < ballwidth + byte / 2) {
                //console.log('close enough');
                // contacted
                // is it in line horizontally
                if (bx[lucid] > blocks[o][0] - byte / 2 - ballwidth / 2 && bx[lucid] < blocks[o][0] + byte / 2 + ballwidth / 2) {
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


                if (by[lucid] > blocks[o][1] - byte / 2 - ballwidth / 2 && by[lucid] < blocks[o][1] + byte / 2 + ballwidth / 2) {
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
                  shrinkball(lucid, g);
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