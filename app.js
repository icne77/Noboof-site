const products = [
  {
    id: "coat-001",
    name: "Tailored Wool Coat",
    price: 89000
  },
  {
    id: "tee-002",
    name: "Signature Heavy Tee",
    price: 18000
  },
  {
    id: "hoodie-003",
    name: "Monogram Hoodie",
    price: 24000
  }
];

const cart = [];

const productGrid = document.getElementById("productGrid");
const cartToggle = document.getElementById("cartToggle");
const cartClose = document.getElementById("cartClose");
const cartDrawer = document.getElementById("cartDrawer");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");

function money(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-placeholder"></div>
      <h4>${product.name}</h4>
      <p>${money(product.price)}</p>
      <button data-add="${product.id}" type="button">Add to bag</button>
    </article>
  `).join("");

  productGrid.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => {
      const product = products.find(p => p.id === button.dataset.add);
      const existing = cart.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      renderCart();
      openCart();
    });
  });
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = count;
  cartSubtotal.textContent = money(subtotal);

  if (!cart.length) {
    cartItems.innerHTML = "<p>Your bag is empty.</p>";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-swatch"></div>
      <div>
        <h4>${item.name}</h4>
        <p>${money(item.price)}</p>
        <label>
          Qty
          <input type="number" min="1" value="${item.quantity}" data-qty="${item.id}">
        </label>
        <button class="remove-btn" data-remove="${item.id}" type="button">Remove</button>
      </div>
    </div>
  `).join("");

  cartItems.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => {
      const index = cart.findIndex(item => item.id === button.dataset.remove);
      if (index >= 0) cart.splice(index, 1);
      renderCart();
    });
  });

  cartItems.querySelectorAll("[data-qty]").forEach(input => {
    input.addEventListener("change", () => {
      const item = cart.find(i => i.id === input.dataset.qty);
      if (item) item.quantity = Math.max(1, Number(input.value || 1));
      renderCart();
    });
  });
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);

renderProducts();
renderCart();
