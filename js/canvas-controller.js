// canvas template

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-20; 
canvas.height = window.innerHeight-pushdown-5; 
// byte, canvas declared in first.js
const width = byte*30;
const height = byte*19; // gonna make a full sized canvas with a little bit of ground leeway

// just to make sure that the canvas is sized right
// alternate times reload
if (localStorage.getItem('mapreload') == 'declined'){
  localStorage.setItem('mapreload','valid');
  location.reload();
} else {
  localStorage.setItem('mapreload','declined');
}

function setvolume(v){
  audi.volume = v/100;
  localStorage.setItem('volume',String(v/100));
}

// set up the audio
let randad = Math.floor(Math.random()*3); // 0 1 2

var audi;

let ttrs = localStorage.getItem('musicon');
var audiopaused = false;
if (ttrs == null){
  audiopaused = false;
} else if (ttrs == 'dontplay'){
  audiopaused = true;
}


ttrs = localStorage.getItem('sfxon');
var sfxon = true;
if (ttrs == null){
  sfxon = true;
} else if (ttrs == 'dontplay'){
  sfxon = false;
}


if (randad == 0){
  audi = new Audio('audio/inkball_theme.mp3');
} else if (randad == 1){
  audi = new Audio('audio/inkball_2.mp3');
} else {
  audi = new Audio('audio/inkball_3.mp3');
}
if (localStorage.getItem('volume') != null){
  setvolume(parseFloat(localStorage.getItem('volume'))*100);
} else {
  setvolume(100);
}

if (!audiopaused){
  audi.play();
}

let getaudio = new Audio('audio/inkball_get.mp3');
let winaudio = new Audio('audio/inkball_win.mp3');
let loseaudio = new Audio('audio/inkball_lose.mp3');
let collisionaudio = new Audio('audio/inkball_collision.mp3');


// for animations
const sleep = ms => new Promise(res => setTimeout(res, ms));

function drawbg(){
  ctx.beginPath();
  ctx.clearRect(0,0,width+borderwidth*4,height);
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,width+borderwidth*4,height);

  // lets draw some borders
  ctx.fillStyle = 'gray';
  ctx.fillRect(0,0,width,borderwidth);
  ctx.fillRect(0,0,borderwidth,height);
  ctx.fillRect(width-borderwidth,0,borderwidth,height);
  ctx.fillRect(0,height-borderwidth, width, borderwidth);

  // this is a supposed hole
  let j = 0;
  while (j < holecenters.length){
    ctx.beginPath();
    ctx.fillStyle = holecolors[j];
    ctx.fillRect(holecenters[j][0]-holewidth*1.5/2,holecenters[j][1]-holewidth*1.5/2,holewidth*1.5,holewidth*1.5);
    ctx.fillStyle = 'black';
    ctx.arc(holecenters[j][0],holecenters[j][1],holewidth/2,0,Math.PI*2);
    ctx.fill();
    j += 1;
  }

  // these are blocks
  j = 0;
  ctx.fillStyle = 'gray';
  while (j < blocks.length){
    ctx.fillRect(blocks[j][0]-byte/2,blocks[j][1]-byte/2 ,byte,byte);
    j += 1;
  }

  // these are timed blocks
  j = 0;
  ctx.lineWidth = ballwidth/4;
  while (j < timedblocks.length && tbtimer < timedblockinterval/2+25){
    if (tbtimer < 100){
      let tv = (tbtimer)/50;
      ctx.strokeStyle = 'rgba(128,128,128,'+tv+')';
    } else if (tbtimer < timedblockinterval/2-25){
      ctx.strokeStyle = 'gray';
    } else {
      let tv = ((timedblockinterval/2+25)-tbtimer)/50;
      ctx.strokeStyle = 'rgba(128,128,128,'+tv+')';
    }

    ctx.strokeRect(timedblocks[j][0]-byte/2,timedblocks[j][1]-byte/2 ,byte,byte);
    j += 1;
  }

  // these are antitimed blocks
  j = 0;
  while (j < antitimedblocks.length && tbtimer > timedblockinterval/2-25){
    if (tbtimer < timedblockinterval/2+25){
      let tv = (tbtimer-(timedblockinterval/2-25))/50;
      ctx.strokeStyle = 'rgba(128,128,128,'+tv+')';
    } else if (tbtimer < timedblockinterval/2-25){
      ctx.strokeStyle = 'gray';
    } else {
      let tv = (timedblockinterval-tbtimer)/50;
      ctx.strokeStyle = 'rgba(128,128,128,'+tv+')';
    }

    ctx.strokeRect(antitimedblocks[j][0]-byte/2,antitimedblocks[j][1]-byte/2 ,byte,byte);
    j += 1;
  }

  // these are pushers
  j = 0;
  let rrr = 75;
  if (pushtimer < 4){
    rrr = pushtimer*85/4;
  } else if (pushtimer > byte/2-4){
    rrr = (byte/2-pushtimer)*85/4;
  }
  ctx.fillStyle = 'rgb('+rrr+','+rrr+','+rrr+')';

  while (j < leftpusher.length){
    drawpusherleft(leftpusher[j][0]-pushtimer,leftpusher[j][1]);
    j += 1;
  }
  j = 0;
  while (j < rightpusher.length){
    drawpusherright(rightpusher[j][0]+pushtimer,rightpusher[j][1]);
    j += 1;
  }
  j = 0;
  while (j < uppusher.length){
    drawpusherup(uppusher[j][0],uppusher[j][1]-pushtimer);
    j += 1;
  }
  j = 0;
  while (j < downpusher.length){
    drawpusherdown(downpusher[j][0],downpusher[j][1]+pushtimer);
    j += 1;
  }

  // this is blue lock blocks
  j = 0;
  ctx.lineWidth = ballwidth/4;
  ctx.fillStyle = "rgb("+3*bluefade/100+","+161*bluefade/100+","+252*bluefade/100+")";
  ctx.strokeStyle = "rgb("+128*bluefade/100+","+128*bluefade/100+","+128*bluefade/100+")";
  while (j < bluelocks.length && bluefade != 0){
    ctx.fillRect(bluelocks[j][0]-byte/2,bluelocks[j][1]-byte/2 ,byte,byte);
    ctx.strokeRect(bluelocks[j][0]-byte/2,bluelocks[j][1]-byte/2 ,byte,byte);
    j += 1;
  }

  j = 0;
  ctx.lineWidth = ballwidth/4;
  ctx.lineJoin = "round";
  ctx.fillStyle = 'black';
  ctx.strokeStyle = BLUE;
  while (j < bluebreakers.length){
    ctx.fillRect(bluebreakers[j][0]-byte/2,bluebreakers[j][1]-byte/2 ,byte,byte);
    ctx.strokeRect(bluebreakers[j][0]-byte/2,bluebreakers[j][1]-byte/2 ,byte,byte);
    j += 1;
  }

  ctx.fillStyle = 'gray';

  // releaser
  if (releaser != null){
    ctx.fillRect(width+ballwidth*2,0, byte/2, byte*7);
    ctx.fillRect(width,byte*6.5, ballwidth*2+byte/2, byte/2);

    ctx.fillStyle = 'rgb(200,200,200)';
    ctx.fillRect(releaser[0],releaser[1], ballwidth/2,ballwidth/2);
    ctx.fillRect(releaser[0]-ballwidth/2,releaser[1], ballwidth/2,ballwidth/2);
    ctx.fillRect(releaser[0]+ballwidth/2,releaser[1], ballwidth/2,ballwidth/2);
    ctx.fillRect(releaser[0],releaser[1]-ballwidth/2, ballwidth/2,ballwidth/2);
    ctx.fillRect(releaser[0],releaser[1]+ballwidth/2, ballwidth/2,ballwidth/2);

    // a pie chart sort of thing

    //ctx.fillStyle = 'rgb(200,200,200)';
    // max is 200

    let tc = 0;
    if (nextt/nextgap > 0.75){
      tc = (800*(1-nextt/nextgap));
    } else {
      tc = 200;
    }

    ctx.fillStyle = 'rgb('+tc+','+tc+','+tc+')';

    ctx.beginPath();
    ctx.arc(width+byte,byte*8,ballwidth,0,Math.PI*2*(nextt/nextgap));
    ctx.lineTo(width+byte,byte*8);
    ctx.fill();

  }
}

async function togglebluelock(){
  blueon = !blueon;
  // now its the new setting
  if (blueon){
    while (bluefade < 100){
      bluefade += 1;
      await sleep();
    }
  } else {
    while (bluefade > 0){
      bluefade -= 1;
      await sleep();
    }
  }
}

function drawpusherright(x,y){
  ctx.beginPath();
  ctx.moveTo(x-byte/2,y-byte/2);
  ctx.lineTo(x,y-byte/2);
  ctx.lineTo(x+byte/2,y);
  ctx.lineTo(x,y+byte/2);
  ctx.lineTo(x-byte/2,y+byte/2);
  ctx.lineTo(x,y);
  ctx.lineTo(x-byte/2,y-byte/2);
  ctx.fill();
}

function drawpusherleft(x,y){
  ctx.beginPath();
  ctx.moveTo(x,y-byte/2);
  ctx.lineTo(x+byte/2,y-byte/2);
  ctx.lineTo(x,y);
  ctx.lineTo(x+byte/2,y+byte/2);
  ctx.lineTo(x,y+byte/2);
  ctx.lineTo(x-byte/2,y);
  ctx.lineTo(x,y-byte/2);
  ctx.fill();
}

function drawpusherup(x,y){
  ctx.beginPath();
  ctx.moveTo(x-byte/2,y+byte/2);
  ctx.lineTo(x-byte/2,y);
  ctx.lineTo(x,y-byte/2);
  ctx.lineTo(x+byte/2,y);
  ctx.lineTo(x+byte/2,y+byte/2);
  ctx.lineTo(x,y);
  ctx.lineTo(x-byte/2,y+byte/2);
  ctx.fill();
}


function drawpusherdown(x,y){
  ctx.beginPath();
  ctx.moveTo(x+byte/2,y-byte/2);
  ctx.lineTo(x+byte/2,y);
  ctx.lineTo(x,y+byte/2);
  ctx.lineTo(x-byte/2,y);
  ctx.lineTo(x-byte/2,y-byte/2);
  ctx.lineTo(x,y);
  ctx.lineTo(x+byte/2,y-byte/2);
  ctx.fill();
}

function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function degreestoradians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function vproduct(arr1,arr2){
  var sum = 0;
  for(var i=0; i< arr1.length; i++) {
      sum += arr1[i]*arr2[i];
  }
  return sum
}

function dot(v1,v2){
  return v1[0] * v1[1] + v2[0] * v2[1];
}

function drawmousetrail(){

  try {

    ctx.strokeStyle = 'white';
    let draww = ballwidth/3;
    ctx.lineWidth = draww;

    let ld = ballwidth+draww/2;

    let r = 0;
    while (r < mousetrail.length){
      ctx.beginPath();
      let s = 0;
      while (s < mousetrail[r].length){
        let xp = mousetrail[r][s][0];
        let yp = mousetrail[r][s][1];

        if (xp < width && yp < height){
          ctx.lineTo(xp,yp);
        }

        // just quickly check if it is in contact with any of the balls
        let bl = 0;
        while (bl < bx.length){
          if (bx[bl]-ld < xp && bx[bl]+ld > xp && by[bl]-ld < yp && by[bl]+ld > yp){
          
            // process it
            // so basically ball bl and line r have contacted

            // get the general angle of r
            let deltax;
            let deltay;
            if (s < 2){
              deltax = mousetrail[r][s+1][0]-mousetrail[r][s][0];
              deltay = mousetrail[r][s+1][1]-mousetrail[r][s][1];
              //console.log('called this btw',mousetrail[r][s+1][1], mousetrail[r][s][1]);
            } else {
              deltax = mousetrail[r][s][0]-mousetrail[r][s-2][0];
              deltay = mousetrail[r][s][1]-mousetrail[r][s-2][1];
            }

            if (deltax == 0){
              if (deltay > 0){
                deltax = 0.01;
              } else {
                deltax = -0.01;
              }
            }

            let theta = radians_to_degrees(Math.atan(deltay/deltax));
            
            //console.log('old velocities',dx[bl],dy[bl]);

            // ok this is gonna be another try
            
            let Velocity_Magnitude = Math.sqrt(dx[bl]*dx[bl]+dy[bl]*dy[bl]);

            //console.log('mid');

            // let new_x = dx + vx * Velocity_Magnitude * Time_Interval

            let nx = -Math.sin(degreestoradians(theta));
            let ny = Math.cos(degreestoradians(theta));

            //console.log('nx ny',nx,ny);


            let dt = dx[bl] * nx + dy[bl] * ny;

            //console.log('dt',dt);

            let vnewx = dx[bl] - (2 * dt * nx);
            let vnewy = dy[bl] - (2 * dt * ny);

            //console.log('vnews',vnewx,vnewy);


            dx[bl] = vnewx;
            dy[bl] = vnewy;

            //console.log('new velocities',dx[bl],dy[bl]);

            // in contact
            // disable that line
            mousetrail[r] = []; // we cud have splcied lets just splice
            mousetrail.splice(r,1);

            mousedown = false;
          }
          bl += 1;
        }
        s += 1;
      }
      ctx.stroke();
      r += 1;
    }
  } catch {

  }
}

function inholerange(lucid, hole){
  let holerangerad = holewidth*1.5/2;
  return bx[lucid] > holecenters[hole][0]-holerangerad && bx[lucid] < holecenters[hole][0]+holerangerad && by[lucid] > holecenters[hole][1]-holerangerad && by[lucid] < holecenters[hole][1]+holerangerad;
}

function yoinkball(ball, hole){

  let distx = (holecenters[hole][0])-bx[ball];
  let disty = (holecenters[hole][1])-by[ball];

  let accx = distx*0.05;
  let accy = disty*0.05;

  if (accx < 0){
    accx = -(accx*accx);
  } else {
    accx = accx*accx;
  }

  if (accy < 0){
    accy = -(accy*accy);
  } else {
    accy = accy*accy;
  }
  

  dx[ball] += accx;
  dy[ball] += accy;

  // dampen both
  dx[ball] = dx[ball]*0.6;
  dy[ball] = dy[ball]*0.6;

  // the acceleration is proportional to the actual distance
}

function randcolor(){
  return "rgb("+Math.floor(Math.random()*200+55)+","+Math.floor(Math.random()*200+55)+","+Math.floor(Math.random()*200+55)+")";
}

function quadfm(a, b, c) {
  var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
  var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);

  // we only care about the first one
  //return Math.max(result2,result);
  return [result,result2];
}

function computev(v1,v2){
  let x = v1*v1+v2*v2;
  let z = v1+v2;

  let v1f = quadfm(2,-2*z,(z*z-x));
  // final v for v1
  // so we have 2 options pick the one thats differnt
  if (v1f[0] == v1){
    v1f = v1f[1]; // pick the other one
  } else {
    v1f = v1f[0];
  }
  
  let v2f = z-v1f;

  return [v1f,v2f];
}

function bounce(num1,num2){
  let thexx = computev(dx[num1],dx[num2]);
  dx[num1] = thexx[0];
  dx[num2] = thexx[1];

  let theyy = computev(dy[num1],dy[num2]);
  dy[num1] = theyy[0];
  dy[num2] = theyy[1];
}

function touching(num1,num2){
  return (Math.sqrt(Math.pow(bx[num1]-bx[num2],2)+Math.pow(by[num1]-by[num2],2)) <= ballwidth*2 && bx[num1] < width+borderwidth);
}

function dist1(x1,y1,x2,y2){
  return (Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
}

async function shrinkball(num, hole){
  // first of all is the ball in the holw of its color or not
  // cuz if not then you lost

  let endTime = new Date();
  let time = endTime-startTime;
  time = time/1000;


  if (clrs[num] != holecolors[hole]){
    // you lost
    //alert("Oops! Ball entered hole of wrong color");
    //location.reload();
    audi.pause();

    if (sfxon){
      loseaudio.play();
    }

    let loser = document.getElementById('lose-dialogue');
    document.getElementById('lwtime').textContent = 'In '+time+" sec";
    loser.style.display = 'block';
    loser.style.opacity = 1;
    lost = true;
  } else {
    // you got a ball
    if (sfxon){
      getaudio.play();
    }

    let u = 100;
    while (u > 0){
      bwidths[num] = u/100*ballwidth;
      //console.log(bwidths);
      await sleep(2);
      u -= 1;
    }

    if (clrs[num] == BLUE){
      togglebluelock();
    }

    bwidths[num] = ballwidth;

    bx[num] = width+byte*2; // this may be wrong
    by[num] = byte*8;
    dx[num] = 0; // shud already be but anyway
    dy[num] = 0.15; // but we accelerate this;

    if (numgotten >= bx.length){
      // you won
      audi.pause();
      if (sfxon){
        winaudio.play();
      }

      console.log('map'+mapnum);
      localStorage.setItem('map'+mapnum,time);

      if (lastbest == null || lastbest > time){
        localStorage.setItem('map'+mapnum+'best',time);
      }

      //alert('You won! Time taken: '+time+" sec");
      won = true;

      let wn = document.getElementById('win-dialogue');
      wn.style.opacity = 1;
      wn.style.display = 'block';

      document.getElementById('lwtime').textContent = 'In '+time+" sec";

      sendlb(time,(localStorage.getItem('inkballname')+"BADGES"+localStorage.getItem('badges')));
      getwholeleaderboard(time,localStorage.getItem('inkballname'));
    }
  }

}

const getAllSubsets = 
  theArray => theArray.reduce(
    (subsets, value) => subsets.concat(
      subsets.map(set => [value,...set])
    ),
    [[]]
);

async function releaseball(r){
  // release it
  releasedstatuses[r] = true;
  
  console.log("releasing",r,bx);

  // let u = 100;
  // while (u > 0){
  //   bwidths[r] = u/100*ballwidth;
  //   //console.log(bwidths);
  //   await sleep(2);
  //   u -= 1;
  // }

  bx[r] = releaser[0]; // set the coord;
  by[r] = releaser[1];

  // while (u < 100){
  //   bwidths[r] = u/100*ballwidth;
  //   //console.log(bwidths);
  //   await sleep(2);
  //   u += 1;
  // }

  dx[r] = tempdx[r];
  dy[r] = tempdy[r];
  console.log(dx,tempdx);

  pushballs();

  univrb = true;
}

function pushballs(){
  // we have nextgap time to move it down ballwidth/2 px;
  // we are nextt/nextgap through this
  // to move it ballwidth px in nextgap time it needs to have velocity ballwidth/nextgap
  let d = 0;
  while (d < dy.length){
    if (!releasedstatuses[d]){
      dy[d] = (ballwidth/nextgap)/20;
    }
    d += 1;
  }
}

function addball(){
  bx.push(Math.floor(Math.random()*width));
  by.push(Math.floor(Math.random()*height));
  dx.push(Math.floor(Math.random()*6)-3);
  dy.push(Math.floor(Math.random()*6)-3);
  bwidths.push(ballwidth);

  if (Math.random() < 0.5){
    clrs.push(BLUE);
  } else {
    clrs.push(ORANGE);
  }
}

function sfactorize(arr){
  let t = 0;
  while (t < arr.length){
    arr[t] = arr[t]*sfactor;
    t += 1;
  }

  return arr;
}

function byteize(arr){
  let t = 0;
  while (t < arr.length){
    arr[t] = [arr[t][0]*byte,arr[t][1]*byte];
    t += 1;
  }

  return arr;
}

function byteize1d(arr){
  let t = 0;
  while (t < arr.length){
    arr[t] = arr[t]*byte;
    t += 1;
  }

  return arr;
}

function zeroarr(arr){
  let e = 0;
  let newarr = [];
  while (e < arr.length){
    newarr.push(0); // no this overwrites it
    e += 1;
  }

  return newarr;
}

function setarr(arr){
  let e = 0;
  let newarr = [];
  while (e < arr.length){
    newarr.push(3.5); // no this overwrites it
    e += 1;
  }

  return newarr;
}

function addpoint(){
  // adding mousetrail[mousetrail.length-1].push(mousepos);

  let ln = mousetrail[mousetrail.length-1];

  if (ln.length > 0){
    let lp = ln[ln.length-1];

    if (dist1(lp[0],lp[1],mousepos[0],mousepos[1]) > ballwidth){
      console.log('called this');
      let midp = [(mousepos[0]+lp[0])/2,(mousepos[1]+lp[1])/2];
      mousetrail[mousetrail.length-1].push(midp);
    }
  }

  mousetrail[mousetrail.length-1].push(mousepos); // add this point regardless
}

function allstoppedy(){
  let u = 0;
  while (u < dy.length){
    if (dy[u] > 0.1){
      return false;
    }
    u += 1;
  }
  return true;
}

async function getlb(map){
  fetch((`https://newmicro-1-b9063375.deta.app/?INKBALLGET=valid&map=${map}`))
  .then(response => {
      return response.json();
  })
  .then(data => {
      console.log(data);
      thisleaderboard = data.items;
  })
}

function sendlb(ourtime, ourname){
  //https://newmicro-1-b9063375.deta.app/?INKBALLWRITE=valid&map=19&time=20&username=skparab1
  fetch((`https://newmicro-1-b9063375.deta.app/?INKBALLWRITE=valid&map=${mapnum}&time=${ourtime}&name=${ourname}`))
  .then(response => {
      return response.json();
  })
  .then(data => {
      console.log(data);
      thisleaderboard = data.items;
  })
}

function getwholeleaderboard(ourtime, ourname){
  //so we have thisleaderboard as an array of jsons
  // create a json for this one and add it to the end

  let ourentry = {
    key: 'whocares',
    map: mapnum,
    time: ourtime,
    username: ourname,
  };

  thisleaderboard.push(ourentry);

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

  console.log("AFTER SORT",comparr);

  // now it is ready to be printed out
  // so we can just print it ordinarily

  let disp = document.getElementById('leaderboard-container');
  disp.innerHTML += ("<h2>Leaderboard for map "+mapnum+"</h2>");



  r = 0;
  while (r < comparr.length){

    let procname = comparr[r][1].username;

    if (procname.includes('BADGES')){
      procname = procname.split('BADGES')[0];
    }

    if (procname!= 'SneK152'){
      if (comparr[r][1] == ourentry){
        disp.innerHTML += ("<h3 style='color: lightgreen;'>"+procname.substring(0,40)+" "+comparr[r][1].time+"</h3>");
      } else {
        disp.innerHTML += ("<h3>"+procname.substring(0,40)+" "+comparr[r][1].time+"</h3>");
      }
    }
    r += 1;
  }

}

function avg(arr){
  let r = 0;
  let s = 0;
  while (r < arr.length){
    s += arr[r];
    r += 1;
  }

  return s/arr.length;
}

let loaded = false;

// ballwidth, sfactor and other defined in first.js
let borderwidth = byte;
let holewidth = ballwidth*2;

let mousedown = false;
let mousepos = [0,0];
let mousetrail = [];

let startTime = new Date();

let numgotten = 0;
let lost = false;
let won = false;
let woncounter = 0;

//get the map we are going to use
let map;
let mapnum = -1;

let lastlpst = new Date();
let sf = [];
let speedfactor = 1;

let pushlimit = 2;

if (window.location.href.includes("map10")){
  map = getmap10(); mapnum = 10;
} else if (window.location.href.includes("map11")){
  map = getmap11(); mapnum = 11;
} else if (window.location.href.includes("map12")){
  map = getmap12(); mapnum = 12;
} else if (window.location.href.includes("map13")){
  map = getmap13(); mapnum = 13;
} else if (window.location.href.includes("map14")){
  map = getmap14(); mapnum = 14;
} else if (window.location.href.includes("map15")){
  map = getmap15(); mapnum = 15;
} else if (window.location.href.includes("map16")){
  map = getmap16(); mapnum = 16;
} else if (window.location.href.includes("map17")){
  map = getmap17(); mapnum = 17;
} else if (window.location.href.includes("map18")){
  map = getmap18(); mapnum = 18;
} else if (window.location.href.includes("map19")){
  map = getmap19(); mapnum = 19;
} else if (window.location.href.includes("map20")){
  map = getmap20(); mapnum = 20;
} else if (window.location.href.includes("map21")){
  map = getmap21(); mapnum = 21;
} else if (window.location.href.includes("map22")){
  map = getmap22(); mapnum = 22;
} else if (window.location.href.includes("map23")){
  map = getmap23(); mapnum = 23;
} else if (window.location.href.includes("map24")){
  map = getmap24(); mapnum = 24;
} else if (window.location.href.includes("map25")){
  map = getmap25(); mapnum = 25;
} else if (window.location.href.includes("map26")){
  map = getmap26(); mapnum = 26;
} else if (window.location.href.includes("map27")){
  map = getmap27(); mapnum = 27; pushlimit = 1.6;
} else if (window.location.href.includes("map28")){
  map = getmap28(); mapnum = 28;
} else if (window.location.href.includes("map29")){
  map = getmap29(); mapnum = 29;
} else if (window.location.href.includes("map30")){
  map = getmap30(); mapnum = 30;
} else if (window.location.href.includes("map31")){
  map = getmap31(); mapnum = 31;
} else if (window.location.href.includes("map32")){
  map = getmap32(); mapnum = 32; pushlimit = 1.6;
} else if (window.location.href.includes("map1")){
  map = getmap1(); mapnum = 1;
} else if (window.location.href.includes("map2")){
  map = getmap2(); mapnum = 2;
} else if (window.location.href.includes("map3")){
  map = getmap3(); mapnum = 3;
} else if (window.location.href.includes("map4")){
  map = getmap4(); mapnum = 4;
} else if (window.location.href.includes("map5")){
  map = getmap5(); mapnum = 5;
} else if (window.location.href.includes("map6")){
  map = getmap6(); mapnum = 6;
} else if (window.location.href.includes("map7")){
  map = getmap7(); mapnum = 7;
} else if (window.location.href.includes("map8")){
  map = getmap8(); mapnum = 8;
} else if (window.location.href.includes("map9")){
  map = getmap9(); mapnum = 9;
} else {
  window.location.href = "./app.html";
}

let lastbest = localStorage.getItem('map'+mapnum+'best');
if (lastbest == null){
  document.getElementById('dispbest').textContent = 'Best: -';
} else {
  document.getElementById('dispbest').textContent = 'Best: '+lastbest+' sec';
}

document.title = "Inkball - Map "+mapnum;

let thisleaderboard;
getlb(mapnum);

let bx = byteize1d(map.bx);
let by = byteize1d(map.by);

let dx = sfactorize(map.dx);
let dy = sfactorize(map.dy);

let lastdx = dx;
let lastdy = dy;

let tempdx = dx; //if needed
let tempdy = dy;

let clrs = map.clrs;

//holes
let holecenters = byteize(map.holecenters); // the centers
let holecolors = map.holecolors; // the centers

// blocks
let blocks = byteize(map.blocks);
let testing = true; 

//timedblocks
let timedblocks = [];
let antitimedblocks = [];
let timedblockinterval = 3000;
if (map.timedblocks != null){
  timedblocks = byteize(map.timedblocks);
  antitimedblocks = byteize(map.antitimedblocks);

  timedblockinterval = map.timedblockinterval;
}
let tbtimer = 0;

// pushers
let leftpusher = [];
let rightpusher = [];
let uppusher = [];
let downpusher = [];
let pushtimer = 0;
if (map.uppusher != null){
  uppusher = byteize(map.uppusher);
}
if (map.rightpusher != null){
  rightpusher = byteize(map.rightpusher);
}
if (map.downpusher != null){
  downpusher = byteize(map.downpusher);
}
if (map.leftpusher != null){
  leftpusher = byteize(map.leftpusher);
}

// lock blocks
let bluelocks = [];
let bluefade = 100;
let blueon = true;
if (map.bluelockblock != null){
  blueon = map.initiallock;
  if (!blueon){
    bluefade = 0;
  }
  bluelocks = byteize(map.bluelockblock);
}

// blue breakers
let bluebreakers = [];
if (map.bluebreakblocks != null){
  bluebreakers = byteize(map.bluebreakblocks);
}

// releaser
let releaser = map.releasepoint;
if (releaser != null){
  releaser = [releaser[0]*byte-ballwidth/4,releaser[1]*byte-ballwidth/4];
  dx = zeroarr(dx);
  dy = setarr(dx);
}
let releasetimes = map.releasetimes;
let releasedstatuses = [false,false,false,false,false,false,false,false,false,false,false,false];
let nextgap = 1;
let nextt = 1;

let univtimer = 0;
let univrb = false;

let bwidths = [ballwidth,ballwidth,ballwidth,ballwidth];
let bounceexp = [0,0,0,0];
if (bx.length > 4){
  bwidths = [ballwidth,ballwidth,ballwidth,ballwidth,ballwidth,ballwidth,ballwidth,ballwidth];
  bounceexp = [0,0,0,0,0,0,0,0];
}


// some collision presets
// not presets just defined things
let subs = getAllSubsets([...Array(dx.length).keys()]);
//console.log(subs);
// filter for length 2;
let newsubs = [];
let i = 0;
while (i < subs.length){
  if (subs[i].length == 2){
    newsubs.push(subs[i]);
  }
  i += 1;
}

// now create a timer sort of thing
let collisiontimer = [];
let hee = 0;
while (hee < newsubs.length){
  collisiontimer.push(60);
  hee += 1;
}

// size the control panel rlly quickly
let cpanel = document.getElementById('right-panel');
cpanel.style.left = (width+byte*2.5+ballwidth)+'px';
cpanel.style.height = (window.innerHeight-20)+'px';
cpanel.style.width = (window.innerWidth-(width+byte*3.5+ballwidth))+'px';


// main loop
let y = 0;

// start the async here so we dont start the game before loading the data
(async () => {
  while (y < 1 || testing){
    //a big ol background rect
    drawbg();

    drawmousetrail();

    if (mousedown){
      addpoint();
      //console.log(mousetrail);
    }

    // i hope this doesnt cut on performance too much
    let nowlpst = new Date();
    let currentdelta = nowlpst-lastlpst;
    // this is the difference for one loop
    // currentdelat is the number of milliseconds per frame

    let currentpx = currentdelta*speedfactor; // this is in theory the px a thing mvoes per frame
    // so whatever this is for us we want it to eventually converge to that

    //console.log(currentpx, speedfactor); // this shud be fairly consistent

    // this is def too heavy
    // sf.push(currentpx);
    // console.log(avg(sf)); // seems to equalize at about 5.3
    // so currently speedfactor is this

    // ok so current px should equalize at about 5.3
    if (currentpx < 5.3){
      // then increase the speedfactor
      speedfactor = speedfactor*1.01;
    } else {
      // decrease the speedfactor
      speedfactor = speedfactor*0.99;
    }

    // now speedfactor shud be applied to all of the velocities
    lastlpst = nowlpst;

    // do the time
    let endTime = new Date();
    let time = endTime-startTime;
    time = time/1000;

    document.getElementById('disptime').textContent = 'Time: '+Math.round(time)+' sec';

    ctx.fillStyle = 'red';
    let lucid = 0;
    while (lucid < bx.length){
      ctx.beginPath();
      ctx.arc(bx[lucid],by[lucid],bwidths[lucid],0,Math.PI*2);
      ctx.fillStyle = clrs[lucid];
      ctx.fill();

      if (dx[lucid] == NaN || isNaN(dx[lucid])){
        dx[lucid] = lastdx[lucid];
      }

      if (dy[lucid] == NaN || isNaN(dy[lucid])){
        dy[lucid] = lastdy[lucid];
      }

      // if its still nan
      if (dx[lucid] == NaN || isNaN(dx[lucid])){
        dx[lucid] = 0.5;
      }

      if (dy[lucid] == NaN || isNaN(dy[lucid])){
        dy[lucid] = 0.5;
      }

      // check if the positions are out or nan
      if (bx[lucid] == NaN || isNaN(bx[lucid]) || bx[lucid] < 0 || bx[lucid] > byte*40){
        bx[lucid] = byte*3;
      }
      if (by[lucid] == NaN || isNaN(by[lucid]) || by[lucid] > byte*26){
        by[lucid] = byte*3;
      }

      lucid += 1;
    }

    lastdx = dx;
    lastdy = dy;

    if (lost || woncounter > 100){
      break;
    }

    lucid = 0;
    while (lucid < bx.length){
      bx[lucid] += dx[lucid]*speedfactor;
      by[lucid] += dy[lucid]*speedfactor;
      lucid += 1;
    }

    lucid = 0;
    while (lucid < bx.length){
      if (bx[lucid] < ballwidth+borderwidth){
        dx[lucid] = Math.abs(dx[lucid]);
      } else if (bx[lucid] > width-ballwidth-borderwidth){
        dx[lucid] = -Math.abs(dx[lucid]);
      }

      if (by[lucid] < ballwidth+borderwidth){
        dy[lucid] = Math.abs(dy[lucid]);
      } else if (by[lucid] > height-ballwidth-borderwidth){
        if (bx[lucid] > width+borderwidth && by[lucid] > byte*7){
          // an out ball
        } else {
          // bounce at full
          dy[lucid] = -Math.abs(dy[lucid]);
        }
      }

      if (bx[lucid] > width+borderwidth && by[lucid] > byte*7){
        // it is an out ball

        if (won && allstoppedy()){
          woncounter += 1;
        }

        // make sure its at rest horizontally
        dx[lucid] = 0;
        if (by[lucid] < height-borderwidth-ballwidth*(numgotten)*2){
          // in range
          dy[lucid] += 1;
        } else {
          dy[lucid] = -Math.abs(dy[lucid]*0.7);
        }
      } else if (bx[lucid] > width){
        // this is a starting ball
        if (by[lucid] > byte*6.5-ballwidth){
          // it is over
          dy[lucid] = 0;
          by[lucid] = byte*6.5-ballwidth;
        }
      }

      // quickly check if it is contacting any of the blocks
      let o = 0;
      while (o < blocks.length){
        //console.log(dist1(4*byte,4*byte,bx[0],by[0]),ballwidth+byte/2);
        if (dist1(blocks[o][0],blocks[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          //console.log('close enough');
          // contacted
          // is it in line horizontally
          if (bx[lucid] > blocks[o][0]-byte/2-ballwidth/1.5 && bx[lucid] < blocks[o][0]+byte/2+ballwidth/1.5){
            // it is either above or below
            if (by[lucid] < blocks[o][1]){
              // reflect up
              //console.log('tried to reflect up');
              dy[lucid] = -Math.abs(dy[lucid]);
            } else {
              // reflect down
              //console.log('tried to reflect down', by[lucid] , blocks[o][1]);
              dy[lucid] = Math.abs(dy[lucid]);
            }
          }

          // is it in line vertically
          if (by[lucid] > blocks[o][1]-byte/2-ballwidth/1.5 && by[lucid] < blocks[o][1]+byte/2+ballwidth/1.5){
            if (bx[lucid] < blocks[o][0]-byte/2){
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

      // timedblocks
      o = 0;
      while (o < timedblocks.length && tbtimer < timedblockinterval/2-25){
        if (dist1(timedblocks[o][0],timedblocks[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          if (bx[lucid] > timedblocks[o][0]-byte/2-ballwidth/1.5 && bx[lucid] < timedblocks[o][0]+byte/2+ballwidth/1.5){
            if (by[lucid] < timedblocks[o][1]){
              dy[lucid] = -Math.abs(dy[lucid]);
            } else {
              dy[lucid] = Math.abs(dy[lucid]);
            }
          }

          if (by[lucid] > timedblocks[o][1]-byte/2-ballwidth/1.5 && by[lucid] < timedblocks[o][1]+byte/2+ballwidth/1.5){
            if (bx[lucid] < timedblocks[o][0]-byte/2){
              dx[lucid] = -Math.abs(dx[lucid]);
            } else {
              dx[lucid] = Math.abs(dx[lucid]);
            }
          }
        }
        o += 1;
      }

      // antitimedblocks
      o = 0;
      while (o < antitimedblocks.length && tbtimer > timedblockinterval/2+25){
        if (dist1(antitimedblocks[o][0],antitimedblocks[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          if (bx[lucid] > antitimedblocks[o][0]-byte/2-ballwidth/1.5 && bx[lucid] < antitimedblocks[o][0]+byte/2+ballwidth/1.5){
            if (by[lucid] < antitimedblocks[o][1]){
              dy[lucid] = -Math.abs(dy[lucid]);
            } else {
              dy[lucid] = Math.abs(dy[lucid]);
            }
          }

          if (by[lucid] > antitimedblocks[o][1]-byte/2-ballwidth/1.5 && by[lucid] < antitimedblocks[o][1]+byte/2+ballwidth/1.5){
            if (bx[lucid] < antitimedblocks[o][0]-byte/2){
              dx[lucid] = -Math.abs(dx[lucid]);
            } else {
              dx[lucid] = Math.abs(dx[lucid]);
            }
          }
        }
        o += 1;
      }

      // blue locks
      o = 0;
      while (o < bluelocks.length && blueon){
        if (dist1(bluelocks[o][0],bluelocks[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          if (bx[lucid] > bluelocks[o][0]-byte/2-ballwidth/1.5 && bx[lucid] < bluelocks[o][0]+byte/2+ballwidth/1.5){
            if (by[lucid] < bluelocks[o][1]){
              dy[lucid] = -Math.abs(dy[lucid]);
            } else {
              dy[lucid] = Math.abs(dy[lucid]);
            }
          }

          if (by[lucid] > bluelocks[o][1]-byte/2-ballwidth/1.5 && by[lucid] < bluelocks[o][1]+byte/2+ballwidth/1.5){
            if (bx[lucid] < bluelocks[o][0]-byte/2){
              dx[lucid] = -Math.abs(dx[lucid]);
            } else {
              dx[lucid] = Math.abs(dx[lucid]);
            }
          }
        }
        o += 1;
      }

      // blue breakers
      o = 0;
      while (o < bluebreakers.length){
        if (dist1(bluebreakers[o][0],bluebreakers[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){

          if (bx[lucid] > bluebreakers[o][0]-byte/2-ballwidth/1.5 && bx[lucid] < bluebreakers[o][0]+byte/2+ballwidth/1.5){
            if (by[lucid] < bluebreakers[o][1]){
              dy[lucid] = -Math.abs(dy[lucid]);
            } else {
              dy[lucid] = Math.abs(dy[lucid]);
            }
          }

          if (by[lucid] > bluebreakers[o][1]-byte/2-ballwidth/1.5 && by[lucid] < bluebreakers[o][1]+byte/2+ballwidth/1.5){
            if (bx[lucid] < bluebreakers[o][0]-byte/2){
              dx[lucid] = -Math.abs(dx[lucid]);
            } else {
              dx[lucid] = Math.abs(dx[lucid]);
            }
          }

          // we are bouncing
          if (clrs[lucid] == BLUE){
            bluebreakers.splice(o,1);
          }
        }
        o += 1;
      }

      // pushers
      o = 0;
      while (o < leftpusher.length){
        if (dist1(leftpusher[o][0],leftpusher[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          // accelerate if not above threshold
          if (dx[lucid] > -pushlimit){
            dx[lucid] -= 0.1;
          }
        }
        o += 1;
      }
      o = 0;
      while (o < downpusher.length){
        if (dist1(downpusher[o][0],downpusher[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          // accelerate if not above threshold
          if (dy[lucid] < pushlimit){
            dy[lucid] += 0.1;
          }
        }
        o += 1;
      }
      o = 0;
      while (o < rightpusher.length){
        if (dist1(rightpusher[o][0],rightpusher[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          // accelerate if not above threshold
          if (dx[lucid] < pushlimit){
            dx[lucid] += 0.1;
          }
        }
        o += 1;
      }
      o = 0;
      while (o < uppusher.length){
        if (dist1(uppusher[o][0],uppusher[o][1],bx[lucid],by[lucid]) < ballwidth+byte/2){
          // accelerate if not above threshold
          if (dy[lucid] > -pushlimit){
            dy[lucid] -= 0.1;
          }
        }
        o += 1;
      }

      lucid += 1;
    }

    // now process hitting each other
    // are they close enough
    // assume 4 balls max for now
    // get the subsets
    // we already got the subsets

    // upgrade the collision timers
    let ye = 0;
    while (ye < collisiontimer.length){
      collisiontimer[ye] += 1;
      ye += 1;
    }

    //console.log(newsubs);

    // now try each of them
    i = 0;
    while (i < newsubs.length){
      if ((collisiontimer[i] > 20 || (bx[newsubs[i][0]] > width && bx[newsubs[i][1]] > width)) && touching(newsubs[i][0],newsubs[i][1])){
        bounce(newsubs[i][0],newsubs[i][1]);
        // now if we do the bounce set the timer
        collisiontimer[i] = 0;

        // if (!(bx[newsubs[i][0]] > width && bx[newsubs[i][1]] > width)){
        //   collisionaudio.pause();
        //   collisionaudio.currentTime = 0;
        //   collisionaudio.play();
        // }
      }
      i += 1;
    }

    // is its center close enough to the hole
    lucid = 0;
    // for every single ball
    while (lucid < bx.length){


      // for every single hole
      let g = 0;
      while (g < holecenters.length){
        if (inholerange(lucid,g)){
          // this is in
          // so basically have some acceleration towards the hole   
          
          yoinkball(lucid,g);
        }
        g += 1;
      }


      // is it inside the hole
      let allowd = holewidth/20;
      g = 0;
      while (g < holecenters.length){
        if (bx[lucid] > holecenters[g][0]-allowd && bx[lucid] < holecenters[g][0]+allowd && by[lucid] > holecenters[g][1]-allowd && by[lucid] < holecenters[g][1]+allowd){
          // this one is in the hole
          if (bwidths[lucid] == ballwidth){
            dx[lucid] = 0;
            dy[lucid] = 0;
            shrinkball(lucid,g);
            numgotten += 1;
          }
        }
        g += 1;
      }

      // is the ball too slow
      // if (Math.abs(dx[lucid]) < 0.1 && Math.abs(dy[lucid]) < 0.1 && bx[lucid] < width){
      //   dx[lucid] = 0.1;
      // }
    
      lucid += 1;
    }

    // if (univrb){
    //   console.log('pushed');
    //   pushballs();
    //   univrb = false;
    // }

    nextgap = 1;
    let lasttimee = 0;
    if (releaser != null){
      let r = 0;
      while (r < releasetimes.length){
        if (univtimer > releasetimes[r] && !releasedstatuses[r]){
          // release it
          //console.log('called for ',r,' on time ',releasetimes[r]);
          releaseball(r);
        }

        if (nextgap == 1 && !releasedstatuses[r]){
          // what was the total time since the last one
          nextgap = releasetimes[r]-lasttimee;
          // what is the time remaining from now till that time
          nextt = releasetimes[r]-univtimer;
        }

        lasttimee = releasetimes[r];

        r += 1;
      }
    }

    if (audi.currentTime >= audi.duration){
      audi.currentTime = 0;
      audi.play();
    }

    tbtimer += 1;
    if (tbtimer >= timedblockinterval){
      tbtimer = 0;
    }
    pushtimer += 0.1;
    if (pushtimer >= byte/2){
      pushtimer = 0;
    }

    y += 1;
    univtimer += 1;
    await sleep(); // standard delay
  }
})();
// ok thats it for the main loop

// keypress processing
(async () => {
  window.addEventListener("keydown", function(event) {
    
    if (event.defaultPrevented) {
      return;
    }

    let actkey = event.code.replace('Key','')
    let filterletters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    
  }, true);
})();
