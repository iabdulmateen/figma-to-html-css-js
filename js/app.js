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