// Default mock specs agar data.js me full details na hon
const defaultSpecs = {
  salesPackage: "1 Sectional Sofa",
  modelNumber: "TFCBLUORBL6SRHS",
  secondaryMaterial: "Solid Wood",
  configuration: "L-shaped",
  upholsteryMaterial: "Fabric + Cotton",
  upholsteryColor: "Bright Grey & Lion",
  fillingMaterial: "Foam",
  finishType: "Bright Grey & Lion",
  adjustableHeadrest: "No",
  maxLoad: "200 KG",
  origin: "India",
  width: "265.32 cm",
  height: "76 cm",
  depth: "167.76 cm",
  weight: "45 KG",
  warrantySummary: "1 Year Manufacturing Warranty",
  warrantyService: "For Warranty Claims Please Email at support@xyz.com",
  coveredInWarranty: "Warranty Against Manufacturing Defect",
  domesticWarranty: "1 Year"
};
function addToCompare(productId) {
  // 1. LocalStorage se compare list lein (agar na ho to empty array)
  let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

  // 2. Agar product pehle se list me nahi hai to add karein
  if (!compareList.includes(productId)) {
    if (compareList.length >= 4) {
      alert("Aap aik waqt me max 4 products compare kar sakte hain!");
      return;
    }
    compareList.push(productId);
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }

  // 3. Directly Comparison Page par redirect ho jayein
  window.location.href = "comparison.html";
}
// Compare Items get karein
function getCompareList() {
  const compare = localStorage.getItem("furniro_compare");
  if (compare) return JSON.parse(compare);

  // Fallback: Agar compare empty ho to pehle 2 default products dikhade
  if (typeof productsData !== "undefined" && productsData.length >= 2) {
    return [productsData[0], productsData[1]];
  }
  return [];
}

// Compare List Save karein
function saveCompareList(list) {
  localStorage.setItem("furniro_compare", JSON.stringify(list));
}

// Main Render Function
function renderComparisonPage() {
  const tableContainer = document.getElementById("comparison-table");
  if (!tableContainer) return;

  const compareList = getCompareList();

  // Dropdown options ready karein (Unselected products)
  let dropdownOptionsHtml = `<option value="">Choose a Product</option>`;
  if (typeof productsData !== "undefined") {
    productsData.forEach((prod) => {
      const isAlreadyInCompare = compareList.some((item) => item.id === prod.id);
      if (!isAlreadyInCompare) {
        dropdownOptionsHtml += `<option value="${prod.id}">${prod.name}</option>`;
      }
    });
  }

  // 1. TOP HEADER ROW (Title + Product Cards + Add Product Dropdown)
  let html = `
    <div class="comp-row comp-header-row">
      <div class="comp-cell comp-title-cell">
        <h3>Go to Product page for more Products</h3>
        <a href="product.html" class="link-view-more">View More</a>
      </div>
  `;

  // Render Product Cards
  compareList.forEach((product) => {
    html += `
      <div class="comp-cell comp-product-card">
        <button class="remove-comp-btn" onclick="removeFromCompare(${product.id})" title="Remove Product">✕</button>
        <div class="comp-img-box">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <h4>${product.name}</h4>
        <p class="comp-price">${typeof product.price === 'number' ? 'Rs. ' + product.price.toLocaleString() + '.00' : product.price}</p>
        <div class="comp-rating">
          <span>4.7 ★★★★★</span>
          <span class="review-text">204 Review</span>
        </div>
      </div>
    `;
  });

  // If items < 3 show "Add A Product" Card
  if (compareList.length < 3) {
    html += `
      <div class="comp-cell comp-add-card">
        <h4>Add A Product</h4>
        <div class="custom-select-wrapper">
          <select id="add-product-select" onchange="handleAddProductSelect(this.value)">
            ${dropdownOptionsHtml}
          </select>
        </div>
      </div>
    `;
  }

  html += `</div>`; // End Header Row

  // 2. SPECIFICATIONS ROWS GENERATOR FUNCTION
  const renderSpecSection = (sectionTitle, fields) => {
    let sectionHtml = `
      <div class="comp-section-title">${sectionTitle}</div>
    `;

    fields.forEach((field) => {
      sectionHtml += `
        <div class="comp-row">
          <div class="comp-cell comp-label">${field.label}</div>
      `;

      compareList.forEach((prod) => {
        const value = prod[field.key] || defaultSpecs[field.key] || "-";
        sectionHtml += `<div class="comp-cell comp-val">${value}</div>`;
      });

      // Fill empty column if add product slot is active
      if (compareList.length < 3) {
        sectionHtml += `<div class="comp-cell comp-val"></div>`;
      }

      sectionHtml += `</div>`;
    });

    return sectionHtml;
  };

  // General Specs
  html += renderSpecSection("General", [
    { label: "Sales Package", key: "salesPackage" },
    { label: "Model Number", key: "modelNumber" },
    { label: "Secondary Material", key: "secondaryMaterial" },
    { label: "Configuration", key: "configuration" },
    { label: "Upholstery Material", key: "upholsteryMaterial" },
    { label: "Upholstery Color", key: "upholsteryColor" }
  ]);

  // Product Specs
  html += renderSpecSection("Product", [
    { label: "Filling Material", key: "fillingMaterial" },
    { label: "Finish Type", key: "finishType" },
    { label: "Adjustable Headrest", key: "adjustableHeadrest" },
    { label: "Maximum Load Capacity", key: "maxLoad" },
    { label: "Origin of Manufacture", key: "origin" }
  ]);

  // Dimensions
  html += renderSpecSection("Dimensions", [
    { label: "Width", key: "width" },
    { label: "Height", key: "height" },
    { label: "Depth", key: "depth" },
    { label: "Weight", key: "weight" }
  ]);

  // Warranty & Action Buttons
  html += renderSpecSection("Warranty", [
    { label: "Warranty Summary", key: "warrantySummary" },
    { label: "Warranty Service Type", key: "warrantyService" },
    { label: "Covered in Warranty", key: "coveredInWarranty" },
    { label: "Domestic Warranty", key: "domesticWarranty" }
  ]);

  // Add To Cart Row at bottom
  html += `<div class="comp-row comp-actions-row"><div class="comp-cell"></div>`;
  compareList.forEach((prod) => {
    html += `
      <div class="comp-cell">
        <button class="btn-primary-gold" onclick="addToCart(${prod.id})">Add To Cart</button>
      </div>
    `;
  });
  if (compareList.length < 3) html += `<div class="comp-cell"></div>`;
  html += `</div>`;

  tableContainer.innerHTML = html;
}

// Handle Add Product Dropdown
function handleAddProductSelect(productId) {
  if (!productId) return;
  const prodToAdd = productsData.find((p) => p.id === Number(productId));
  if (prodToAdd) {
    let list = getCompareList();
    list.push(prodToAdd);
    saveCompareList(list);
    renderComparisonPage();
  }
}

// Remove item from comparison
function removeFromCompare(productId) {
  let list = getCompareList();
  list = list.filter((item) => item.id !== productId);
  saveCompareList(list);
  renderComparisonPage();
}

// DOM Init
document.addEventListener("DOMContentLoaded", () => {
  renderComparisonPage();
});