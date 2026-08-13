/* AUREVIA — product catalogue (only products with real photography) */

const ICONS = {
  necklace: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 22c0 20 13 34 30 34s30-14 30-34"/><circle cx="50" cy="68" r="8"/><path d="M50 60v-4"/></svg>',
  ring: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="60" r="24"/><path d="M40 36l10-16 10 16z"/><circle cx="50" cy="30" r="4"/></svg>',
  bracelet: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="50" cy="50" rx="30" ry="20"/><path d="M20 50a30 20 0 0 0 60 0" opacity=".4"/><circle cx="50" cy="30" r="3"/><circle cx="26" cy="45" r="3"/><circle cx="74" cy="45" r="3"/></svg>',
};

const CATEGORIES = [
  { slug: "necklaces", label: "Necklaces", icon: ICONS.necklace },
  { slug: "rings", label: "Rings", icon: ICONS.ring },
  { slug: "bracelets", label: "Bracelets", icon: ICONS.bracelet },
];

const EGP_RATE = 50;

const PRODUCTS = [
  { id: "p01", name: "Aurora Pendant Necklace", category: "necklaces", price: 38, oldPrice: 48, badge: "Sale", rating: 4.8,
    img: "assets/products/necklace-pendant-halo.jpg",
    desc: "A fine chain necklace finished with a hand-set halo pendant. Lightweight enough for everyday wear, refined enough for evenings out." },
  { id: "p02", name: "Layla Pavé Chain Necklace", category: "necklaces", price: 64, badge: "New", rating: 4.6,
    img: "assets/products/necklace-pave-chain.jpg",
    desc: "A mariner-link chain fully pavé-set for continuous sparkle from every angle — a statement piece that still layers well." },
  { id: "p17", name: "Marlowe Statement Chain", category: "necklaces", price: 72, badge: "New", rating: 4.7,
    img: "assets/products/necklace-statement-chain.jpg",
    desc: "A bold pavé curb-link chain with serious presence — the piece that finishes an outfit on its own." },
  { id: "p06", name: "Sienna Link Ring", category: "rings", price: 34, sizes: ["6", "7", "8", "9"], badge: "Bestseller", rating: 4.9,
    img: "assets/products/ring-link-band.jpg",
    desc: "A sculptural chain-link band in polished gold-tone — easy to wear alone or stacked with our other rings." },
  { id: "p07", name: "Wren Bridal Ring Duo", category: "rings", price: 59, sizes: ["6", "7", "8", "9"], rating: 4.6,
    img: "assets/products/ring-bridal-set-a.jpg",
    desc: "A slim band and a solitaire-style ring designed to be worn together as a set, or separately." },
  { id: "p18", name: "Noor Pavé Bridal Set", category: "rings", price: 68, sizes: ["6", "7", "8", "9"], badge: "New", rating: 4.8,
    img: "assets/products/ring-bridal-set-b.jpg",
    desc: "Two fully pavé-set bands paired together, anchored by a brilliant round centre stone." },
  { id: "p19", name: "Celine Sapphire Wrap Ring", category: "rings", price: 54, sizes: ["6", "7", "8", "9"], rating: 4.7,
    img: "assets/products/ring-sapphire-wrap.jpg",
    desc: "An open wrap design lined with pavé stones and finished with two heart-cut sapphire-blue accents." },
  { id: "p20", name: "Halo Cushion Ring", category: "rings", price: 46, sizes: ["6", "7", "8", "9"], rating: 4.8,
    img: "assets/products/ring-cushion-halo.jpg",
    desc: "A cushion-cut centre stone framed by a bright pavé halo, set on a delicate polished band." },
  { id: "p21", name: "Vera Pavé Statement Ring", category: "rings", price: 62, sizes: ["6", "7", "8", "9"], badge: "Bestseller", rating: 4.9,
    img: "assets/products/ring-pave-statement.jpg",
    desc: "A wide, multi-row pavé band with a raised centre stone — our most eye-catching ring, built to be the only one you need." },
  { id: "p22", name: "Marielle Pear Cluster Ring", category: "rings", price: 45, sizes: ["6", "7", "8", "9"], rating: 4.6,
    img: "assets/products/ring-pear-cluster.jpg",
    desc: "A pear-shaped cluster of pavé stones set on a beaded triple-row band for extra texture." },
  { id: "p08", name: "Ivy Pavé Curb Bracelet", category: "bracelets", price: 57, oldPrice: 70, badge: "Sale", rating: 4.7,
    img: "assets/products/bracelet-pave-curb.jpg",
    desc: "A substantial curb-link bracelet fully pavé-set for continuous shine, finished with a secure clasp." },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function formatPrice(n) {
  return "EGP " + Math.round(n * EGP_RATE).toLocaleString("en-US");
}

function categoryLabel(slug) {
  const c = CATEGORIES.find((c) => c.slug === slug);
  return c ? c.label : slug;
}

function categoryIcon(slug) {
  const c = CATEGORIES.find((c) => c.slug === slug);
  return c ? c.icon : ICONS.necklace;
}

function mediaHTML(p) {
  return p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy">` : categoryIcon(p.category);
}

function mediaClass(p) {
  return p.img ? "has-photo" : "";
}
