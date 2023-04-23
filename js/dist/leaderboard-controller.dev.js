"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var table = document.getElementById('table'); // generate all of it

var thetabs = document.getElementById('large-bar');
var thedata;
var thebadges = []; //2d arr with [name,[true,true,false]]

function findn(nm, dt) {
  var d = 0;
  console.log(dt);

  while (d < dt.length) {
    if (dt[d][0] == nm) {
      return d;
    }

    d += 1;
  }

  return -1;
}

function setbadges() {
  // go through thedata
  var e = 0;

  while (e < thedata.length) {
    var nname = thedata[e].username;
    console.log(nname);
    var check = false;
    var star = false;
    var trophy = false;
    var truname = nname;

    if (nname.includes('BADGES')) {
      console.log(nname);
      var g = nname.split('BADGES')[1];
      console.log(g);
      check = g.includes('check');
      star = g.includes('star');
      trophy = g.includes('trophy');
      truname = nname.split('BADGES')[0];
    }

    if (findn(truname, thebadges) == -1) {
      // add it
      thebadges.push([truname, [false, false, false]]);
    } // now modify the things


    var eqxx = findn(truname, thebadges);
    var theentry = thebadges[eqxx]; // this is the entry

    if (check) {
      theentry[1][0] = true;
    }

    if (star) {
      theentry[1][1] = true;
    }

    if (trophy) {
      theentry[1][2] = true;
    } // now we write it back


    thebadges[eqxx] = theentry;
    e += 1;
  }
}

var y = 1;

while (y < 33) {
  thetabs.innerHTML += "\n    <th id=\"".concat(y, "\" class=\"tabs\" onclick=\"sendto('").concat(y, "');\"><h5 style=\"padding: 0px; margin: 0px; margin-top: 10px;\">").concat(y, "</h5></th>\n    ");
  y += 1;
}

function thismapdata(map, data3) {
  // go through
  var newarr = [];
  var r = 0;

  while (r < data3.length) {
    if (data3[r].map == map) {
      newarr.push(data3[r]);
    }

    r += 1;
  }

  return newarr;
}

function renderdata(map, data2) {
  var thisleaderboard = thismapdata(map, data2); // quickly just create a new array with time based so it can sort

  var comparr = [];
  var r = 0;

  while (r < thisleaderboard.length) {
    comparr.push([parseFloat(thisleaderboard[r].time), thisleaderboard[r]]);
    r += 1;
  }

  console.log("BEFORE SORT", comparr);
  comparr = comparr.sort(function (_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2),
        a = _ref3[0],
        b = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        c = _ref4[0],
        d = _ref4[1];

    return c - a || b - d;
  });
  comparr = comparr.reverse();
  var ctr = 0;
  console.log(comparr);

  for (var i = 0; i < comparr.length; i++) {
    console.log('got in');
    var play = comparr[i][1]; // difficulty = 'hard';
    // difficulty = 'normal';
    // difficulty = 'easy';
    // difficulty = 'veryeasy';
    // difficulty = 'og3life';

    if (!gn.includes(play.name)) {
      unqplayers += 1;
      gn.push(play.name);
    } //console.log(loc);
    // filter
    //                                      verify score


    if (play.username != 'SneK152') {
      table.appendChild(createTableRow(ctr + 1, play.username, play.time));
      console.log('made a row');
      ctr += 1; //gottennames.push(play.name);
    }
  }
}

function mutetab(id) {
  var el = document.getElementById(String(id));
  el.style.backgroundColor = 'rgb(0,0,0)';
  el.style.color = 'rgb(76,76,255)';
}

function highlighttab(id) {
  var el = document.getElementById(String(id));
  el.style.backgroundColor = 'rgb(76,76,76)';
  el.style.color = 'rgb(255,255,255)';
}

function purediff(d) {
  try {
    if (d.includes('very')) {
      return 'veryeasy';
    } else if (d.includes('og') || d.includes('OG') || d.includes('life')) {
      return 'og3life';
    }
  } catch (error) {// didndt ask
  }

  return d;
}

function sendto(map) {
  document.getElementById('thehead').textContent = 'Map ' + map; // just go through and configure the tabs

  var u = 1;

  while (u < 33) {
    if (u == map) {
      highlighttab(String(u));
    } else {
      mutetab(String(u));
    }

    u += 1;
  } // now clear the table


  table.innerHTML = "\n        <tr>\n        <th id=\"rank\">Rank</th>\n        <th id=\"name\">Name</th>\n        <th>Score</th>\n    </tr>\n    ";
  renderdata(map, thedata);
}

var b1 = document.getElementById('bar1');
var b2 = document.getElementById('bar2');
var b3 = document.getElementById('bar3');
var loaded = false;
var fadeload = false;

var sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

(function _callee2() {
  var g, times;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          g = 0;
          times = 0;

        case 2:
          if (!(g < 202)) {
            _context2.next = 14;
            break;
          }

          b2.style.width = (100 - Math.abs(100 - g)) * 0.9 + '%';

          if (g > 100) {
            b1.style.width = (g - 100) * 0.9 + '%';
          } else {
            b1.style.width = '0%';
          }

          if (g < 100) {
            b3.style.width = (100 - g) * 0.9 + '%';
          } else {
            b3.style.width = '0%';
          }

          if (!loaded) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("break", 14);

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(sleep(2));

        case 10:
          g += 0.66;

          if (g >= 200) {
            g = 0;
            times += 1;

            if (times == 7 && !fadeload) {
              (function _callee() {
                var fader, ot;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        fader = 0;
                        ot = document.getElementById('overtimer');
                        ot.style.display = 'block';

                      case 3:
                        if (!(fader <= 100)) {
                          _context.next = 10;
                          break;
                        }

                        ot.style.opacity = fader / 100;
                        _context.next = 7;
                        return regeneratorRuntime.awrap(sleep(2));

                      case 7:
                        fader = fader + (101 - fader) / 50;
                        _context.next = 3;
                        break;

                      case 10:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })();
            }
          }

          _context2.next = 2;
          break;

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
})();

function filter(s) {
  s = s.replace("c0ckgr1nder69420", "cg69420").replace("shooooobum", "s").replace("Nate Higgers", "NH");

  if (s.includes('BADGES')) {
    s = s.split('BADGES');
    s = s[0];
  }

  return s;
}

var lb = document.getElementById('leaderboard');
var loader = document.getElementById('loader');
var unqplayers = 0;
var gn = [];
var totplays = 0;
fetch("https://newmicro-1-b9063375.deta.app/?INKBALLGET=valid&map=all").then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);
  data = data.items;
  thedata = data;
  setbadges();
  var l;

  if (window.location.href.includes('forcepush')) {
    l = window.location.href.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/inkball/leaderboard.html?forcepush=', '');
    l = l.replace('https://skparab1.github.io/inkball/leaderboard.html?forcepush=', '');
    sendto(parseInt(l));
  } else {
    sendto(1);
  }

  fadeload = true;

  (function _callee3() {
    var fader;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fader = 0;

          case 1:
            if (!(fader <= 100)) {
              _context3.next = 9;
              break;
            }

            loader.style.opacity = 1 - fader / 100;
            lb.style.opacity = fader / 100;
            _context3.next = 6;
            return regeneratorRuntime.awrap(sleep(2));

          case 6:
            fader = fader + (101 - fader) / 50;
            _context3.next = 1;
            break;

          case 9:
            loaded = true;

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    });
  })();

  console.log('got here');
  var ctr = 0;
  var gottennames = [];
  console.log(data.length); // var tpdisp = document.getElementById('totplays');
  // tpdisp.textContent = 'Total plays: '+totplays;
  // var updisp = document.getElementById('unqplayers');
  // updisp.textContent = 'Total unique players: '+unqplayers;
  // var stats = document.getElementById('stats');
  // stats.style.position = 'absolute';
  // var body = document.body,
  // html = document.documentElement;
  // var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
  // stats.style.top = (height)+'px';
});

function createTableRow(rank, name, time) {
  // get the badges
  name = filter(name.substring(0, 40));
  console.log(name);
  console.log(thebadges);
  console.log(findn(name, thebadges));
  var cbadges = thebadges[findn(name, thebadges)][1];
  var check = cbadges[0];
  var star = cbadges[1];
  var trophy = cbadges[2];
  var tableRow = document.createElement('tr');
  tableRow.appendChild(createTableData(rank));
  tableRow.appendChild(createTableData(name, check, star, trophy));
  tableRow.appendChild(createTableData(time));
  return tableRow;
}

function createTableData(data, check, star, trophy) {
  var tableData = document.createElement('td');
  var textData = document.createTextNode(data);
  tableData.appendChild(textData);

  if (check) {
    tableData.innerHTML += "\n        <img src='images/check.png' alt='green check mark' height='20px'>\n        ";
  }

  if (star) {
    tableData.innerHTML += "\n        <img src='images/star.png' alt='blue star' height='20px'>\n        ";
  }

  if (trophy) {
    tableData.innerHTML += "\n        <img src='images/trophy.png' alt='yellow trophy' height='20px'>\n        ";
  }

  return tableData;
}