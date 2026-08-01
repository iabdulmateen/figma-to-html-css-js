// ==========================================
// Shop Page Logic (Connected with data.js)
// ==========================================

function renderShopProducts() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  container.innerHTML = "";

  // data.js se productsData le rahe hain
  const itemsToRender = typeof productsData !== "undefined" ? productsData : [];

  itemsToRender.forEach((product) => {
    // Badge Logic (Discount ya New)
    let badgeHTML = "";
    if (product.badge && product.badgeType === "discount") {
      badgeHTML = `<span class="badge badge-discount">${product.badge}</span>`;
    } else if (product.badge && product.badgeType === "new") {
      badgeHTML = `<span class="badge badge-new">${product.badge}</span>`;
    }

    // Old Price Logic
    let oldPriceHTML = product.oldPrice
      ? `<span class="old-price">${product.oldPrice}</span>`
      : "";

    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // data.js ke icons aur data render kar rahe hain
    productCard.innerHTML = `
  <div class="product-img-box">
    <a href="product.html">
      <img src="${product.image}" alt="${product.name}">
    </a>
    ${badgeHTML}
  </div>
  <div class="product-info">
    <h3 class="product-name">
      <a href="product.html" style="text-decoration: none; color: inherit;">${product.name}</a>
    </h3>
    <p class="product-desc">${product.desc}</p>
    <div class="product-price-box">
      <span class="current-price">${product.price}</span>
      ${oldPriceHTML}
    </div>
  </div>
  <div class="product-overlay">
    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to cart</button>
    <div class="overlay-actions">
      <a class="action-link">${typeof shareIcon !== 'undefined' ? shareIcon : ''} Share</a>
      <a class="action-link">${typeof compareIcon !== 'undefined' ? compareIcon : ''} Compare</a>
      <a class="action-link">${typeof heartIcon !== 'undefined' ? heartIcon : ''} Like</a>
    </div>
  </div>
`;

    container.appendChild(productCard);
  });
}

// Add to Cart Functionality
function addToCart(productId) {
  if (typeof productsData !== "undefined") {
    const item = productsData.find((p) => p.id === productId);
    if (item) {
      alert(`${item.name} cart me add ho gaya hai!`);
    }
  }
}

// Page load hone par render karein
document.addEventListener("DOMContentLoaded", () => {
  renderShopProducts();
});