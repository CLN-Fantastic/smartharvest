// index.js for AgroConnect homepage
// Dynamically inject sample featured products
const featuredProducts = [
  {
    image: 'Farm products/Tomatoes.jpeg',
    name: 'Tomatoes',
    price: '₦2,000',
    quantity: '50kg',
  },
  {
    image: 'Farm products/Elizabeths Studio~Food Festival~Corn on the Cob~Yellow~Cotton Fabric by the Yard or Select Length 435E-YLW.jpeg',
    name: 'Corn on the Cob',
    price: '₦1,800',
    quantity: '100kg',
  },
  {
    image: 'Farm products/Fertilizer Labels_ What N-P-K Numbers Mean.jpeg',
    name: 'Fertilizer',
    price: '₦5,500',
    quantity: '30 bags',
  },
  {
    image: 'Farm products/download (5).jpeg',
    name: 'Fresh Produce',
    price: '₦3,000',
    quantity: '20kg',
  },
];

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <p class="product-quantity">Quantity: ${product.quantity}</p>
        <button class="contact-farmer-btn">Contact Farmer</button>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('featured-products');
  if (container) {
    container.innerHTML = featuredProducts.map(createProductCard).join('');
  }
});

// Fetch and display featured products from localStorage (uploaded by farmers)
function renderFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  if (!featuredContainer) return;
  featuredContainer.innerHTML = '';
  const products = JSON.parse(localStorage.getItem('products')) || [];
  if (!products.length) {
    featuredContainer.innerHTML = '<p>No featured products yet.</p>';
    return;
  }
  products.slice(-6).reverse().forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}" style="width:100%;height:180px;object-fit:cover;border-radius:14px;">
      <div class="product-card-details">
        <div class="product-title">${prod.name}</div>
        <div class="product-price">GH¢${prod.price}</div>
      </div>
    `;
    featuredContainer.appendChild(card);
  });
}
renderFeaturedProducts();
