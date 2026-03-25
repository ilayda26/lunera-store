const ordersContainer = document.getElementById("orders-container");

async function fetchOrders() {
  try {
    const response = await fetch("/api/orders");
    const orders = await response.json();

    if (!orders || orders.length === 0) {
      ordersContainer.innerHTML = `<p class="loading">No orders found.</p>`;
      return;
    }

    renderOrders(orders);
  } catch (error) {
    ordersContainer.innerHTML = `
      <div class="message message-error">
        Failed to load orders.
      </div>
    `;
  }
}

function renderOrders(orders) {
  const tableRows = orders
    .map((order) => {
      const itemNames = order.items
        .map((item) => `${item.productName} × ${item.quantity}`)
        .join("<br>");

      let statusClass = "status-pending";

      if (order.paymentStatus === "Paid") {
        statusClass = "status-paid";
      } else if (order.paymentStatus === "Cancelled") {
        statusClass = "status-cancelled";
      }

      return `
        <tr>
          <td>${itemNames}</td>
          <td>${order.customerName}</td>
          <td>${order.customerEmail}</td>
          <td>€${order.totalPrice.toFixed(2)}</td>
          <td>
            <span class="status-badge ${statusClass}">
              ${order.paymentStatus}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");

  ordersContainer.innerHTML = `
    <table class="orders-table">
      <thead>
        <tr>
          <th>Products</th>
          <th>Customer</th>
          <th>Email</th>
          <th>Total Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
}

fetchOrders();