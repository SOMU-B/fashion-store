
const productListEl = document.getElementById("product-list");
const cartCountEl = document.getElementById("cart-count");
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  cartCountEl.textContent = `🛒 ${cart.length}`;
}

function renderProducts() {
  productListEl.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = \`
      <img src="\${product.image}" alt="\${product.name}" width="100%" />
      <h3>\${product.name}</h3>
      <p>₹\${product.price}</p>
      <button onclick="addToCart(\${index})">Add to Cart</button>
    \`;
    productListEl.appendChild(div);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

renderProducts();
updateCartCount();
