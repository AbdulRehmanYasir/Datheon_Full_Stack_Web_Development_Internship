const API_URL = "https://fakestoreapi.com/products";
const TAX_RATE = 0.08;
const SHIPPING_FEE = 5.99;
const FREE_SHIPPING_OVER = 100;
const CART_KEY = "stockroom.cart.v1";

// FakeStoreAPI categories grouped into the three storefront filters
const CATEGORY_MAP = {
  electronics: ["electronics"],
  jewelry: ["jewelery"], // the API spells it this way
  clothing: ["men's clothing", "women's clothing"]
};

let products = [];
let category = "all";
let query = "";
let cart = loadCart();

const $ = (s) => document.querySelector(s);
const money = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---------- data ----------
async function loadProducts() {
  const grid = $("#grid");
  $("#status").hidden = true;
  grid.setAttribute("aria-busy", "true");
  grid.innerHTML = '<div class="skeleton"></div>'.repeat(8);
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("bad response");
    products = await res.json();
    renderProducts();
  } catch {
    grid.innerHTML = "";
    const s = $("#status");
    s.hidden = false;
    s.innerHTML = '<p>We couldn\'t load the products. Check your connection and try again.</p><button class="filter" id="retry">Try again</button>';
    $("#retry").addEventListener("click", loadProducts);
  } finally {
    grid.setAttribute("aria-busy", "false");
  }
}

// ---------- products ----------
function badgeFor(p) {
  if (p.rating.rate >= 4.5) return "Top rated";
  if (p.rating.count >= 400) return "Popular";
  if (p.price < 15) return "Great deal";
  return "";
}

function renderProducts() {
  const q = query.trim().toLowerCase();
  const list = products.filter((p) =>
    (category === "all" || CATEGORY_MAP[category].includes(p.category)) &&
    (!q || p.title.toLowerCase().includes(q))
  );
  $("#result-count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  $("#grid").innerHTML = list.length ? list.map((p) => {
    const filled = Math.round(p.rating.rate);
    const badge = badgeFor(p);
    return `<article class="card">
      ${badge ? `<span class="tag">${badge}</span>` : ""}
      <div class="img"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="card-body">
        <h3>${esc(p.title)}</h3>
        <p class="rating"><span class="stars" aria-label="${p.rating.rate} out of 5 stars">${"\u2605".repeat(filled)}${"\u2606".repeat(5 - filled)}</span> ${p.rating.rate} (${p.rating.count})</p>
        <p class="price">${money(p.price)}</p>
        <button class="add" data-id="${p.id}">Add to cart</button>
      </div>
    </article>`;
  }).join("") : '<p class="status">No products match your search.</p>';
}

// ---------- cart logic ----------
function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(raw) ? raw.filter((item) =>
      item && Number.isInteger(item.id) && typeof item.title === "string" &&
      Number.isFinite(item.price) && typeof item.image === "string" &&
      Number.isInteger(item.qty) && item.qty > 0
    ).map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      qty: item.qty
    })) : [];
  } catch { return []; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ }
}

function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  if (item) item.qty += 1;
  else {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    cart.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 });
  }
  updateCart();
}
function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
}
function updateQuantity(id, change) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) removeFromCart(id);
  else updateCart();
}
function calculateTotal() {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * TAX_RATE;
  const shipping = !cart.length || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  return { subtotal, tax, shipping, total: subtotal + tax + shipping };
}

function updateCart() {
  saveCart();
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const badge = $("#cart-badge");
  badge.textContent = count;
  badge.classList.remove("bump");
  void badge.offsetWidth; // restart the animation
  badge.classList.add("bump");

  $("#cart-items").innerHTML = cart.map((i) => `
    <li class="line" data-id="${i.id}">
      <img src="${esc(i.image)}" alt="">
      <div>
        <h4>${esc(i.title)}</h4>
        <div class="qty">
          <button data-act="dec" aria-label="Decrease quantity">&minus;</button>
          <span aria-live="polite">${i.qty}</span>
          <button data-act="inc" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="line-side"><strong>${money(i.price * i.qty)}</strong><button class="remove" data-act="rm">Remove</button></div>
    </li>`).join("");

  const t = calculateTotal();
  $("#t-sub").textContent = money(t.subtotal);
  $("#t-tax").textContent = money(t.tax);
  $("#t-ship").textContent = cart.length ? (t.shipping ? money(t.shipping) : "Free") : "-";
  $("#t-total").textContent = money(t.total);
  $("#cart-empty").hidden = cart.length > 0;
  $("#cart-foot").hidden = cart.length === 0;
}

// ---------- drawer ----------
const drawer = $("#drawer");
function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  $("#overlay").hidden = false;
  document.body.style.overflow = "hidden";
  $("#close-cart").focus();
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  $("#overlay").hidden = true;
  document.body.style.overflow = "";
}

// ---------- events ----------
$("#grid").addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  addToCart(Number(btn.dataset.id));
  btn.textContent = "Added";
  btn.classList.add("added");
  setTimeout(() => { btn.textContent = "Add to cart"; btn.classList.remove("added"); }, 900);
});

document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn || !btn.dataset.cat) return;
  category = btn.dataset.cat;
  document.querySelectorAll(".filters .filter").forEach((b) => {
    const active = b === btn;
    b.classList.toggle("on", active);
    b.setAttribute("aria-pressed", active);
  });
  renderProducts();
});
$("#search").addEventListener("input", (e) => { query = e.target.value; renderProducts(); });

$("#cart-btn").addEventListener("click", openCart);
$("#close-cart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("open")) closeCart(); });

$("#cart-items").addEventListener("click", (e) => {
  const act = e.target.dataset.act;
  if (!act) return;
  const id = Number(e.target.closest(".line").dataset.id);
  if (act === "inc") updateQuantity(id, 1);
  if (act === "dec") updateQuantity(id, -1);
  if (act === "rm") removeFromCart(id);
});

// ---------- checkout ----------
const checkout = $("#checkout");
$("#checkout-btn").addEventListener("click", () => {
  $("#co-form-view").hidden = false;
  $("#co-done-view").hidden = true;
  $("#co-total").textContent = money(calculateTotal().total);
  checkout.showModal();
});
$("#co-cancel").addEventListener("click", () => checkout.close());
$("#co-close").addEventListener("click", () => { checkout.close(); closeCart(); });
$("#co-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  $("#order-id").textContent = "#SR-" + Math.floor(100000 + Math.random() * 900000);
  $("#order-email").textContent = data.get("email");
  $("#co-form-view").hidden = true;
  $("#co-done-view").hidden = false;
  cart = [];
  updateCart();
  e.target.reset();
});

updateCart();
loadProducts();
