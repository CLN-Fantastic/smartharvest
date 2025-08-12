// Fetch and display all products uploaded by farmers from localStorage
const PRODUCTS_PER_PAGE = 12;
let currentPage = 1;
let filteredProducts = [];

// Add this mapping at the top level if not present
const CROP_IMAGES = {
  'Tomato': 'Farm products/8 Tactics To Grow Tomatoes.jpeg',
  'Maize': 'Farm products/15 Best Fertilizers for Maize Farm [Organic & Inorganic].jpeg',
  'Cassava': 'Farm products/cassava.jpeg',
  'Carrot': 'Farm products/Carrort farm.jpeg',
  'Cabbage': 'Farm products/cabbage.jpeg',
  'Banana': 'Farm products/Banana.jfif',
  'Coconut': 'Farm products/Coconut farm.jpeg',
  'Cocoa': 'Farm products/Cocoa Farm.jpeg',
  'Cocoyam': 'Farm products/cocoyam.jfif',
  'Eggs': 'Farm products/Creats Eggs.jfif',
  // ...add more as needed...
};

function renderAllProducts() {
  const productsContainer = document.getElementById('products-list');
  const noResultsMsg = document.getElementById('no-results-message');
  if (!productsContainer) return;
  productsContainer.innerHTML = '';
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Search/filter/sort logic
  const searchVal = (document.getElementById('search-input')?.value || '').toLowerCase();
  const typeVal = document.getElementById('filter-type')?.value || '';
  const regionVal = document.getElementById('filter-region')?.value || '';
  const sortVal = document.getElementById('sort-products')?.value || 'newest';

  filteredProducts = products.filter(prod => {
    let match = true;
    if (searchVal && !prod.name.toLowerCase().includes(searchVal)) match = false;
    if (typeVal && prod.type !== typeVal) match = false;
    if (regionVal && prod.region !== regionVal) match = false;
    return match;
  });

  // Sort
  if (sortVal === 'low') filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortVal === 'high') filteredProducts.sort((a, b) => b.price - a.price);
  else filteredProducts = filteredProducts.reverse(); // Newest

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const pageProducts = filteredProducts.slice(startIdx, endIdx);

  if (!pageProducts.length) {
    productsContainer.innerHTML = '';
    if (noResultsMsg) noResultsMsg.style.display = 'block';
    document.getElementById('page-info').textContent = '';
    document.getElementById('prev-page').disabled = true;
    document.getElementById('next-page').disabled = true;
    return;
  } else {
    if (noResultsMsg) noResultsMsg.style.display = 'none';
  }

  // If no results and a search term, show a card for the searched crop
  if (!filteredProducts.length && searchVal) {
    if (noResultsMsg) noResultsMsg.style.display = 'none';
    // Capitalize first letter for display
    const cropName = searchVal.charAt(0).toUpperCase() + searchVal.slice(1);
    const imgSrc = CROP_IMAGES[cropName] || 'Farm products/a1.jpg';
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${imgSrc}" alt="${cropName}" class="product-image" style="width:100%;max-width:220px;height:180px;object-fit:cover;border-radius:14px;">
      <div class="product-info">
        <h3 class="product-name">${cropName}</h3>
        <p class="product-price" style="color:#aaa;">Not available</p>
        <p class="product-quantity">This product is not currently in the marketplace.</p>
        <button class="contact-farmer-btn" disabled style="background:#ccc;cursor:not-allowed;">Unavailable</button>
      </div>
    `;
    productsContainer.appendChild(card);
    document.getElementById('page-info').textContent = 'No results';
    document.getElementById('prev-page').disabled = true;
    return;
  }

  // If searching, show only image, name, price. Otherwise, show all info.
  const isSearching = !!searchVal;
  pageProducts.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `<img src="${prod.image}" alt="${prod.name}" style="width:100%;max-width:220px;height:180px;object-fit:cover;border-radius:14px;">
      <div class="product-card-details">
        <div class="product-title">${prod.name}</div>
        <div class="product-price">GH¢${prod.price}</div>
        <div class="product-qty">Available: ${prod.quantity || 'N/A'}</div>
        <div class="product-location">Location: ${prod.region || 'N/A'}</div>
        <button class="contact-farmer-btn">Contact Farmer</button>
      </div>`;
    card.querySelector('.contact-farmer-btn').onclick = function() {
      // Save selected product and farmer info to localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      // Try to match farmer by product owner (if available) or by product name
      let farmer = null;
      if (prod.owner) {
        farmer = users.find(u => u.userType === 'farmer' && (u.email === prod.owner || u.name === prod.owner));
      }
      localStorage.setItem('selectedProduct', JSON.stringify(prod));
      if (farmer) {
        localStorage.setItem('selectedFarmer', JSON.stringify(farmer));
      } else {
        localStorage.removeItem('selectedFarmer');
      }
      window.location.href = 'checkout.html';
    };
    productsContainer.appendChild(card);
  });

  // Pagination controls
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
}

// List of all possible crops (customize as needed)
const ALL_CROPS = [
  'Tomato', 'Maize', 'Cassava', 'Cabbage', 'Carrot', 'Cocoyam', 'Cocoa', 'Coconut', 'Banana', 'Eggs', 'Pepper', 'Onion', 'Garlic', 'Yam', 'Plantain', 'Rice', 'Beans', 'Groundnut', 'Okra', 'Garden Eggs', 'Lettuce', 'Spinach', 'Sweet Potato', 'Watermelon', 'Pineapple', 'Orange', 'Mango', 'Avocado', 'Palm Oil', 'Fertilizer', 'Chicken', 'Goat', 'Sheep', 'Fish', 'Snail', 'Turkey', 'Duck', 'Guinea Corn', 'Millet', 'Sorghum', 'Soybean', 'Wheat', 'Sugarcane', 'Melon', 'Ginger', 'Turmeric', 'Cucumber', 'Celery', 'Broccoli', 'Cauliflower', 'Apple', 'Grapes', 'Pear', 'Peas', 'Barley', 'Sesame', 'Sunflower', 'Cashew', 'Coffee', 'Tea', 'Cotton', 'Rubber', 'Tobacco', 'Other'
];

function updateMissingCropsDropdown() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const foundCrops = new Set(products.map(p => (p.name || '').toLowerCase()));
  const missingCrops = ALL_CROPS.filter(crop => !foundCrops.has(crop.toLowerCase()));
  const select = document.getElementById('missing-crops');
  if (!select) return;
  // Remove old options except the first
  while (select.options.length > 1) select.remove(1);
  missingCrops.forEach(crop => {
    const opt = document.createElement('option');
    opt.value = crop;
    opt.textContent = crop;
    select.appendChild(opt);
  });
}

document.addEventListener('DOMContentLoaded', updateMissingCropsDropdown);
// Also update after product list changes
const origRenderAllProducts = renderAllProducts;
renderAllProducts = function() {
  origRenderAllProducts.apply(this, arguments);
  updateMissingCropsDropdown();
};

// Event listeners
if (document.getElementById('search-btn')) {
  document.getElementById('search-btn').onclick = function() {
    currentPage = 1;
    renderAllProducts();
  };
}
if (document.getElementById('search-input')) {
  document.getElementById('search-input').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      currentPage = 1;
      renderAllProducts();
    }
  });
}
['filter-type', 'filter-region', 'sort-products'].forEach(id => {
  if (document.getElementById(id)) {
    document.getElementById(id).onchange = function() {
      currentPage = 1;
      renderAllProducts();
    };
  }
});
if (document.getElementById('prev-page')) {
  document.getElementById('prev-page').onclick = function() {
    if (currentPage > 1) {
      currentPage--;
      renderAllProducts();
    }
  };
}
if (document.getElementById('next-page')) {
  document.getElementById('next-page').onclick = function() {
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
    if (currentPage < totalPages) {
      currentPage++;
      renderAllProducts();
    }
  };
}

renderAllProducts();