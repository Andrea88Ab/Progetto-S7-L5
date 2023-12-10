
const url = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDg1ZTJjNmEwZDAwMTg0OTU5YzIiLCJpYXQiOjE3MDIxMTk1MTgsImV4cCI6MTcwMzMyOTExOH0.WExph43dGmV12524ifHppKvuAKeqTxeQIpIA0j_t1nE'


async function fetchData() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
  
      if (!response.ok) {
        throw new Error("Errore di rete");
      }
  
      let data = await response.json();
      
      console.log(data);
      return data
    } catch (error) {
      
      console.error("Errore:", error);
    } 
    
    
  }
  

 async function getHomePage() {

  data =  await fetchData();
  console.log("Fetch from home js");
  console.log(data);
  let rowCards = document.querySelector('#row-cards')
  data.forEach(product => {
    let col = ` 
    <div class="col">
    <div id="cardEntrada-2" class="p-4 text-center shadow-lg m-5 rounded-5"
    style="background: linear-gradient(171deg, var(--bs-pink) 0%, var(--bs-indigo) 100%), var(--bs-purple);width: 280px;">
    <img class="pt-2 w-50" src="${product.imageUrl}" width="116"
        height="147" />
    <h3 class="text-white text-center pt-2">${product.name}</h3>
    <p class="fw-light text-white m-0">${product.description}</p>
    <hr class="text-white" />
    <p class="text-light">Price ${product.price} $</p>
</div>
`
    rowCards.innerHTML += col
    
  });
  



}

async function postData(product) {

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    },
    body: JSON.stringify(product)  
  };

  try {
    let response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();  
    console.log(data);
    
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }
}




 
 async function getList() {

  data =  await fetchData();
  let rowCards = document.querySelector('#row-cards')
  data.forEach(product => {
    console.log(product)
    let col = ` 
    <div class="col">
    <div id="cardEntrada-2" class="p-4 text-center shadow-lg m-5 rounded-5"
    style="background: linear-gradient(171deg, var(--bs-pink) 0%, var(--bs-indigo) 100%), var(--bs-purple);width: 280px;">
    <img class="pt-2 w-50" src="${product.imageUrl}" width="116"
        height="147" />
    <h3 class="text-white text-center pt-2">${product.name}</h3>
    <p class="fw-light text-white m-0">${product.description}</p>
    <hr class="text-white" />
    <p class="text-light">Price ${product.price} $</p>
    <button onclick="deleteData('${product._id}')" class="btn btn-danger" type="button">Remove</button>
</div>
                
            </div>
        </div>
    </div>
    `
    rowCards.innerHTML += (col)

  });


 }

 async function deleteData(productId) {

  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  
    },
  };
  console.log("Deleting: " + productId)
  try {
    let response = await fetch(url+productId, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();      
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }

  document.querySelector('#row-cards').innerHTML = ''
  getList()
}





 
 var nomePagina = window.location.pathname;
if(nomePagina == "/home.html") {
  window.onload = getHomePage()
}
else if(nomePagina == "/backoffice.html") {
  window.onload = getList()

  // listener per pulsante salva
document.getElementById('btn-1').addEventListener('click', function() {
  let name = document.querySelector('#name-1').value
  let description = document.querySelector('#desc-1').value
  let brand  = document.querySelector('#brand-1').value
  let price = document.querySelector('#price-1').value
  let imageUrl = document.querySelector('#imageUrl-1').value

  product = {
    name: name,
    description: description,
    brand: brand,
    price: price,
    imageUrl: imageUrl,
  }

  console.log(product)
  postData(product)
  document.querySelector('#row-cards').innerHTML = ''
  getList()
 });
}

