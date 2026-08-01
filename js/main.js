// ==========================================================
// 1. COMPONENT LOADER & DYNAMIC CART INJECTION
// ==========================================================
const loadComponent = async (targetId, filePath) => {
  const targetContainer = document.getElementById(targetId);
  if (!targetContainer) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const htmlContent = await response.text();
    targetContainer.innerHTML = htmlContent;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
};

// Har page par Cart Sidebar HTML auto-inject karne ka function
function injectCartSidebarHTML() {
  if (document.getElementById("cart-sidebar")) return; // Agar pehle se hai to dobara add na kare

  const cartMarkup = `
    <div class="cart-overlay" id="cart-overlay" onclick="closeCartSidebar()"></div>
    <div class="cart-sidebar" id="cart-sidebar">
      <div class="cart-sidebar-header">
        <h2>Shopping Cart</h2>
        <button class="close-cart-btn" onclick="closeCartSidebar()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4L12 12" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <hr class="sidebar-divider" />
      <div class="cart-sidebar-items" id="cart-sidebar-items"></div>
      <div class="cart-sidebar-footer">
        <div class="subtotal-box">
          <span>Subtotal</span>
          <span class="subtotal-amount" id="cart-subtotal">Rs. 0.00</span>
        </div>
        <hr class="sidebar-divider" />
        <div class="sidebar-actions">
          <a href="cart.html" class="btn-sidebar-pill">Cart</a>
          <a href="checkout.html" class="btn-sidebar-pill">Checkout</a>
          <a href="comparison.html" class="btn-sidebar-pill">Comparison</a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", cartMarkup);
}

// Highlight Active Navigation Link
const highlightActiveNav = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

// ==========================================================
// 2. LOCALSTORAGE CART SYSTEM
// ==========================================================
function getCart() {
  const cart = localStorage.getItem("furniro_cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("furniro_cart", JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  let itemToAdd = null;

  if (typeof productsData !== "undefined") {
    const found = productsData.find((p) => p.id === Number(productId));
    if (found) {
      itemToAdd = {
        id: found.id,
        name: found.name,
        price: typeof found.price === "number" ? found.price : Number(found.price.replace(/[^0-9.-]+/g, "")),
        image: found.image
      };
    }
  }

  if (!itemToAdd) {
    itemToAdd = {
      id: 999,
      name: "Asgaard sofa",
      price: 250000,
      image: "./assets/images/asgaard-sofa-main.png"
    };
  }

  let cart = getCart();
  const existingIndex = cart.findIndex((item) => item.id === itemToAdd.id);

  if (existingIndex > -1) {
    cart[existingIndex].qty += quantity;
  } else {
    cart.push({
      id: itemToAdd.id,
      name: itemToAdd.name,
      price: itemToAdd.price,
      image: itemToAdd.image,
      qty: quantity
    });
  }

  saveCart(cart);
  showToast(`${itemToAdd.name} added to cart!`);
  renderCartSidebarItems();
}

function openCartSidebar() {
  const overlay = document.getElementById("cart-overlay");
  const sidebar = document.getElementById("cart-sidebar");
  if (overlay && sidebar) {
    renderCartSidebarItems();
    overlay.classList.add("active");
    sidebar.classList.add("active");
  }
}

function closeCartSidebar() {
  const overlay = document.getElementById("cart-overlay");
  const sidebar = document.getElementById("cart-sidebar");
  if (overlay && sidebar) {
    overlay.classList.remove("active");
    sidebar.classList.remove("active");
  }
}

function renderCartSidebarItems() {
  const container = document.getElementById("cart-sidebar-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#9F9F9F; margin-top:40px;">Your cart is empty.</p>`;
    if (subtotalEl) subtotalEl.innerText = "Rs. 0.00";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const itemEl = document.createElement("div");
    itemEl.className = "sidebar-item";
    itemEl.innerHTML = `
      <img src="${item.image}" class="sidebar-item-img" alt="${item.name}">
      <div class="sidebar-item-info">
        <h4 class="sidebar-item-title">${item.name}</h4>
        <div class="sidebar-item-price-qty">
          <span class="qty">${item.qty}</span>
          <span class="multiply">X</span>
          <span class="price">Rs. ${item.price.toLocaleString()}.00</span>
        </div>
      </div>
      <button class="remove-item-icon" onclick="removeCartSidebarItem(${index})">✕</button>
    `;
    container.appendChild(itemEl);
  });

  if (subtotalEl) {
    subtotalEl.innerText = `Rs. ${total.toLocaleString()}.00`;
  }
}

function removeCartSidebarItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartSidebarItems();
}

function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #B88E2F;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    font-size: 14px;
    transition: opacity 0.3s ease;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ==========================================================
// 3. INITIALIZATION & GLOBAL HOVER/CLICK LISTENERS
// ==========================================================
let cartHoverTimeout;

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Header & Footer dynamically load honge
  await loadComponent("site-header", "./header.html");
  await loadComponent("site-footer", "./footer.html");

  // 2. Har page par Cart Drawer HTML inject hoga
  injectCartSidebarHTML();

  // 3. Nav links active highlight
  highlightActiveNav();

  // 4. Cart Icons aur Sidebar Bindings Setup
  // Header me se cart icon (img, svg, ya parent link) find karein
  const cartIcon = 
    document.querySelector(".cart-icon") || 
    document.getElementById("open-cart-btn") ||
    document.querySelector('a[href*="cart.html"]') ||
    document.querySelector('.nav-icons a:last-child');

  const cartSidebar = document.getElementById("cart-sidebar");

  if (cartIcon && cartSidebar) {
    // Mobile / Tap Click Toggle
    cartIcon.addEventListener("click", (e) => {
      // Agar cart page par jaane wale link par click kiya mobile par to drawer toggle karo
      e.preventDefault();
      if (cartSidebar.classList.contains("active")) {
        closeCartSidebar();
      } else {
        openCartSidebar();
      }
    });

    // Desktop Hover Open
    cartIcon.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        clearTimeout(cartHoverTimeout);
        openCartSidebar();
      }
    });

    // Desktop Hover Close Delay
    cartIcon.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        cartHoverTimeout = setTimeout(() => {
          closeCartSidebar();
        }, 300);
      }
    });

    // Keep Sidebar Open when hovered inside
    cartSidebar.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        clearTimeout(cartHoverTimeout);
      }
    });

    // Close when leaving sidebar
    cartSidebar.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        cartHoverTimeout = setTimeout(() => {
          closeCartSidebar();
        }, 300);
      }
    });
  }
});

// Service Features Component
function renderServiceFeatures() {
  const container = document.getElementById("service-features");
  if (!container) return;

  container.innerHTML = `
    <section class="features-section">
      <div class="features-container">
        <!-- Feature 1: High Quality -->
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M48.75 15H11.25C9.86929 15 8.75 16.1193 8.75 17.5V42.5C8.75 43.8807 9.86929 45 11.25 45H48.75C50.1307 45 51.25 43.8807 51.25 42.5V17.5C51.25 16.1193 50.1307 15 48.75 15Z" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.5 25L30 32.5L37.5 25" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="feature-text">
            <h4>High Quality</h4>
            <p>crafted from top materials</p>
          </div>
        </div>

        <!-- Feature 2: Warranty Protection -->
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M30 7.5L12.5 15V27.5C12.5 38.35 20 48.5 30 52.5C40 48.5 47.5 38.35 47.5 27.5V15L30 7.5Z" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22.5 28.75L27.5 33.75L37.5 23.75" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="feature-text">
            <h4>Warranty Protection</h4>
            <p>Over 2 years</p>
          </div>
        </div>

        <!-- Feature 3: Free Shipping -->
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M12.5 20L30 10L47.5 20V40L30 50L12.5 40V20Z" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 20L30 30L47.5 20" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M30 50V30" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="feature-text">
            <h4>Free Shipping</h4>
            <p>Order over 150 $</p>
          </div>
        </div>

        <!-- Feature 4: 24 / 7 Support -->
        <div class="feature-item">
          <div class="feature-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M15 32.5C15 24.2157 21.7157 17.5 30 17.5C38.2843 17.5 45 24.2157 45 32.5V42.5C45 43.8807 43.8807 45 42.5 45H37.5V32.5H45" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 32.5H22.5V45H17.5C16.1193 45 15 43.8807 15 42.5V32.5Z" stroke="#242424" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="feature-text">
            <h4>24 / 7 Support</h4>
            <p>Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Automatically render on DOM load
document.addEventListener("DOMContentLoaded", renderServiceFeatures);