
let holder = document.getElementById('allmaps');

let ij = 1;
while (ij < 27){
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
      <h3 style="color: green">Completed in ${localStorage.getItem("map"+ij)} sec</h3>
    `;
    // div.style.backgroundColor = 'green';
  } else {
    div.innerHTML += `
    <h3 style="color: black">hi</h3>
  `;
  }

  div.style.float = 'left';
  div.style.width = '17%';
  div.style.marginLeft = '5.5%';



  document.body.appendChild(div);

  ij += 1;
}

