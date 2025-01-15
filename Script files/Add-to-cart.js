// Initialize an empty cart
let cart = [];

// Selectors
const cartTab = document.querySelector(".cartTab");
const cartIcon = document.querySelector(".nav-icon");
const cartCount = document.querySelector(".nav-icon span");
const closeCartButton = document.querySelector(".close");
const cartList = document.querySelector(".listCart");
const addToCartButtons = document.querySelectorAll(".addToCart");

// Toggle cart tab visibility
cartIcon.addEventListener("click", () => {
  document.body.classList.toggle("showCart");
});

// Close cart tab
closeCartButton.addEventListener("click", () => {
  document.body.classList.remove("showCart");
});

// Add items to cart
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const itemElement = event.target.closest(".items");
    if (!itemElement) return;

    const itemName = itemElement.querySelector("h3").textContent.trim();
    const itemPrice = parseFloat(
      itemElement.querySelector(".price").textContent.replace("$", "").trim()
    );
    const itemImgSrc = itemElement.querySelector(".product-img").src;

    // Generate a unique identifier for the item (for example, using name + price)
    const itemId = `${itemName}-${itemPrice}`;

    // Check if item already exists in cart based on unique itemId
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item exists
    } else {
      // Add new item to cart with unique ID
      cart.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        img: itemImgSrc,
        quantity: 1
      });
    }

    updateCart();
  });
});

// Update cart display
function updateCart() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart list
  cartList.innerHTML = ""; // Clear previous cart items
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("shopItems");

    cartItem.innerHTML = `
      <div class="itemImg">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="itemName">${item.name}</div>
      <div class="itemPrice">$${item.price.toFixed(2)}</div>
      <div class="quantity">
        <span class="minus" onclick="changeQuantity(${index}, -1)">-</span>
        <span class="value">${item.quantity}</span>
        <span class="plus" onclick="changeQuantity(${index}, 1)">+</span>
      </div>
    `;
    // <button onclick="removeItem(${index})">Remove</button> <!-- Remove item button --> the line write in uder semicolons


    cartList.appendChild(cartItem);
  });

  // Update the total price of all items in the cart
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalPriceElement = document.querySelector(".totalPrice");
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Change item quantity
function changeQuantity(index, delta) {
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove item if quantity is 0
  }

  updateCart();
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1); // Remove the item
  updateCart();
}
