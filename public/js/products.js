const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let allProducts = [];

async function fetchProducts(search = "") {
  try {
    let url = "/api/products";

    if (search) {
      url += `?search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url);
    const products = await response.json();

    allProducts = products;
    renderProducts(products);

  } catch (error) {
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

function renderProducts(products) {
  if (!products || products.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productsContainer.innerHTML = products.map(product => `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p>€${product.price}</p>
      <a href="product.html?id=${product._id}">View</a>
    </div>
  `).join("");
}

searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();
  fetchProducts(value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchProducts(searchInput.value.trim());
  }
});

fetchProducts();