const shareIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 10.6667C11.4747 10.6667 11 10.8734 10.644 11.2047L5.94 8.46671C5.97333 8.31337 6 8.16004 6 8.00004C6 7.84004 5.97333 7.68671 5.94 7.53337L10.64 4.79337C11 5.12671 11.4733 5.33337 12 5.33337C13.1067 5.33337 14 4.44004 14 3.33337C14 2.22671 13.1067 1.33337 12 1.33337C10.8933 1.33337 10 2.22671 10 3.33337C10 3.49337 10.0267 3.64671 10.06 3.80004L5.36 6.54004C5 6.20671 4.52667 6.00004 4 6.00004C2.89333 6.00004 2 6.89337 2 8.00004C2 9.10671 2.89333 10 4 10C4.52667 10 5 9.79337 5.36 9.46004L10.0587 12.2054C10.0211 12.3563 10.0014 12.5112 10 12.6667C10 13.0623 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5145C11.6001 14.6658 12.0022 14.7054 12.3902 14.6283C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0569C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5359 13.44 11.2235 13.1111 11.0038C12.7822 10.784 12.3956 10.6667 12 10.6667Z" fill="white"/>
</svg>`;

const compareIcon = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.66 6L9.66 7L13.1 3.55L9.58 0L8.58 1L10.38 2.8H0.58V4.2H10.4L8.66 6ZM4.44 8L3.44 7L0 10.5L3.49 14L4.49 13L2.68 11.2H12.58V9.8H2.68L4.44 8Z" fill="white"/>
</svg>`;

const heartIcon = `<svg width="16" height="16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.16668 3.5C4.94551 3.5 2.33334 6.08533 2.33334 9.275C2.33334 11.8498 3.35418 17.9608 13.4027 24.1383C13.5827 24.2479 13.7893 24.3058 14 24.3058C14.2107 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6667 11.8498 25.6667 9.275C25.6667 6.08533 23.0545 3.5 19.8333 3.5C16.6122 3.5 14 7 14 7C14 7 11.3878 3.5 8.16668 3.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;




// Hero Section Data Object
const heroData = {
  subheading: "New Arrival",
  title: "Discover Our <br>New Collection",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
  buttonText: "BUY NOW",
  buttonLink: "#shop"
};

const renderHeroCard = () => {
  const cardContainer = document.getElementById("hero-card-target");
  if (!cardContainer) return;

  const { subheading, title, description, buttonText, buttonLink } = heroData;

  cardContainer.innerHTML = `
    <span class="hero-subheading">${subheading}</span>
    <h1 class="hero-title">${title}</h1>
    <p class="hero-description">${description}</p>
    <a href="${buttonLink}">
      <button class="hero-btn">${buttonText}</button>
    </a>
  `;
};

// DOM Load initialize
document.addEventListener("DOMContentLoaded", () => {
  renderHeroCard();
});
// Categories Data Array
const categoriesData = [
  {
    title: "Dining",
    image: "assets/images/dining.png"
  },
  {
    title: "Living",
    image: "assets/images/living.png"
  },
  {
    title: "Bedroom",
    image: "assets/images/bedroom.png"
  }
];

const renderCategories = () => {
  const gridContainer = document.getElementById("range-grid-target");
  if (!gridContainer) return;

  gridContainer.innerHTML = categoriesData.map(category => `
    <div class="range-card">
      <div class="range-img-wrapper">
        <img src="${category.image}" alt="${category.title}">
      </div>
      <h3 class="range-card-title">${category.title}</h3>
    </div>
  `).join("");
};

// Update DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderHeroCard === "function") renderHeroCard();
  renderCategories();
});
// Products Array Data
const productsData = [
  {
    id: 1,
    name: "Syltherine",
    desc: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
    badge: "-30%",
    badgeType: "discount",
    image: "assets/images/product-1.png"
  },
  {
    id: 2,
    name: "Leviosa",
    desc: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: null,
    badge: null,
    badgeType: null,
    image: "assets/images/product-2.png"
  },
  {
    id: 3,
    name: "Lolito",
    desc: "Luxury big sofa",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    badge: "-50%",
    badgeType: "discount",
    image: "assets/images/product-3.png"
  },
  {
    id: 4,
    name: "Respira",
    desc: "Outdoor bar table and stool",
    price: "Rp 500.000",
    oldPrice: null,
    badge: "New",
    badgeType: "new",
    image: "assets/images/product-4.png"
  },
  {
    id: 5,
    name: "Grifo",
    desc: "Night lamp",
    price: "Rp 1.500.000",
    oldPrice: null,
    badge: null,
    badgeType: null,
    image: "assets/images/product-5.png"
  },
  {
    id: 6,
    name: "Muggo",
    desc: "Small mug",
    price: "Rp 150.000",
    oldPrice: null,
    badge: "New",
    badgeType: "new",
    image: "assets/images/product-6.png"
  },
  {
    id: 7,
    name: "Pingky",
    desc: "Cute bed set",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    badge: "-50%",
    badgeType: "discount",
    image: "assets/images/product-7.png"
  },
  {
    id: 8,
    name: "Potty",
    desc: "Minimalist flower pot",
    price: "Rp 500.000",
    oldPrice: null,
    badge: "New",
    badgeType: "new",
    image: "assets/images/product-8.png"
  }
];

const renderProducts = () => {
  const productsContainer = document.getElementById("products-grid-target");
  if (!productsContainer) return;

  productsContainer.innerHTML = productsData.map(product => {
    // 1. Badge Check
    let badgeHTML = "";
    if (product.badge) {
      const badgeClass = product.badgeType === "discount" ? "badge-discount" : "badge-new";
      badgeHTML = `<span class="badge ${badgeClass}">${product.badge}</span>`;
    }

    // 2. Old Price Check
    const oldPriceHTML = product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : "";

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

        <!-- Hover Overlay with SVG Variables -->
        <div class="product-overlay">
          <button class="add-to-cart-btn">Add to cart</button>
          <div class="overlay-actions">
            <span class="action-link">${shareIcon} Share</span>
            <span class="action-link">${compareIcon} Compare</span>
            <span class="action-link">${heartIcon} Like</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
};

// DOM Load Event
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderHeroCard === "function") renderHeroCard();
  if (typeof renderCategories === "function") renderCategories();
  renderProducts();
});