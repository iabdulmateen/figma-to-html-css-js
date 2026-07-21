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