// Cart and Checkout Logic for About Page
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartList.innerHTML = '';
  let total = 0;
  if (!cart.length) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.textContent = '';
    checkoutBtn.style.display = 'none';
    return;
  }
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:100%;height:120px;object-fit:cover;border-radius:14px;">
      <div class="product-card-details">
        <div class="product-title">${item.name}</div>
        <div class="product-price">GH¢${item.price} x ${item.qty}</div>
        <div class="product-actions">
          <button class="remove-item" data-idx="${idx}">Remove</button>
        </div>
      </div>
    `;
    cartList.appendChild(div);
    total += item.price * item.qty;
  });
  cartTotal.textContent = `Total: GH¢${total}`;
  checkoutBtn.style.display = 'inline-block';
}

function addToCart(product, price, img) {
  const idx = cart.findIndex(i => i.product === product);
  if (idx > -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ product, price: Number(price), img, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    addToCart(btn.dataset.product, btn.dataset.price, btn.dataset.img);
  });
});

cartList.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-item')) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(Number(e.target.dataset.idx), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    // Update cart count in header
    if (window.updateCartCount) window.updateCartCount();
  }
});

checkoutBtn.addEventListener('click', () => {
  if (!cart.length) return;
  alert('Checkout successful! (Demo only)');
  cart.length = 0;
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});

renderCart();
