
let holder = document.getElementById('allmaps');

let ij = 1;
while (ij < 8){
  let div = document.createElement('tr');
  div.innerHTML = `
    <a href="./index.html?map${ij}">
      <h2 class='form-button'>Map ${ij}</h2>
      <img src="images/map${ij}.png" width='95%' alt="map ${ij}">
    </a>
  `;

  console.log("map"+ij);

  if (localStorage.getItem("map"+ij) != null){
    // finished it
    div.innerHTML += `
      <h3>Completed in ${localStorage.getItem("map"+ij)} sec</h3>
    `;
    div.style.border = '3px solid green';
  }

  div.style.float = 'left';
  div.style.width = '20%';

  document.body.appendChild(div);

  ij += 1;
}

