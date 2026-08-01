// ==========================================================
// CART PAGE LOGIC (js/cart.js)
// ==========================================================

// 1. Cart Items ko Page par Render karne ka Function
function renderCartPage() {
  const tableBody = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  if (!tableBody) return;

  const cart = getCart(); // main.js ka function use ho raha hai
  tableBody.innerHTML = "";
  let grandTotal = 0;

  // Agar cart khali hai
  if (cart.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 40px; color: #9F9F9F;">
          Your cart is currently empty.
        </td>
      </tr>
    `;
    if (subtotalEl) subtotalEl.innerText = "Rs. 0.00";
    if (totalEl) totalEl.innerText = "Rs. 0.00";
    return;
  }

  // Cart Items ki rows generate karna
  cart.forEach((item) => {
    const itemSubtotal = item.price * item.qty;
    grandTotal += itemSubtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="cart-product-info">
        <div class="cart-img-box">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <span>${item.name}</span>
      </td>
      <td class="cart-price">Rs. ${item.price.toLocaleString()}.00</td>
      <td>
        <input
          type="number"
          class="cart-qty-input"
          value="${item.qty}"
          min="1"
          onchange="updateCartQuantity(${item.id}, this.value)"
        />
      </td>
      <td class="cart-subtotal">Rs. ${itemSubtotal.toLocaleString()}.00</td>
      <td class="cart-remove">
        <button class="btn-remove-item" onclick="removeCartPageItem(${item.id})" title="Remove Item">
          <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 5.5L4.5 17.5M4.5 5.5L16.5 17.5" stroke="#B88E2F" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Totals update karna
  const formattedTotal = `Rs. ${grandTotal.toLocaleString()}.00`;
  if (subtotalEl) subtotalEl.innerText = formattedTotal;
  if (totalEl) totalEl.innerText = formattedTotal;
}

// 2. Quantity Change karne ka Function
function updateCartQuantity(productId, newQty) {
  let quantity = parseInt(newQty);
  if (isNaN(quantity) || quantity < 1) quantity = 1;

  let cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex > -1) {
    cart[itemIndex].qty = quantity;
    saveCart(cart); // LocalStorage update
    renderCartPage(); // Screen update
    if (typeof renderCartSidebarItems === "function") {
      renderCartSidebarItems(); // Sidebar bhi sync ho jayega
    }
  }
}

// 3. Item Remove karne ka Function
function removeCartPageItem(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);

  saveCart(cart);
  renderCartPage();
  if (typeof renderCartSidebarItems === "function") {
    renderCartSidebarItems();
  }
}

// Page load par cart render karna
document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
});