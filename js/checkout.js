// Checkout page logic for SmartHarvest GH
const checkoutSummary = document.getElementById('checkout-summary');
const checkoutForm = document.getElementById('checkout-form');
const checkoutSuccess = document.getElementById('checkout-success');

function renderCheckoutSummary() {
  // Get selected product and farmer info from localStorage
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
  const selectedFarmer = JSON.parse(localStorage.getItem('selectedFarmer'));
  let summaryHtml = '';
  if (selectedProduct) {
    summaryHtml += `<div class="product-card" style="margin-bottom:18px;">
      <img src="${selectedProduct.image}" alt="${selectedProduct.name}" style="width:100px;height:100px;object-fit:cover;border-radius:10px;">
      <div class="product-card-details">
        <div class="product-title">${selectedProduct.name}</div>
        <div class="product-price">GH¢${selectedProduct.price}</div>
        <div class="product-qty">Quantity: ${selectedProduct.quantity || 'N/A'}</div>
      </div>
    </div>`;
  }
  if (selectedFarmer) {
    summaryHtml += `<div class="farmer-info" style="background:#f7faf7;padding:1rem 1.2rem;border-radius:12px;margin-bottom:18px;box-shadow:0 2px 8px rgba(56,142,60,0.07);">
      <h3 style="color:var(--color-green);margin-bottom:0.7rem;">Farmer Information</h3>
      <div><strong>Name:</strong> ${selectedFarmer.name}</div>
      <div><strong>Email:</strong> ${selectedFarmer.email}</div>
      <div><strong>Phone:</strong> ${selectedFarmer.phone || 'N/A'}</div>
      <div><strong>Location:</strong> ${selectedFarmer.location || 'N/A'}</div>
    </div>`;
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) {
    checkoutSummary.innerHTML = '<p>Your cart is empty.</p>';
    checkoutForm.style.display = 'none';
    return;
  }
  let total = 0;
  checkoutSummary.innerHTML += cart.map(item => {
    total += item.price * item.qty;
    return `<div class="product-card" style="margin-bottom:10px;">
      <img src="${item.image}" alt="${item.name}" style="width:100px;height:100px;object-fit:cover;border-radius:10px;">
      <div class="product-card-details">
        <div class="product-title">${item.name}</div>
        <div class="product-price">GH¢${item.price} x ${item.qty}</div>
      </div>
    </div>`;
  }).join('');
  checkoutSummary.innerHTML += `<div style="font-weight:700;font-size:1.1rem;margin-top:10px;">Total: GH¢${total}</div>`;
}

checkoutForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Simulate order placement
  localStorage.removeItem('cart');
  checkoutForm.style.display = 'none';
  checkoutSummary.style.display = 'none';
  checkoutSuccess.style.display = 'block';
  checkoutSuccess.innerHTML = '<h2>Order Placed!</h2><p>Thank you for your purchase. Your order will be processed soon.</p>';
});

renderCheckoutSummary();
