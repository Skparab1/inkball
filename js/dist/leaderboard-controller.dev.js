"use strict";

var table = document.getElementById('table'); // generate all of it

var thetabs = document.getElementById('large-bar');
var y = 0;

while (y < 33) {
  thetabs.innerHTML += "\n    <div id=\"1\" class=\"tabs\" style=\"margin-left: ".concat(18 * y, "%\" onclick=\"sendto('hard');\"><h1>Hard</h1></div>\n    ");
  y += 1;
}

function mutetab(id) {
  console.log(id);
  console.log('mute');
  var el = document.getElementById(String(id));
  el.style.backgroundColor = 'rgb(0,0,0)';
  el.style.color = 'rgb(76,76,255)';
}

function highlighttab(id) {
  var el = document.getElementById(String(id));
  console.log('hightlight');
  el.style.backgroundColor = 'rgb(76,76,76)';
  el.style.color = 'rgb(23,23,23)';
}

function convdiff(diff) {
  if (diff == 'hard') {
    return 1;
  } else if (diff == 'normal') {
    return 2;
  } else if (diff == 'easy') {
    return 3;
  } else if (diff == 'veryeasy') {
    return 4;
  } else if (diff == 'og3life') {
    return 5;
  }

  return diff;
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

function settabs(diff) {
  diff = convdiff(diff);

  if (diff == 1) {
    highlighttab(1);
    mutetab(2);
    mutetab(3);
    mutetab(4);
    mutetab(5);
  } else if (diff == 2) {
    highlighttab(2);
    mutetab(1);
    mutetab(3);
    mutetab(4);
    mutetab(5);
  } else if (diff == 3) {
    highlighttab(3);
    mutetab(2);
    mutetab(1);
    mutetab(4);
    mutetab(5);
  } else if (diff == 4) {
    highlighttab(4);
    mutetab(2);
    mutetab(3);
    mutetab(1);
    mutetab(5);
  } else if (diff == 5) {
    highlighttab(5);
    mutetab(2);
    mutetab(3);
    mutetab(4);
    mutetab(1);
  }
}

function sendto(diff) {
  if (diff == 'back') {
    window.open('https://skparab1.github.io/pacman', '_self');
  } else {
    var lc = window.location.href;
    lc = lc.replace('?diff=hard', '');
    lc = lc.replace('?diff=normal', '');
    lc = lc.replace('?diff=easy', '');
    lc = lc.replace('?diff=veryeasy', '');
    lc = lc.replace('?diff=og3life', '');
    lc = lc + '?diff=' + diff;
    window.open(lc, '_self');
  }
}

var loc = window.location.href;
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html/?', '');
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html?', '');
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html', '');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html/?', '');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html?', '');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html', '');
loc = loc.replace('diff=', '');

if (loc == '' || loc == ' ') {
  loc = 'normal';
}

settabs(loc);
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
  return s.replace("c0ckgr1nder69420", "cg69420").replace("shooooobum", "s").replace("Nate Higgers", "NH");
}

var lb = document.getElementById('leaderboard');
var loader = document.getElementById('loader');
var unqplayers = 0;
var gn = [];
var totplays = 0;
fetch("https://wfcdaj.deta.dev/leaderboard?number=10000").then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);
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

  var ctr = 0;
  var gottennames = [];

  for (var i = 0; i < data.length; i++) {
    var play = data[i]; // difficulty = 'hard';
    // difficulty = 'normal';
    // difficulty = 'easy';
    // difficulty = 'veryeasy';
    // difficulty = 'og3life';

    if (!gn.includes(play.name)) {
      unqplayers += 1;
      gn.push(play.name);
    }

    console.log(play.difficulty); //console.log(loc);
    // filter
    //                                      verify score

    if (purediff(play.difficulty) == loc && play.score <= 583 && play.time > 1.5 && play.time < 500) {
      // && ctr <= 99  && !gottennames.includes(play.name)
      table.appendChild(createTableRow(ctr + 1, filter(play.name.substring(0, 40)), play.score, play.time));
      ctr += 1;
      gottennames.push(play.name);
    }

    totplays += 1;
  }

  var tpdisp = document.getElementById('totplays');
  tpdisp.textContent = 'Total plays: ' + totplays;
  var updisp = document.getElementById('unqplayers');
  updisp.textContent = 'Total unique players: ' + unqplayers;
  var stats = document.getElementById('stats');
  stats.style.position = 'absolute';
  var body = document.body,
      html = document.documentElement;
  var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  stats.style.top = height + 'px';
});

function createTableRow(rank, name, score, time) {
  var tableRow = document.createElement('tr');
  tableRow.appendChild(createTableData(rank));
  tableRow.appendChild(createTableData(name));
  tableRow.appendChild(createTableData(score));
  tableRow.appendChild(createTableData(time));
  return tableRow;
}

function createTableData(data) {
  var tableData = document.createElement('td');
  var textData = document.createTextNode(data);
  tableData.appendChild(textData);
  return tableData;
}