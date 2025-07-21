
const form = document.getElementById("product-form");
const adminProductsEl = document.getElementById("admin-products");
let products = JSON.parse(localStorage.getItem("products")) || [];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderAdminProducts() {
  adminProductsEl.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product-item";
    div.innerHTML = \`
      <img src="\${product.image}" alt="\${product.name}" width="100%" />
      <h3>\${product.name}</h3>
      <p>₹\${product.price}</p>
      <button onclick="deleteProduct(\${index})">Delete</button>
    \`;
    adminProductsEl.appendChild(div);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  renderAdminProducts();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const imageInput = document.getElementById("product-image");
  const reader = new FileReader();

  reader.onload = function () {
    const image = reader.result;
    products.push({ name, price, image });
    saveProducts();
    renderAdminProducts();
    form.reset();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  }
});

renderAdminProducts();
