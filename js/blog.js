// ==========================================================
// BLOG PAGE LOGIC (js/blog.js)
// ==========================================================

{
  // Renamed variables & scoped block to prevent conflict with data.js
  const blogList = [
    {
      id: 1,
      title: "Going all-in with millennial design",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      image: "./assets/images/blog-1.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices.",
    },
    {
      id: 2,
      title: "Exploring new ways of decorating",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Handmade",
      image: "./assets/images/blog-2.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices.",
    },
    {
      id: 3,
      title: "Handmade pieces that took time to make",
      author: "Admin",
      date: "14 Oct 2022",
      category: "Wood",
      image: "./assets/images/blog-3.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices.",
    },
  ];

  const blogCategories = [
    { name: "Crafts", count: 2 },
    { name: "Design", count: 8 },
    { name: "Handmade", count: 7 },
    { name: "Interior", count: 1 },
    { name: "Wood", count: 6 },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Posts
    const postsContainer = document.getElementById("blog-posts-container");
    if (postsContainer) {
      postsContainer.innerHTML = blogList
        .map(
          (post) => `
        <article class="blog-post-card">
          <div class="blog-post-img">
            <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/800x400?text=Blog+Image'" />
          </div>
          <div class="blog-meta">
            <span class="blog-meta-item">👤 ${post.author}</span>
            <span class="blog-meta-item">📅 ${post.date}</span>
            <span class="blog-meta-item">🏷️ ${post.category}</span>
          </div>
          <h2 class="blog-post-title">${post.title}</h2>
          <p class="blog-post-excerpt">${post.excerpt}</p>
          <a href="#" class="read-more-btn">Read more</a>
        </article>
      `
        )
        .join("");
    }

    // 2. Render Categories
    const catContainer = document.getElementById("blog-categories-list");
    if (catContainer) {
      catContainer.innerHTML = blogCategories
        .map(
          (cat) => `
        <li>
          <span>${cat.name}</span>
          <span>${cat.count}</span>
        </li>
      `
        )
        .join("");
    }

    // 3. Render Recent Posts
    const recentContainer = document.getElementById("recent-posts-container");
    if (recentContainer) {
      recentContainer.innerHTML = blogList
        .slice(0, 5)
        .map(
          (post) => `
        <div class="recent-post-item">
          <img src="${post.image}" alt="${post.title}" class="recent-post-thumb" onerror="this.src='https://via.placeholder.com/80x80?text=Thumb'" />
          <div class="recent-post-info">
            <h4>${post.title}</h4>
            <span>${post.date}</span>
          </div>
        </div>
      `
        )
        .join("");
    }
  });
}