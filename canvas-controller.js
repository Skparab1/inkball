// canvas template

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-20; 
canvas.height = window.innerHeight-20; 
// byte, canvas declared in first.js
const width = byte*30;
const height = byte*19; // gonna make a full sized canvas with a little bit of ground leeway

// set up the audio
var audi = new Audio('inkball_theme.mp3');
audi.volume = 0.5;
audi.play();

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
  while (j < blocks.length){
    ctx.fillStyle = 'gray';
    ctx.fillRect(blocks[j][0]-byte/2,blocks[j][1]-byte/2 ,byte,byte);
    j += 1;
  }

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
    let draww = ballwidth/2;
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
            if (s <= 2){
              deltax = mousetrail[r][s+2][0]-mousetrail[r][s][0];
              deltay = mousetrail[r][s+2][1]-mousetrail[r][s][1];
              //console.log('called this btw',mousetrail[r][s+1][1], mousetrail[r][s][1]);
            } else {
              deltax = mousetrail[r][s][0]-mousetrail[r][s-2][0];
              deltay = mousetrail[r][s][1]-mousetrail[r][s-2][1];
            }

            if (deltax == 0){
              if (deltax < 0){
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
  if (clrs[num] != holecolors[hole]){
    // you lost
    alert("Oops! Ball entered hole of wrong color");
    location.reload();
  }

  let u = 100;
  while (u > 0){
    bwidths[num] = u/100*ballwidth;
    //console.log(bwidths);
    await sleep(2);
    u -= 1;
  }

  bwidths[num] = ballwidth;

  bx[num] = width+byte*2; // this may be wrong
  by[num] = byte*8;
  dx[num] = 0; // shud already be but anyway
  dy[num] = 0; // but we accelerate this;

  if (numgotten >= bx.length){
    // you won
    let endTime = new Date();
    let time = endTime-startTime;
    time = time/1000;
    console.log('map'+mapnum);
    localStorage.setItem('map'+mapnum,time);
    alert('You won! Time taken: '+time+" sec");
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

let loaded = false;

// ballwidth, sfactor and other defined in first.js
let borderwidth = byte;
let holewidth = ballwidth*2;

let mousedown = false;
let mousepos = [0,0];
let mousetrail = [];

let startTime = new Date();

let numgotten = 0;


//get the map we are going to use
let map;
let mapnum = -1;


if (window.location.href.includes("map10")){
  map = getmap10(); mapnum = 10;
} else if (window.location.href.includes("map11")){
  map = getmap11(); mapnum = 11;
} else if (window.location.href.includes("map12")){
  map = getmap12(); mapnum = 12;
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

let bx = byteize1d(map.bx);
let by = byteize1d(map.by);

let dx = sfactorize(map.dx);
let dy = sfactorize(map.dy);
let tempdx = dx; //if needed
let tempdy = dy;

let clrs = map.clrs;

//holes
let holecenters = byteize(map.holecenters); // the centers
let holecolors = map.holecolors; // the centers

// blocks
let blocks = byteize(map.blocks);
let testing = true; 

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

    ctx.fillStyle = 'red';
    let lucid = 0;
    while (lucid < bx.length){
      ctx.beginPath();
      ctx.arc(bx[lucid],by[lucid],bwidths[lucid],0,Math.PI*2);
      ctx.fillStyle = clrs[lucid];
      ctx.fill();
      lucid += 1;
    }

    lucid = 0;
    while (lucid < bx.length){
      bx[lucid] += dx[lucid];
      by[lucid] += dy[lucid];
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

      lucid += 1;
    }

    // now process hitting each other
    // are they close enough
    // assume 4 balls max for now
    // get the subsets


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

    //console.log(newsubs);

    // now try each of them
    i = 0;
    while (i < newsubs.length){
      if (touching(newsubs[i][0],newsubs[i][1])){
        bounce(newsubs[i][0],newsubs[i][1]);
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
