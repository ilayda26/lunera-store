const productForm = document.getElementById("product-form");
const messageBox = document.getElementById("message-box");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const productData = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: Number(document.getElementById("price").value),
    category: document.getElementById("category").value,
    material: document.getElementById("material").value,
    image: document.getElementById("image").value.trim(),
    stock: Number(document.getElementById("stock").value)
  };

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });

    const data = await response.json();

    if (response.ok) {
      messageBox.innerHTML = `
        <div class="message message-success">
          Product added successfully.
        </div>
      `;

      productForm.reset();
    } else {
      messageBox.innerHTML = `
        <div class="message message-error">
          ${data.message || "Failed to add product."}
        </div>
      `;
    }
  } catch (error) {
    messageBox.innerHTML = `
      <div class="message message-error">
        Server error. Please try again.
      </div>
    `;
  }
});