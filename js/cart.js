/* AUREVIA — cart + wishlist (localStorage only, no backend) */

const CART_KEY = "aurevia_cart";
const WISH_KEY = "aurevia_wishlist";
const SHIPPING_THRESHOLD = 60;
const SHIPPING_FLAT = 5;

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function lineKey(id, color, size) {
  return [id, color || "", size || ""].join("::");
}

function addToCart(id, qty, color, size) {
  const cart = getCart();
  const key = lineKey(id, color, size);
  const existing = cart.find((l) => lineKey(l.id, l.color, l.size) === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty, color: color || null, size: size || null });
  }
  saveCart(cart);
  renderCartDrawer();
  showToast("Added to bag");
  openCartDrawer();
}

function removeFromCart(id, color, size) {
  const key = lineKey(id, color, size);
  const cart = getCart().filter((l) => lineKey(l.id, l.color, l.size) !== key);
  saveCart(cart);
}

function setLineQty(id, color, size, qty) {
  const cart = getCart();
  const key = lineKey(id, color, size);
  const line = cart.find((l) => lineKey(l.id, l.color, l.size) === key);
  if (!line) return;
  line.qty = Math.max(1, Math.min(10, qty));
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartLinesWithData() {
  return getCart()
    .map((l) => {
      const product = getProduct(l.id);
      if (!product) return null;
      return { ...l, product };
    })
    .filter(Boolean);
}

function cartSubtotal() {
  return cartLinesWithData().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
}

/* ---------------- wishlist ---------------- */
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
  } else {
    list.push(id);
  }
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  return list.includes(id);
}

/* ---------------- cart drawer ---------------- */
function renderCartDrawer() {
  const body = document.getElementById("cartDrawerBody");
  const foot = document.getElementById("cartDrawerFoot");
  if (!body) return;
  const lines = cartLinesWithData();

  if (lines.length === 0) {
    body.innerHTML = `<div class="cart-drawer-empty">
      <p>Your bag is empty.</p>
      <a href="shop.html" class="btn btn-primary btn-sm">Start Shopping</a>
    </div>`;
    if (foot) foot.style.display = "none";
    return;
  }

  if (foot) foot.style.display = "block";

  body.innerHTML = lines
    .map((l) => {
      const meta = [l.color, l.size ? "Size " + l.size : null].filter(Boolean).join(" · ");
      return `
      <div class="cart-line">
        <div class="cart-line-media ${mediaClass(l.product)}">${mediaHTML(l.product)}</div>
        <div class="cart-line-info">
          <div class="cart-line-title">${l.product.name}</div>
          ${meta ? `<div class="cart-line-meta">${meta}</div>` : ""}
          <div class="cart-line-foot">
            <div class="qty-pill">
              <button type="button" onclick="setLineQty('${l.id}','${l.color || ""}','${l.size || ""}', ${l.qty - 1}); renderCartDrawer();">&minus;</button>
              <input type="text" readonly value="${l.qty}">
              <button type="button" onclick="setLineQty('${l.id}','${l.color || ""}','${l.size || ""}', ${l.qty + 1}); renderCartDrawer();">+</button>
            </div>
            <span class="cart-line-price">${formatPrice(l.product.price * l.qty)}</span>
          </div>
        </div>
      </div>
      <button class="cart-line-remove" style="margin:-8px 0 4px 88px" onclick="removeFromCart('${l.id}','${l.color || ""}','${l.size || ""}'); renderCartDrawer();">Remove</button>
      `;
    })
    .join("");

  const subtotalEl = document.getElementById("cartDrawerSubtotal");
  if (subtotalEl) subtotalEl.textContent = formatPrice(cartSubtotal());
}

function openCartDrawer() {
  document.getElementById("cartDrawer")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
  renderCartDrawer();
}
function closeCartDrawer() {
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

/* ---------------- toast ---------------- */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
