const cartItemsContainer = document.getElementById("cart-items");
const checkoutMessage = document.getElementById("checkout-message");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function getCartTotal(cart) {
  return cart.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);
}

function showMessage(type, text) {
  checkoutMessage.innerHTML = `
    <div class="message ${type === "error" ? "message-error" : "message-success"}">
      ${text}
    </div>
  `;
}

function renderCart() {
  const cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="loading">Your cart is empty.</p>`;
    return;
  }

  const html = cart.map((item, index) => {
    const itemTotal = Number(item.price) * Number(item.quantity);

    return `
      <div class="cart-item">
        <div>
          <h4>${item.productName}</h4>
          <p>€${Number(item.price).toFixed(2)} × ${item.quantity}</p>
          <p><strong>Total:</strong> €${itemTotal.toFixed(2)}</p>
        </div>
        <button type="button" class="btn-dark remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
  }).join("");

  cartItemsContainer.innerHTML = `
    ${html}
    <div class="cart-total">
      <h3>Total Price: €${getCartTotal(cart).toFixed(2)}</h3>
    </div>
  `;

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      removeCartItem(button.getAttribute("data-index"));
    });
  });
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function buildPendingOrder() {
  const cart = getCart();

  if (cart.length === 0) {
    showMessage("error", "Your cart is empty.");
    return null;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerEmail = document.getElementById("customerEmail").value.trim();

  if (!customerName || !customerEmail) {
    showMessage("error", "Please fill in your name and email before payment.");
    return null;
  }

  return {
    items: cart,
    totalPrice: getCartTotal(cart),
    customerName,
    customerEmail,
    paymentStatus: "Paid"
  };
}

renderCart();

if (typeof paypal !== "undefined") {
  paypal.Buttons({
    createOrder: function (data, actions) {
      const pendingOrder = buildPendingOrder();

      if (!pendingOrder) {
        throw new Error("Customer details missing.");
      }

      localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));

      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: pendingOrder.totalPrice.toFixed(2),
              currency_code: "EUR"
            },
            description: "Lunéra Order"
          }
        ]
      });
    },

    onApprove: function (data, actions) {
      return actions.order.capture().then(async function () {
        const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));

        if (!pendingOrder) {
          showMessage("error", "Order data not found.");
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

          const result = await response.json();

          if (response.ok) {
            localStorage.removeItem("cart");
            localStorage.removeItem("pendingOrder");
            window.location.href = "checkout-success.html";
          } else {
            showMessage("error", result.message || "Order could not be saved.");
          }
        } catch (error) {
          showMessage("error", "Server error while saving order.");
        }
      });
    },

    onCancel: function () {
      window.location.href = "checkout-cancel.html";
    },

    onError: function (err) {
      console.error(err);
      showMessage("error", "Payment failed. Please try again.");
    }
  }).render("#paypal-button-container");
} else {
  showMessage("error", "PayPal could not be loaded.");
}