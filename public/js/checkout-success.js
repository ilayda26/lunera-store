const successMessage = document.getElementById("success-message");

async function saveOrder() {
  const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));

  if (!pendingOrder) {
    successMessage.innerHTML = `
      <div class="message message-error">
        No pending order found.
      </div>
    `;
    return;
  }

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pendingOrder)
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.removeItem("cart");
      localStorage.removeItem("pendingOrder");

      successMessage.innerHTML = `
        <div class="message message-success">
          Payment completed successfully. Your order has been saved.
        </div>
        <div style="margin-top: 24px;">
          <a href="orders.html" class="btn-primary">View Orders</a>
        </div>
      `;
    } else {
      successMessage.innerHTML = `
        <div class="message message-error">
          ${data.message || "Order could not be saved."}
        </div>
      `;
    }
  } catch (error) {
    successMessage.innerHTML = `
      <div class="message message-error">
        Server error while saving order.
      </div>
    `;
  }
}

saveOrder();