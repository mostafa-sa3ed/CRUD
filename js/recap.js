var productNameInput = document.getElementById("productName");
var productGategryInput = document.getElementById("productGategory");
var productPriceInput = document.getElementById("productPrice");
var productDescInput = document.getElementById("productDesc");
var btn = document.getElementById("clkbtn");

var productList = []; // list that storage data

if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

btn.onclick = function () {
  if (btn.innerHTML == "add Product") {
    getElementValue();
  } else {
    finalEdit();
  }
  // clearForm()
};

//function to get value from the user and inser them in the object

function getElementValue() {
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
}

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
        <button onclick="updateProduct(${i})" class="btn btn-warning">Update</button>
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
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
      cartona += ` <tr>
      <td>${i}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].gategry}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].description}</td>
      <td>
        <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button>
      </td>
      <td>
        <button class="btn btn-warning">Update</button>
      </td>
    </tr>`;
    }
  }
  document.getElementById("tbodyId").innerHTML = cartona;
}

var globalIndex;
function updateProduct(updateIndex) {
  globalIndex = updateIndex;
  productNameInput.value = productList[updateIndex].name;
  productGategryInput.value = productList[updateIndex].gategry;
  productPriceInput.value = productList[updateIndex].price;
  productDescInput.value = productList[updateIndex].description;
  btn.innerHTML = "update";
}

function finalEdit() {
  productArr[globalIndex].productName = productNameInput.value;
  productArr[globalIndex].productPrice = productPriceInput.value;
  productArr[globalIndex].productCat = productCatInput.value;
  productArr[globalIndex].productDesc = productDescInput.value;
  localStorage.setItem("products", JSON.stringify(productList));
  displayProducts(productList);
  btn.innerHTML = "add Product";
}
