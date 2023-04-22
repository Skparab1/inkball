const table = document.getElementById('table');


// generate all of it
let thetabs = document.getElementById('large-bar');

let thedata;

let y = 1;
while (y < 33){
    thetabs.innerHTML += `
    <th id="${y}" class="tabs" onclick="sendto('${y}');"><h5 style="padding: 0px; margin: 0px; margin-top: 10px;">${y}</h5></th>
    `;
    y += 1;
}

function thismapdata(map, data3){
    // go through
    let newarr = [];
    let r = 0;
    while (r < data3.length){
        if (data3[r].map == map){
            newarr.push(data3[r]);
        }
        r += 1;
    }

    return newarr;
}

function renderdata(map, data2){
    let thisleaderboard = thismapdata(map, data2);
    // quickly just create a new array with time based so it can sort
    let comparr = [];
    let r = 0;
    while (r < thisleaderboard.length){
        comparr.push([parseFloat(thisleaderboard[r].time),thisleaderboard[r]]);
        r += 1;
    }

    console.log("BEFORE SORT",comparr);
    comparr = comparr.sort(([a, b], [c, d]) => c - a || b - d);
    comparr = comparr.reverse();

    let ctr = 0;

    console.log(comparr);

    for (let i = 0; i < comparr.length; i++) {

        console.log('got in');

        const play = comparr[i][1];
        // difficulty = 'hard';
        // difficulty = 'normal';
        // difficulty = 'easy';
        // difficulty = 'veryeasy';
        // difficulty = 'og3life';

        if(!gn.includes(play.name)){
            unqplayers += 1;
            gn.push(play.name);
        }
        //console.log(loc);
        // filter
        //                                      verify score
        if (play.username != 'SneK152'){
            table.appendChild(createTableRow(ctr + 1, filter(play.username.substring(0,40)), play.time));
            console.log('made a row');
            ctr += 1;
            //gottennames.push(play.name);
        }
    }

}

function mutetab(id){
    let el = document.getElementById(String(id));
    el.style.backgroundColor = 'rgb(0,0,0)';
    el.style.color = 'rgb(76,76,255)';
}

function highlighttab(id){
    let el = document.getElementById(String(id));
    el.style.backgroundColor = 'rgb(76,76,76)';
    el.style.color = 'rgb(255,255,255)';
}

function purediff(d){
    try {
        if (d.includes('very')){
            return 'veryeasy';
        } else if (d.includes('og') || d.includes('OG') || d.includes('life')){
            return 'og3life';
        }
    } catch (error) {
        // didndt ask
    }
    return d;
}

function sendto(map){

    document.getElementById('thehead').textContent = 'Map '+map;

    // just go through and configure the tabs
    let u = 1;
    while (u < 33){
        if (u == map){
            highlighttab(String(u));
        } else {
            mutetab(String(u));
        }
        u += 1;
    }

    // now clear the table
    table.innerHTML = `
        <tr>
        <th id="rank">Rank</th>
        <th id="name">Name</th>
        <th>Score</th>
    </tr>
    `;

    renderdata(map, thedata);
}


let b1 = document.getElementById('bar1');
let b2 = document.getElementById('bar2');
let b3 = document.getElementById('bar3');
var loaded = false;
var fadeload = false;

const sleep = ms => new Promise(res => setTimeout(res, ms));
(async () => {
    let g = 0;
    let times = 0;
    while (g < 202){
        b2.style.width = (100-Math.abs(100-g))*0.9+'%';

        if (g > 100){
            b1.style.width = (g-100)*0.9+'%';
        } else {
            b1.style.width = '0%';
        }

        if (g < 100){
            b3.style.width = (100-g)*0.9+'%';
        } else {
            b3.style.width = '0%';
        }

        if (loaded){
            break;
        }

        await sleep(2);
        g += 0.66;

        if (g >= 200){
            g = 0;
            times += 1;

            if (times == 7 && !fadeload){
                (async () => {
                    let fader = 0;
                    let ot = document.getElementById('overtimer');
                    ot.style.display = 'block';
                    while (fader <= 100){
                        ot.style.opacity = (fader/100);
    
                        await sleep(2);
                        fader = fader + (101-fader)/50;
                    }
                })();
            }
        }
    }
})();

function filter(s){
    return s.replace("c0ckgr1nder69420","cg69420").replace("shooooobum","s").replace("Nate Higgers","NH");
}

var lb = document.getElementById('leaderboard');
var loader = document.getElementById('loader');
var unqplayers = 0;
var gn = [];
var totplays = 0;

fetch(("https://newmicro-1-b9063375.deta.app/?INKBALLGET=valid&map=all"))
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        data = data.items;

        thedata = data;

        let l;
        if (window.location.href.includes('forcepush')){
            l = window.location.href.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/inkball/leaderboard.html?forcepush=','');
            l = l.replace('https://skparab1.github.io/inkball/leaderboard.html?forcepush=','');
            sendto(parseInt(l));
        } else {
            sendto(1);
        }

        fadeload = true;
        (async () => {
            let fader = 0;
            while (fader <= 100){
                loader.style.opacity = 1-(fader/100);
                lb.style.opacity = (fader/100);

                await sleep(2);
                fader = fader + (101-fader)/50;
            }
            loaded = true;
        })();

        console.log('got here');



        let ctr = 0;
        let gottennames = [];
        console.log(data.length);

        // var tpdisp = document.getElementById('totplays');
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
    const tableRow = document.createElement('tr');
    tableRow.appendChild(createTableData(rank));
    tableRow.appendChild(createTableData(name));
    tableRow.appendChild(createTableData(time));
    return tableRow;
}

function createTableData(data) {
    const tableData = document.createElement('td');
    const textData = document.createTextNode(data);
    tableData.appendChild(textData);
    return tableData;
}