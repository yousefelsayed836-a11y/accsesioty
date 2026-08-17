/* AUREVIA — shared site behavior: header, drawer, product rendering, page logic */

/* ---------------- page loader ---------------- */
(function () {
  const loader = document.getElementById("pageLoader");
  if (!loader) return;
  const hide = () => loader.classList.add("is-hidden");
  window.addEventListener("load", hide);
  setTimeout(hide, 6000);
})();

/* ---------------- hero spotlight reveal ---------------- */
function initHeroReveal() {
  const media = document.querySelector(".hero-media");
  if (!media) return;

  const isMobile = () => window.innerWidth <= 900;

  if (!isMobile()) {
    const setPos = (clientX, clientY) => {
      const rect = media.getBoundingClientRect();
      const px = ((clientX - rect.left) / rect.width) * 100;
      const py = ((clientY - rect.top) / rect.height) * 100;
      media.style.setProperty("--mx", px + "%");
      media.style.setProperty("--my", py + "%");
    };
    media.addEventListener("mousemove", (e) => {
      if (isMobile()) return;
      setPos(e.clientX, e.clientY);
      media.style.setProperty("--mr", "220px");
      media.style.setProperty("--mo", "1");
    });
    media.addEventListener("mouseleave", () => {
      media.style.setProperty("--mr", "0px");
      media.style.setProperty("--mo", "0");
    });
  }

  window.addEventListener("scroll", () => {
    if (!isMobile()) return;
    const rect = media.getBoundingClientRect();
    const progress = 1 - (rect.bottom / (rect.height + window.innerHeight));
    media.classList.toggle("hero-scrolled", progress > 0.25);
  }, { passive: true });
}

/* ---------------- testimonial slider ---------------- */
function initTestiSlider() {
  const track = document.getElementById("testiTrack");
  const nextBtn = document.getElementById("testiNext");
  if (!track || !nextBtn) return;
  const cards = Array.from(track.querySelectorAll(".testi-card"));
  if (cards.length < 2) return;
  let index = cards.findIndex((c) => c.classList.contains("active"));
  if (index < 0) index = 0;
  let timer;

  const goTo = (i) => {
    cards[index].classList.remove("active");
    index = (i + cards.length) % cards.length;
    cards[index].classList.add("active");
  };
  const next = () => goTo(index + 1);
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  };

  nextBtn.addEventListener("click", () => {
    next();
    restart();
  });
  restart();
}

/* ---------------- scroll reveal ---------------- */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  els.forEach((el) => observer.observe(el));
}

/* ---------------- header scroll + nav ---------------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add("is-solid");
    else header.classList.remove("is-solid");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  burger?.addEventListener("click", () => mobileNav?.classList.toggle("open"));

  const searchBtn = document.getElementById("searchToggle");
  const searchWrap = document.getElementById("searchWrap");
  searchBtn?.addEventListener("click", () => {
    searchWrap?.classList.toggle("open");
    if (searchWrap?.classList.contains("open")) searchWrap.querySelector("input")?.focus();
  });
  searchWrap?.querySelector("input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = e.target.value.trim();
      window.location.href = "shop.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    }
  });
}

function initCartDrawer() {
  document.querySelectorAll("[data-cart-open]").forEach((btn) => btn.addEventListener("click", openCartDrawer));
  document.getElementById("cartClose")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);
  renderCartDrawer();
}

function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
}

function initNewsletter() {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("You're subscribed! Welcome to AUREVIA.");
      form.reset();
    });
  });
}

/* ---------------- product card rendering ---------------- */
function productCardHTML(p) {
  const wished = getWishlist().includes(p.id);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-media ${mediaClass(p)}">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <button class="product-wish ${wished ? "active" : ""}" aria-label="Wishlist" onclick="handleWishClick(event,'${p.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${wished ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.4 8 2 4.5 5.6 4 8 3.7 10 5 12 7.5 14 5 16 3.7 18.4 4 22 4.5 23.6 8 22 11.7 19.5 16.4 12 21 12 21Z"/></svg>
      </button>
      <a href="product.html?id=${p.id}">${mediaHTML(p)}</a>
      <div class="product-quickadd">
        <button class="btn btn-light btn-sm btn-block" onclick="handleQuickAdd(event,'${p.id}')">Quick Add</button>
      </div>
    </div>
    <div class="product-body">
      <div class="product-cat-row">
        <span class="product-cat">${categoryLabel(p.category)}</span>
        ${p.rating ? `<span class="product-rating">★ ${p.rating}</span>` : ""}
      </div>
      <h3 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
      <div class="price-row">
        <span>${formatPrice(p.price)}</span>
      </div>
      ${p.oldPrice ? `<div class="price-old-row"><span class="price-old">${formatPrice(p.oldPrice)}</span></div>` : ""}
    </div>
  </div>`;
}

function handleWishClick(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const active = toggleWishlist(id);
  e.currentTarget.classList.toggle("active", active);
  e.currentTarget.querySelector("svg").setAttribute("fill", active ? "currentColor" : "none");
  showToast(active ? "Saved to wishlist" : "Removed from wishlist");
}

function handleQuickAdd(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const p = getProduct(id);
  addToCart(id, 1, null, p.sizes?.[0] || null);
}

function renderGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(productCardHTML).join("") || `<div class="empty-state">No products found.</div>`;
}

/* ---------------- home page ---------------- */
function initHomePage() {
  if (!document.getElementById("featuredGrid")) return;
  renderGrid("featuredGrid", PRODUCTS.slice(0, 8));
  renderGrid("bestsellerGrid", PRODUCTS.filter((p) => p.badge === "Bestseller" || p.rating >= 4.8).slice(0, 4));
}

/* ---------------- shop page ---------------- */
function initShopPage() {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const activeCat = params.get("cat") || "all";
  const query = (params.get("q") || "").toLowerCase();

  let list = PRODUCTS.slice();
  if (activeCat !== "all") list = list.filter((p) => p.category === activeCat);
  if (query) list = list.filter((p) => p.name.toLowerCase().includes(query) || p.category.includes(query));
  renderGrid("shopGrid", list);
}

/* ---------------- product detail page ---------------- */
function initProductPage() {
  const root = document.getElementById("pdRoot");
  if (!root) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const p = getProduct(id) || PRODUCTS[0];

  document.title = p.name + " — AUREVIA";
  document.getElementById("pdMedia").innerHTML = mediaHTML(p);
  document.getElementById("pdMedia").classList.toggle("has-photo", !!p.img);
  document.getElementById("pdCat").textContent = categoryLabel(p.category);
  const pdRating = document.getElementById("pdRating");
  if (pdRating) pdRating.textContent = p.rating ? `★ ${p.rating}` : "";
  document.getElementById("pdTitle").textContent = p.name;
  document.getElementById("pdDesc").textContent = p.desc;
  document.getElementById("pdPriceNew").textContent = formatPrice(p.price);
  if (p.oldPrice) {
    const old = document.getElementById("pdPriceOld");
    old.textContent = formatPrice(p.oldPrice);
    old.style.display = "inline";
  }

  let selectedSize = p.sizes?.[0] || null;

  const sizeBlock = document.getElementById("pdSizeBlock");
  if (p.sizes?.length) {
    sizeBlock.style.display = "block";
    document.getElementById("pdSizeOptions").innerHTML = p.sizes
      .map((s, i) => `<div class="opt-size ${i === 0 ? "active" : ""}" data-size="${s}">${s}</div>`)
      .join("");
  } else {
    sizeBlock.style.display = "none";
  }

  root.addEventListener("click", (e) => {
    const sizeEl = e.target.closest(".opt-size");
    if (sizeEl) {
      selectedSize = sizeEl.dataset.size;
      document.querySelectorAll(".opt-size").forEach((el) => el.classList.remove("active"));
      sizeEl.classList.add("active");
    }
  });

  let qty = 1;
  const qtyInput = document.getElementById("pdQtyInput");
  document.getElementById("pdQtyMinus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    qtyInput.value = qty;
  });
  document.getElementById("pdQtyPlus").addEventListener("click", () => {
    qty = Math.min(10, qty + 1);
    qtyInput.value = qty;
  });

  document.getElementById("pdAddToCart").addEventListener("click", () => {
    addToCart(p.id, qty, null, selectedSize);
  });

  const wishBtn = document.getElementById("pdWish");
  const wished = getWishlist().includes(p.id);
  wishBtn.classList.toggle("active", wished);
  wishBtn.addEventListener("click", () => {
    const active = toggleWishlist(p.id);
    wishBtn.classList.toggle("active", active);
    showToast(active ? "Saved to wishlist" : "Removed from wishlist");
  });

  renderGrid(
    "relatedGrid",
    PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  );
}

/* ---------------- cart page ---------------- */
function initCartPage() {
  const body = document.getElementById("cartPageBody");
  if (!body) return;

  function render() {
    const lines = cartLinesWithData();
    if (lines.length === 0) {
      document.getElementById("cartPageFilled").style.display = "none";
      document.getElementById("cartPageEmpty").style.display = "block";
      return;
    }
    document.getElementById("cartPageFilled").style.display = "grid";
    document.getElementById("cartPageEmpty").style.display = "none";

    body.innerHTML = lines
      .map((l) => {
        const meta = [l.color, l.size ? "Size " + l.size : null].filter(Boolean).join(" · ");
        return `
        <div class="cart-row">
          <div class="cart-row-product">
            <div class="cart-row-media ${mediaClass(l.product)}">${mediaHTML(l.product)}</div>
            <div>
              <div class="cart-line-title">${l.product.name}</div>
              ${meta ? `<div class="cart-line-meta">${meta}</div>` : ""}
              <button class="cart-line-remove" onclick="removeFromCart('${l.id}','${l.color || ""}','${l.size || ""}'); document.dispatchEvent(new Event('cartchange'));">Remove</button>
            </div>
          </div>
          <div class="qty-pill">
            <button type="button" onclick="setLineQty('${l.id}','${l.color || ""}','${l.size || ""}', ${l.qty - 1}); document.dispatchEvent(new Event('cartchange'));">&minus;</button>
            <input type="text" readonly value="${l.qty}">
            <button type="button" onclick="setLineQty('${l.id}','${l.color || ""}','${l.size || ""}', ${l.qty + 1}); document.dispatchEvent(new Event('cartchange'));">+</button>
          </div>
          <div class="cart-line-price">${formatPrice(l.product.price * l.qty)}</div>
        </div>`;
      })
      .join("");

    const subtotal = cartSubtotal();
    const shipping = lines.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    document.getElementById("sumSubtotal").textContent = formatPrice(subtotal);
    document.getElementById("sumShipping").textContent = shipping === 0 ? "Free" : formatPrice(shipping);
    document.getElementById("sumTotal").textContent = formatPrice(subtotal + shipping);
  }

  document.addEventListener("cartchange", render);
  render();
}

/* ---------------- checkout page ---------------- */
function initCheckoutPage() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const lines = cartLinesWithData();
  const summaryEl = document.getElementById("checkoutSummary");
  if (lines.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  summaryEl.innerHTML = lines
    .map(
      (l) => `<div class="order-line">
        <div class="order-line-media">${l.product.img ? `<img src="${l.product.img}" alt="">` : ""}</div>
        <span class="order-line-name">${l.product.name} × ${l.qty}</span>
        <span>${formatPrice(l.product.price * l.qty)}</span>
      </div>`
    )
    .join("");

  const subtotal = cartSubtotal();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  document.getElementById("coSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("coShipping").textContent = shipping === 0 ? "Free" : formatPrice(shipping);
  document.getElementById("coTotal").textContent = formatPrice(subtotal + shipping);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const orderId = "AV" + Math.floor(100000 + Math.random() * 900000);
    const name = document.getElementById("coName").value;
    localStorage.setItem(
      "aurevia_last_order",
      JSON.stringify({ id: orderId, name, total: subtotal + shipping, count: cartCount() })
    );
    localStorage.removeItem(CART_KEY);
    window.location.href = "order-confirmation.html";
  });
}

function initConfirmationPage() {
  const el = document.getElementById("confirmRoot");
  if (!el) return;
  let order;
  try {
    order = JSON.parse(localStorage.getItem("aurevia_last_order"));
  } catch (e) {}
  if (!order) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("confirmOrderId").textContent = "#" + order.id;
  document.getElementById("confirmName").textContent = order.name || "";
  document.getElementById("confirmTotal").textContent = formatPrice(order.total);
  updateCartBadge();
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroReveal();
  initCartDrawer();
  initFooterYear();
  initNewsletter();
  initHomePage();
  initShopPage();
  initProductPage();
  initCartPage();
  initCheckoutPage();
  initConfirmationPage();
  initScrollReveal();
  initTestiSlider();
});
