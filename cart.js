function addToCart(product) {
  var cartItems = document.querySelectorAll(".container-fluid");
  var existingItem = null;

  cartItems.forEach(function (item) {
    var titleElement = item.querySelector(".fs-5");
    var quantityInput = item.querySelector("input[type=number]");

    if (titleElement.textContent === product.title) {
      existingItem = item;
      return;
    }
  });

  if (existingItem) {
    var quantityInput = existingItem.querySelector("input[type=number]");
    quantityInput.stepUp();
  } else {
    var cart = document.getElementById("cart");
    var cartItem = document.createElement("div");
    cartItem.classList.add("container-fluid", "pb-3");
    cartItem.innerHTML = `
      <div class="card">
          <div class="card-body">
              <div class="row align-items-center">
                  <div class="col-6 col-md-2">
                      <img src="${product.image}" class="img-fluid rounded-2 image-cart" alt="${product.title}">
                  </div>
                  <div class="col-6 col-md-3">
                      <h4 class="fs-5">${product.title}</h4>
                      <p>${product.weight}</p>
                  </div>
                  <div class="col-5 col-md-3 pt-3 pt-md-0 d-flex flex-row-reverse text-center">
                      <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                          <i class="bi bi-plus"></i>
                      </button>
                      <input id="qty" min="1" name="quantity" value="1" type="number" class="form-control form-control-sm" />
                      <button class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                          <i class="bi bi-dash"></i>
                      </button>
                  </div>
                  <div class="col-5 col-md-3 pt-3 pt-md-0 text-center">
                      <h3 class="fs-6">${product.price}</h3>
                  </div>
                  <div class="col-2 col-md-1 pt-3 pt-md-0">
                      <button class="btn btn-link px-2" onclick="removeCartItem(this)">
                          <i class="bi bi-trash"></i>
                      </button>
                  </div>
              </div>
          </div>
      </div>
    `;
    cart.appendChild(cartItem);
  }
  updatetotal();
}

var addToCartBtns = document.querySelectorAll("#addToCartBtn");

addToCartBtns.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    event.preventDefault();
    var product = {
      image: btn.closest(".card").querySelector("img").src,
      title: btn.closest(".card").querySelector(".card-title").textContent,
      weight: btn.closest(".card").querySelector("p").textContent,
      price: btn.closest(".card").querySelector(".price").textContent,
    };
    console.log(product);
    addToCart(product);
  });
});

function updatetotal() {
  var items = document.querySelectorAll(".modal-body .card");
  var total = 0;
  var totalqty = 0;

  items.forEach(function (item) {
    var price = item.querySelector(".fs-6").textContent.slice(2);
    var qty = item.querySelector("input[type=number]").value;
    var subTotal = parseInt(price) * parseInt(qty) * 1000;
    totalqty = parseInt(qty) + totalqty;
    total += subTotal;
  });

  var formattedtotal = "Rp" + total.toLocaleString("id-ID");
  var totalElement = document.getElementById("total");
  var jumlahitem = document.getElementById("jumlahitem");

  if (items.length === 0) {
    totalElement.textContent = "Rp0";
    jumlahitem.style.display = "none";
  } else {
    totalElement.textContent = formattedtotal;
    jumlahitem.textContent = totalqty;
    jumlahitem.style.display = "block";
  }
}

function removeCartItem() {
  var trashButtons = document.querySelectorAll(".bi-trash");

  trashButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var containerFluid = button.closest(".container-fluid");
      containerFluid.remove();
      updatetotal();
    });
  });
}

setInterval(updatetotal, 100);
