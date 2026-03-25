const featuredProductsContainer = document.getElementById("featured-products");

async function loadFeaturedProducts() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();

    if (!products || products.length === 0) {
      featuredProductsContainer.innerHTML = `
        <p class="loading">No products yet. <a href="add-product.html">Add one!</a></p>
      `;
      return;
    }

    const featured = products.slice(0, 3);

    featuredProductsContainer.innerHTML = featured
      .map(
        (product) => `
          <div class="product-card" onclick="window.location.href='product.html?id=${product._id}'">
            <img class="product-card-image" src="${product.image}" alt="${product.name}">
            <div class="product-card-info">
              <p class="product-card-category">${product.category}</p>
              <h3 class="product-card-name">${product.name}</h3>
              <p class="product-card-price">€${product.price.toFixed(2)}</p>
            </div>
          </div>
        `
      )
      .join("");
  } catch (error) {
    featuredProductsContainer.innerHTML = `
      <p class="loading">Could not load products.</p>
    `;
  }
}

loadFeaturedProducts();