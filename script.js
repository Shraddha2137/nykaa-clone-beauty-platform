let products = [];

async function searchFoundation() {
  let query = document.getElementById("search")?.value || "maybelline";
  let url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation&brand=${query}`;
  let res = await fetch(url);
  products = await res.json();
  displayProducts(products);
}

function displayProducts(data) {
  let results = document.getElementById("results");
  if (!results) return;
  results.innerHTML = "";
  data.forEach(item => {
    let card = `<div class="product-card">
                  <img src="${item.image_link}" alt="${item.name}">
                  <h3>${item.name}</h3>
                  <p>Brand: ${item.brand}</p>
                  <p>Price: ${item.price} ${item.price_sign || ''}</p>
                  <button class="cart-btn" onclick="addToCart('${item.name}')">🛒 Add to Cart</button>
                  <button class="wishlist-btn" onclick="addToWishlist('${item.name}')">❤️ Wishlist</button>
                </div>`;
    results.innerHTML += card;
  });
}

function applyFilter() {
  let filter = document.getElementById("priceFilter").value;
  let filtered = products.filter(item => {
    let price = parseFloat(item.price);
    if (filter === "low") return price < 500;
    if (filter === "mid") return price >= 500 && price <= 1000;
    if (filter === "high") return price > 1000;
    return true;
  });
  displayProducts(filtered);
}

function addToCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(name);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function addToWishlist(name) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push(name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert(`${name} added to wishlist!`);
}

window.onload = () => {
  let cartItems = document.getElementById("cartItems");
  if (cartItems) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.innerHTML = cart.map(item => `<p>${item}</p>`).join("");
  }

  let wishlistItems = document.getElementById("wishlistItems");
  if (wishlistItems) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistItems.innerHTML = wishlist.map(item => `<p>${item}</p>`).join("");
  }
};
