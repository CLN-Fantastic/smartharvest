// Checkout page logic for SmartHarvest GH
const checkoutSummary = document.getElementById('checkout-summary');
const checkoutForm = document.getElementById('checkout-form');
const checkoutSuccess = document.getElementById('checkout-success');

function calculateTotal(cart) {
  // Simulate API call for price calculation
  return new Promise(resolve => {
    setTimeout(() => {
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.qty;
      });
      resolve(total);
    }, 300); // Simulate network delay
  });
}

function renderCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) {
    checkoutSummary.innerHTML = '<p>Your cart is empty.</p>';
    checkoutForm.style.display = 'none';
    return;
  }
  let summaryHtml = '<h2>Selected Items</h2>';
  let manualTotal = 0;
  cart.forEach((item, idx) => {
    manualTotal += item.price * item.qty;
    summaryHtml += `<div class="product-card" style="margin-bottom:12px;display:flex;align-items:center;gap:12px;min-height:60px;">
      <img src="${item.img || item.image}" alt="${item.product || item.name}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;">
      <div style="flex:1;text-align:left;">
        <div class="product-title" style="font-size:1rem;">${item.product || item.name}</div>
        <div class="product-price" style="font-size:0.95rem;">GH¢${item.price} x <input type='number' min='1' value='${item.qty}' data-idx='${idx}' class='checkout-qty-input' style='width:50px;padding:2px 6px;border-radius:6px;border:1px solid #ccc;'> </div>
      </div>
    </div>`;
  });
  summaryHtml += `<div id='manual-total' style="font-weight:700;font-size:1.2rem;margin-top:1rem;">Total Amount: GH¢${manualTotal}</div>`;
  checkoutSummary.innerHTML = summaryHtml;
  // Add event listeners for quantity inputs
  document.querySelectorAll('.checkout-qty-input').forEach(input => {
    input.addEventListener('input', function() {
      const idx = Number(this.dataset.idx);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let newQty = Math.max(1, Number(this.value));
      cart[idx].qty = newQty;
      localStorage.setItem('cart', JSON.stringify(cart));
      // Manually update total without re-rendering everything
      let manualTotal = 0;
      cart.forEach(item => {
        manualTotal += item.price * item.qty;
      });
      document.getElementById('manual-total').textContent = `Total Amount: GH¢${manualTotal}`;
    });
  });
}

checkoutForm.addEventListener('submit', function(e) {
  e.preventDefault();
  localStorage.removeItem('cart');
  checkoutForm.style.display = 'none';
  checkoutSummary.style.display = 'none';
  checkoutSuccess.style.display = 'block';
  checkoutSuccess.innerHTML = '<h2>Order Placed!</h2><p>Thank you for your purchase. Your order will be processed soon.</p>';
});

renderCheckoutSummary();
