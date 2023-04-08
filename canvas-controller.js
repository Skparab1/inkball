// canvas template

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-20; 
const byte = 2*((window.innerHeight-100)/(16*2.2));
const width = window.innerWidth-20-window.innerWidth/25-window.innerWidth/60;
const height = canvas.height = window.innerHeight-20; // gonna make a full sized canvas with a little bit of ground leeway

// now you can clearred fillrect fillstyle arc on the ctx


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
  ctx.fillRect(0,height-borderwidth, width, borderwidth)

  // this is a supposed hole
  let j = 0;
  while (j < holecenters.length){
    ctx.fillStyle = 'orange';
    ctx.fillRect(holecenters[j][0]-holewidth*1.5/2,holecenters[j][1]-holewidth*1.5/2,holewidth*1.5,holewidth*1.5);
    ctx.fillStyle = 'black';
    ctx.arc(holecenters[j][0],holecenters[j][1],holewidth/2,0,Math.PI*2);
    ctx.fill();
    j += 1;
  }
}

function mouse_position(){
  var e = window.event;

  var posX = e.clientX;
  var posY = e.clientY;

  mousepos = [posX,posY];

  //console.log(mousetrail);

  if (mousedown){
    mousetrail[mousetrail.length-1].push(mousepos);
    //console.log(mousetrail);
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
        ctx.lineTo(xp,yp);

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
              console.log('called this btw',mousetrail[r][s+1][1], mousetrail[r][s][1]);
            } else {
              deltax = mousetrail[r][s][0]-mousetrail[r][s-2][0];
              deltay = mousetrail[r][s][1]-mousetrail[r][s-2][1];
            }

            if (deltax == 0){
              if (deltay < 0){
                deltax = 0.01;
              } else {
                deltax = -0.01;
              }
            }

            // let vn = [deltay*100,deltax*100];
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

            let theta = radians_to_degrees(Math.atan(deltay/deltax));
            let e = radians_to_degrees(Math.atan(dy[bl]/dx[bl]));
            let endangle = 2*theta-e;

            // // sometimes this angle will have to be changed
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
            console.log('old velocities',dx[bl],dy[bl]);

            // let supnewx = magnitude*Math.cos(degreestoradians(endangle));
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
            
            let Velocity_Magnitude = Math.sqrt(dx[bl]*dx[bl]+dy[bl]*dy[bl]);

            // let new_x = dx + vx * Velocity_Magnitude * Time_Interval

            let nx = -Math.sin(degreestoradians(theta));
            let ny = Math.cos(degreestoradians(theta));

            let dot = dx[bl] * nx + dy[bl] * ny;

            let vnewx = vx - 2 * dot * nx;
            let vnewy = vy - 2 * dot * ny;

            dx[bl] = vnewx;
            dy[bl] = vnewy;

            console.log('new velocities',dx[bl],dy[bl]);

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

async function shrinkball(num){
  let u = 100;
  while (u > 0){
    bwidths[num] = u/100*ballwidth;
    //console.log(bwidths);
    await sleep(2);
    u -= 1;
  }

  bwidths[num] = ballwidth;

  bx[num] = width+borderwidth+ballwidth;
  by[num] = ballwidth;
  dx[num] = 0; // shud already be but anyway
  dy[num] = 0; // but we accelerate this;
}

const getAllSubsets = 
  theArray => theArray.reduce(
    (subsets, value) => subsets.concat(
      subsets.map(set => [value,...set])
    ),
    [[]]
);

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


let ballwidth = window.innerWidth/55;
let borderwidth = window.innerWidth/60;
let holewidth = ballwidth*2;

let numgotten = 0;

let bx = [100];
let by = [100];

let dx = [1];
let dy = [0];

const BLUE = "rgb(3, 161, 252)";
const ORANGE = "rgb(252, 115, 3)";

let clrs = [BLUE];
let bwidths = [ballwidth];
let bounceexp = [0,0,0,0];

let mousedown = false;
let mousepos = [0,0];
let mousetrail = [];

//addball();
// addball();

//holes
let holecenters = [[width-borderwidth-holewidth/1.33,height-borderwidth-holewidth/1.33],[borderwidth+holewidth/1.33,height-borderwidth-holewidth/1.33]]; // the centers

let testing = true;

// main loop
let y = 0;
(async () => {
  while (y < 10 || testing){
    //a big ol background rect
    drawbg();

    drawmousetrail();

    if (mousedown){
      mousetrail[mousetrail.length-1].push(mousepos);
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
        if (bx[lucid] > width+borderwidth){
          // an out ball
        } else {
          // bounce at full
          dy[lucid] = -Math.abs(dy[lucid]);
        }
      }

      if (bx[lucid] > width+borderwidth){
        // it is an out ball
        if (by[lucid] < height-borderwidth-ballwidth*(numgotten)*2){
          // in range
          dy[lucid] += 1;
        } else {
          dy[lucid] = -Math.abs(dy[lucid]*0.7);
        }
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
            shrinkball(lucid);
            numgotten += 1;
          }
        }
        g += 1;
      }

    
      lucid += 1;
    }



    y += 1;
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
