// Global function for inline onclick in product.html & thumbnails
function changeMainImage(element) {
  const mainImage = document.getElementById("main-product-img") || document.querySelector(".main-image-box img");
  if (mainImage && element) {
    mainImage.src = typeof element === "string" ? element : element.src;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Size Selection
  const sizeBtns = document.querySelectorAll(".size-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      sizeBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 2. Color Selection
  const colorBtns = document.querySelectorAll(".color-btn, .color-dot");
  colorBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      colorBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 3. Thumbnails Click -> Change Main Image
  const thumbnails = document.querySelectorAll(".thumb-box img, .thumbnail-img, .thumb-img");
  const mainImage = document.getElementById("main-product-img") || document.querySelector(".main-image-box img");

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", function() {
        mainImage.src = this.src;
      });
    });
  }

  // 4. Quantity Counter (+ / -) Logic
  const qtyInput = document.getElementById("qty-input") || document.querySelector(".quantity-counter input");
  const qtyButtons = document.querySelectorAll(".quantity-counter button");

  if (qtyInput && qtyButtons.length >= 2) {
    const minusBtn = qtyButtons[0];
    const plusBtn = qtyButtons[1];

    minusBtn.addEventListener("click", () => {
      let currentQty = parseInt(qtyInput.value) || 1;
      if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
      }
    });

    plusBtn.addEventListener("click", () => {
      let currentQty = parseInt(qtyInput.value) || 1;
      qtyInput.value = currentQty + 1;
    });
  }

  // 5. Add to Cart Button Click Handler
  const addToCartBtn = document.querySelector(".add-to-cart-btn") || document.querySelector(".product-actions .btn-outline");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const selectedQty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

      if (typeof addToCart === "function") {
        addToCart(999, selectedQty);
      }
    });
  }
});