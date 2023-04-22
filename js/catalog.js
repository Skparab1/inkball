
let holder = document.getElementById('allmaps');

let ij = 1;
while (ij < 33){
  let div = document.createElement('tr');
  div.innerHTML = `
    <a href="./index.html?map${ij}">
      <h2 >Map ${ij}</h2>
      <img src="images/map${ij}.png" height='150px' alt="image of map ${ij}">
    </a>
  `;

  console.log("map"+ij);

  if (localStorage.getItem("map"+ij) != null){
    // finished it
    div.innerHTML += `
      <h3 class='chroma'>Completed in ${localStorage.getItem("map"+ij)} sec</h3>
    `;
    // div.style.backgroundColor = 'green';
  } else {
    div.innerHTML += `
    <h3 style="color: black">•</h3>
  `;
  }

  div.style.float = 'left';
  div.style.width = '17%';
  div.style.marginLeft = '5.5%';



  document.body.appendChild(div);

  ij += 1;
}

function openwelcome(){
  document.getElementById('welcome').style.display = 'block';
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
