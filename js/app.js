// 1. Render Hero Card
const renderHeroCard = () => {
  const cardContainer = document.getElementById("hero-card-target");
  if (!cardContainer || typeof heroData === "undefined") return;

  const { subheading, title, description, buttonText, buttonLink } = heroData;

  cardContainer.innerHTML = `
    <span class="hero-subheading">${subheading}</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-description">${description}</p>
    <a href="${buttonLink}" class="hero-btn">${buttonText}</a>
  `;
};

// 2. Render Categories Range
const renderCategories = () => {
  const gridContainer = document.getElementById("range-grid-target");
  if (!gridContainer || typeof categoriesData === "undefined") return;

  gridContainer.innerHTML = categoriesData
    .map(
      (category) => `
    <div class="range-card">
      <div class="range-img-wrapper">
        <img src="${category.image}" alt="${category.title}">
      </div>
      <h3 class="range-card-title">${category.title}</h3>
    </div>
  `
    )
    .join("");
};

// 3. Render Products
const renderProducts = () => {
  const productsContainer = document.getElementById("products-grid-target");
  if (!productsContainer || typeof productsData === "undefined") return;

  // Safe fallback for icons if defined in data.js
  const sIcon = typeof shareIcon !== "undefined" ? shareIcon : "";
  const cIcon = typeof compareIcon !== "undefined" ? compareIcon : "";
  const hIcon = typeof heartIcon !== "undefined" ? heartIcon : "";

  productsContainer.innerHTML = productsData
    .map((product) => {
      let badgeHTML = "";
      if (product.badge) {
        const badgeClass =
          product.badgeType === "discount" ? "badge-discount" : "badge-new";
        badgeHTML = `<span class="badge ${badgeClass}">${product.badge}</span>`;
      }

      const oldPriceHTML = product.oldPrice
        ? `<span class="old-price">${product.oldPrice}</span>`
        : "";

      return `
      <div class="product-card">
        <div class="product-img-box">
          ${badgeHTML}
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.desc}</p>
          <div class="product-price-box">
            <span class="current-price">${product.price}</span>
            ${oldPriceHTML}
          </div>
        </div>
<div class="product-overlay">
  <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to cart</button>
  <div class="overlay-actions">
    <span class="action-link">${sIcon} Share</span>
    <span class="action-link" onclick="event.stopPropagation(); addToCompare(${product.id})">${cIcon} Compare</span>
    <span class="action-link">${hIcon} Like</span>
  </div>
</div>
      </div>
    `;
    })
    .join("");
};

// 4. Rooms Slider Logic
const initRoomsSlider = () => {
  const nextBtn = document.querySelector(".slider-next-arrow");
  const slider = document.querySelector(".rooms-slider");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const cards = document.querySelectorAll(".room-card");

  if (!slider || cards.length === 0) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  const updateSlider = (index) => {
    currentIndex = index;
    const cardWidth = 372;
    const gap = 24;
    const moveAmount = (cardWidth + gap) * currentIndex;
    slider.style.transform = `translateX(-${moveAmount}px)`;

    cards.forEach((card, i) => {
      card.classList.toggle("room-card-active", i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextIndex = (currentIndex + 1) % totalCards;
      updateSlider(nextIndex);
    });
  }

  cards.forEach((card, index) => {
    card.addEventListener("click", () => updateSlider(index));
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateSlider(index));
  });
};

// --- SINGLE DOM LOAD INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderHeroCard();
  renderCategories();
  renderProducts();
  initRoomsSlider();
});