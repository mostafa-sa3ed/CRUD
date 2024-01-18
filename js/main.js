var productNameInput = document.getElementById("productName");
var productGategryInput = document.getElementById("productGategory");
var productPriceInput = document.getElementById("productPrice");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productList = []; // list that storage data

if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

//function to get value from the user and inser them in the object

function getElementValue() {
  if (validationInput() == true) {
    var product = {
      name: productNameInput.value,
      gategry: productGategryInput.value,
      price: productPriceInput.value,
      description: productDescInput.value,
    };

    productList.unshift(product); //add object data in thislist
    localStorage.setItem("products", JSON.stringify(productList)); //to set data in localstorage
    displayProducts(); //call displayProduct function when we click in button in html
    clearForm();
  } else {
    alert("Please Enter Valid Product Name");
  }
}

// document.getElementById("clkbtn").onclick = (function () {
//   if (document.getElementById("clkbtn").innerHTML == "Add Product") {
//     displayProducts();
//   } else {
//     finalEdit();
//   }
// })();

//function to insert data we get from user to show in the table in html

function displayProducts() {
  var cartona = ``;
  for (var i = 0; i < productList.length; i++) {
    cartona += ` <tr>
      <td>${i + 1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].gategry}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].description}</td>
      <td>
        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
      </td>
      <td>
        <button onclick="setFormUpdate(${i})" class="btn btn-warning">Update</button>
      </td>
    </tr>`;

    document.getElementById("tbodyId").innerHTML = cartona;
  }
}

//clear data after add

function clearForm() {
  productNameInput.value = "";
  productGategryInput.value = "";
  productPriceInput.value = "";
  productDescInput.value = "";
}
//function to delete product from the array

function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
  localStorage.setItem("products", JSON.stringify(productList)); //to set data in localstorage
  displayProducts();
}

//function to search

function search(value) {
  var cartona = ``;
  // console.log(productList);
  var x = 0; //number of search index
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
      cartona += ` <tr>
      <td>${++x}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].gategry}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].description}</td>
      <td>
        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
      </td>
      <td>
        <button onclick="setFormUpdate(${i})" class="btn btn-warning">Update</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("tbodyId").innerHTML = cartona;
}

//function update

var globalIndex;
function setFormUpdate(updateIndex) {
  globalIndex = updateIndex;
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productNameInput.value = productList[updateIndex].name;
  productGategryInput.value = productList[updateIndex].gategry;
  productPriceInput.value = productList[updateIndex].price;
  productDescInput.value = productList[updateIndex].description;
}

//function finalEdit

function finalUpdate() {
  productList[globalIndex].name = productNameInput.value;
  productList[globalIndex].gategry = productGategryInput.value;
  productList[globalIndex].price = productPriceInput.value;
  productList[globalIndex].description = productDescInput.value;
  localStorage.setItem("products", JSON.stringify(productList));
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  displayProducts();
  clearForm();
}

//validation function

function validationInput() {
  var regex = /^[^\s]+$/;
  return regex.test(productNameInput.value);
}
