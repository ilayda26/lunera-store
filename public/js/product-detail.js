const productDetailContainer = document.getElementById("product-detail");

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadProductDetail() {
  const productId = getProductIdFromUrl();

  if (!productId) {
    productDetailContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch(`/api/products/${productId}`);
    const product = await response.json();

    if (!response.ok || product.message) {
      productDetailContainer.innerHTML = "<p>Product not found.</p>";
      return;
    }

    productDetailContainer.innerHTML = `
      <div class="product-detail-card">
        <div class="product-detail-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>

        <div class="product-detail-info">
          <p class="product-card-category">${product.category}</p>
          <h2>${product.name}</h2>
          <p class="product-card-price">€${product.price.toFixed(2)}</p>
          <p><strong>Material:</strong> ${product.material}</p>
          <p><strong>Stock:</strong> ${product.stock}</p>
          <p class="product-description">${product.description}</p>

          <div class="buy-box">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" min="1" value="1" />

            <button id="add-to-cart-btn" class="btn-primary">Add to Order</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("add-to-cart-btn").addEventListener("click", () => {
      addToCart(product);
    });
  } catch (error) {
    productDetailContainer.innerHTML = "<p>Failed to load product.</p>";
  }
}

function addToCart(product) {
  const quantity = Number(document.getElementById("quantity").value);

  if (quantity < 1) {
    alert("Please select a valid quantity.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.productId === product._id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  const goToCheckout = confirm("Product added to cart. Go to checkout?");
  if (goToCheckout) {
    window.location.href = "checkout.html";
  }
}

loadProductDetail();