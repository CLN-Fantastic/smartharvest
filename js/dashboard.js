// Dashboard logic: authentication, product upload, and user product management using localStorage

// --- AUTHENTICATION ---
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  window.location.href = 'login.html';
  throw new Error('Not authenticated');
}

// --- PRODUCT UPLOAD & LISTING ---
const myProductsList = document.getElementById('my-products-list');
const uploadForm = document.getElementById('upload-produce-form');
const uploadSection = document.querySelector('.upload-produce');

// Only show upload form for farmers
if (loggedInUser.userType !== 'farmer') {
  uploadSection.style.display = 'none';
} else {
  uploadSection.style.display = '';
}

// Get all products for all users
function getAllProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Get products for this user
function getMyProducts() {
  const all = getAllProducts();
  return all.filter(p => p.owner === loggedInUser.email);
}

// Render user's products
function renderMyProducts() {
  myProductsList.innerHTML = '';
  const products = getMyProducts();
  if (!products.length) {
    myProductsList.innerHTML = '<p>No products uploaded yet.</p>';
    return;
  }
  products.forEach((prod, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="product-card-details">
        <div class="product-title">${prod.name}</div>
        <div class="product-price">GH¢${prod.price}</div>
      </div>
      <div class="product-actions">
        <button data-idx="${idx}" class="edit-product">Edit</button>
        <button data-idx="${idx}" class="delete-product">Delete</button>
      </div>
    `;
    myProductsList.appendChild(card);
  });
}

// Handle product upload (only for farmers)
if (loggedInUser.userType === 'farmer') {
  uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = uploadForm['produce-name'].value.trim();
    const price = uploadForm['produce-price'].value;
    const file = uploadForm['produce-image'].files[0];
    if (!file) return alert('Please select an image.');
    const reader = new FileReader();
    reader.onload = function(evt) {
      const image = evt.target.result;
      const all = getAllProducts();
      all.push({
        owner: loggedInUser.email,
        name,
        price,
        image
      });
      localStorage.setItem('products', JSON.stringify(all));
      renderMyProducts();
      uploadForm.reset();
    };
    reader.readAsDataURL(file);
  });
}

// Delete product
myProductsList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-product')) {
    const idx = Number(e.target.dataset.idx);
    const all = getAllProducts();
    const my = getMyProducts();
    const prod = my[idx];
    const newAll = all.filter(p => !(p.owner === prod.owner && p.name === prod.name && p.price === prod.price && p.image === prod.image));
    localStorage.setItem('products', JSON.stringify(newAll));
    renderMyProducts();
  }
});

// Edit product logic
myProductsList.addEventListener('click', function(e) {
  if (e.target.classList.contains('edit-product')) {
    const idx = Number(e.target.dataset.idx);
    const all = getAllProducts();
    const my = getMyProducts();
    const prod = my[idx];
    // Pre-fill the upload form with product details
    uploadForm['produce-name'].value = prod.name;
    uploadForm['produce-price'].value = prod.price;
    // For image, user must re-upload for security reasons
    uploadForm.scrollIntoView({ behavior: 'smooth' });
    // Remove the old product on next submit
    function handleEdit(ev) {
      ev.preventDefault();
      const name = uploadForm['produce-name'].value.trim();
      const price = uploadForm['produce-price'].value;
      const file = uploadForm['produce-image'].files[0];
      if (!file) return alert('Please select an image.');
      const reader = new FileReader();
      reader.onload = function(evt) {
        const image = evt.target.result;
        let all = getAllProducts();
        // Remove old product (match by owner, name, price, image)
        all = all.filter(p => !(p.owner === prod.owner && p.name === prod.name && p.price === prod.price && p.image === prod.image));
        // Add updated product
        all.push({
          owner: loggedInUser.email,
          name,
          price,
          image
        });
        localStorage.setItem('products', JSON.stringify(all));
        renderMyProducts();
        uploadForm.reset();
        uploadForm.removeEventListener('submit', handleEdit);
        uploadForm.addEventListener('submit', defaultUploadHandler);
      };
      reader.readAsDataURL(file);
    }
    uploadForm.removeEventListener('submit', defaultUploadHandler);
    uploadForm.addEventListener('submit', handleEdit);
  }
});
// Save default upload handler for reuse
const defaultUploadHandler = function(e) {
  e.preventDefault();
  const name = uploadForm['produce-name'].value.trim();
  const price = uploadForm['produce-price'].value;
  const file = uploadForm['produce-image'].files[0];
  if (!file) return alert('Please select an image.');
  const reader = new FileReader();
  reader.onload = function(evt) {
    const image = evt.target.result;
    let all = getAllProducts();
    // Prevent duplicate: check if product with same name, price, image, and owner exists
    const exists = all.some(p => p.owner === loggedInUser.email && p.name === name && p.price === price && p.image === image);
    if (!exists) {
      all.push({
        owner: loggedInUser.email,
        name,
        price,
        image
      });
      localStorage.setItem('products', JSON.stringify(all));
    }
    renderMyProducts();
    uploadForm.reset();
  };
  reader.readAsDataURL(file);
};
uploadForm.addEventListener('submit', defaultUploadHandler);

// --- LOGOUT ---
document.getElementById('logout-btn').onclick = function() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'login.html';
};

// Initial render
renderMyProducts();
