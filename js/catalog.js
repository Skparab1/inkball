
let holder = document.getElementById('allmaps');
// document.body.innerHTML += "<div><h2>Medium</h2></div>";

let ij = 1;
let completedmaps = 0;
while (ij < 33){
  let div = document.createElement('tr');
  div.innerHTML = `
    <a href="./index.html?map${ij}">
      <h2 >Map ${ij}</h2>
      <img src="images/m${ij}.png" height='150px' alt="image of map ${ij}">
    </a>
  `;

  console.log("map"+ij);

  if (localStorage.getItem("map"+ij) != null){
    // finished it
    div.innerHTML += `
      <h3 class='chroma'>Completed in ${localStorage.getItem("map"+ij)} sec</h3>
    `;
    completedmaps += 1;
    // div.style.backgroundColor = 'green';
  } else {
    div.innerHTML += `
    <h3 style="color: black">•</h3>
  `;
  }

  div.style.float = 'left';
  div.style.width = '17%';
  div.style.marginLeft = '5.5%';

  if (ij < 5 || (ij > 12 && ij < 17) || (ij > 24 && ij < 29)){
    div.style.marginTop = '66px';
  }

  if (ij == 1){
    document.getElementById('easy').style.top = div.offsetTop+div.style.marginTop+10+'px';
    document.getElementById('easy').style.left = '5.5%';
  }

  if (ij == 13){
    document.getElementById('medium').style.top = 200*4+66*2+10+'px';
    document.getElementById('medium').style.left = '5.5%';
  }

  if (ij == 25){
    document.getElementById('hard').style.top = 200*8+66*3+10+'px';
    document.getElementById('hard').style.left = '5.5%';
  }

  document.body.appendChild(div);

  ij += 1;
}

function openwelcome(){
  document.getElementById('welcome').style.display = 'block';
  document.getElementById('fullcover').style.display = 'block';
}

function openbadge1(){
  document.getElementById('badge1d').style.display = 'block';
  document.getElementById('fullcover').style.display = 'block';
}


function openbadge2(){
  document.getElementById('badge2d').style.display = 'block';
  document.getElementById('fullcover').style.display = 'block';
}

function openbadge3(){
  document.getElementById('badge3d').style.display = 'block';
  document.getElementById('fullcover').style.display = 'block';
}

// is this the users first time
let us = localStorage.getItem('inkballname');
if (us == null){
  // then its the first time
  // set the name as the default
  localStorage.setItem('inkballname','player');
  
  // launch the welcome dialogue
  openwelcome();
}

let badges = ''; 

if (completedmaps >= 10){
  document.getElementById('badge1').style.display = 'block';
  badges += 'check';
}
if (completedmaps >= 20){
  document.getElementById('badge2').style.display = 'block';
  badges += 'star';
}
if (completedmaps >= 30){
  document.getElementById('badge3').style.display = 'block';
  badges += 'trophy';
}

localStorage.setItem('badges',badges);

