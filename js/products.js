/* AUREVIA — product catalogue + category icons (self-contained, no external images) */

const ICONS = {
  necklace: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 22c0 20 13 34 30 34s30-14 30-34"/><circle cx="50" cy="68" r="8"/><path d="M50 60v-4"/></svg>',
  earring: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="24" r="9"/><path d="M50 33v14"/><path d="M38 47a12 12 0 0 0 24 0"/><circle cx="50" cy="74" r="7"/></svg>',
  ring: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="60" r="24"/><path d="M40 36l10-16 10 16z"/><circle cx="50" cy="30" r="4"/></svg>',
  bracelet: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="50" cy="50" rx="30" ry="20"/><path d="M20 50a30 20 0 0 0 60 0" opacity=".4"/><circle cx="50" cy="30" r="3"/><circle cx="26" cy="45" r="3"/><circle cx="74" cy="45" r="3"/></svg>',
  bag: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="38" width="56" height="42" rx="8"/><path d="M35 38v-8a15 15 0 0 1 30 0v8"/></svg>',
  hair: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 50c0-18 12-30 26-30s26 12 26 30"/><path d="M28 50v14M40 50v18M50 50v20M60 50v18M72 50v14"/></svg>',
};

const CATEGORIES = [
  { slug: "necklaces", label: "Necklaces", icon: ICONS.necklace },
  { slug: "earrings", label: "Earrings", icon: ICONS.earring },
  { slug: "rings", label: "Rings", icon: ICONS.ring },
  { slug: "bracelets", label: "Bracelets", icon: ICONS.bracelet },
  { slug: "bags", label: "Bags & Belts", icon: ICONS.bag },
  { slug: "hair", label: "Hair Accessories", icon: ICONS.hair },
];

const COLOR_HEX = {
  Gold: "#c9a24b",
  "Rose Gold": "#c98a94",
  Silver: "#c3c7cc",
  Black: "#2b2320",
  Pearl: "#f2ece2",
};

const PRODUCTS = [
  { id: "p01", name: "Aurora Pendant Necklace", category: "necklaces", price: 38, oldPrice: 48, badge: "Sale", colors: ["Silver"], rating: 4.8,
    img: "assets/products/necklace-pendant-halo.jpg",
    desc: "A fine chain necklace finished with a hand-set halo pendant. Lightweight enough for everyday wear, refined enough for evenings out." },
  { id: "p02", name: "Layla Pavé Chain Necklace", category: "necklaces", price: 64, colors: ["Silver"], badge: "New", rating: 4.6,
    img: "assets/products/necklace-pave-chain.jpg",
    desc: "A mariner-link chain fully pavé-set for continuous sparkle from every angle — a statement piece that still layers well." },
  { id: "p17", name: "Marlowe Statement Chain", category: "necklaces", price: 72, colors: ["Silver"], badge: "New", rating: 4.7,
    img: "assets/products/necklace-statement-chain.jpg",
    desc: "A bold pavé curb-link chain with serious presence — the piece that finishes an outfit on its own." },
  { id: "p03", name: "Celeste Pearl Drop Earrings", category: "earrings", price: 26, colors: ["Pearl", "Gold"], rating: 4.9,
    desc: "Freshwater-style pearl drops on a delicate gold-tone hook. Light on the ear, elegant on you." },
  { id: "p04", name: "Nova Hoop Earrings", category: "earrings", price: 22, oldPrice: 30, badge: "Sale", colors: ["Gold", "Silver", "Black"], rating: 4.7,
    desc: "Classic huggie hoops with a soft polished finish — the everyday earring you'll reach for on repeat." },
  { id: "p05", name: "Mira Statement Studs", category: "earrings", price: 19, colors: ["Gold", "Silver"], rating: 4.5,
    desc: "Sculptural studs that add a little edge to a plain outfit without trying too hard." },
  { id: "p06", name: "Sienna Link Ring", category: "rings", price: 34, colors: ["Gold"], sizes: ["6", "7", "8", "9"], badge: "Bestseller", rating: 4.9,
    img: "assets/products/ring-link-band.jpg",
    desc: "A sculptural chain-link band in polished gold-tone — easy to wear alone or stacked with our other rings." },
  { id: "p07", name: "Wren Bridal Ring Duo", category: "rings", price: 59, colors: ["Gold"], sizes: ["6", "7", "8", "9"], rating: 4.6,
    img: "assets/products/ring-bridal-set-a.jpg",
    desc: "A slim band and a solitaire-style ring designed to be worn together as a set, or separately." },
  { id: "p18", name: "Noor Pavé Bridal Set", category: "rings", price: 68, colors: ["Gold"], sizes: ["6", "7", "8", "9"], badge: "New", rating: 4.8,
    img: "assets/products/ring-bridal-set-b.jpg",
    desc: "Two fully pavé-set bands paired together, anchored by a brilliant round centre stone." },
  { id: "p19", name: "Celine Sapphire Wrap Ring", category: "rings", price: 54, colors: ["Gold"], sizes: ["6", "7", "8", "9"], rating: 4.7,
    img: "assets/products/ring-sapphire-wrap.jpg",
    desc: "An open wrap design lined with pavé stones and finished with two heart-cut sapphire-blue accents." },
  { id: "p20", name: "Halo Cushion Ring", category: "rings", price: 46, colors: ["Silver"], sizes: ["6", "7", "8", "9"], rating: 4.8,
    img: "assets/products/ring-cushion-halo.jpg",
    desc: "A cushion-cut centre stone framed by a bright pavé halo, set on a delicate polished band." },
  { id: "p21", name: "Vera Pavé Statement Ring", category: "rings", price: 62, colors: ["Gold"], sizes: ["6", "7", "8", "9"], badge: "Bestseller", rating: 4.9,
    img: "assets/products/ring-pave-statement.jpg",
    desc: "A wide, multi-row pavé band with a raised centre stone — our most eye-catching ring, built to be the only one you need." },
  { id: "p22", name: "Marielle Pear Cluster Ring", category: "rings", price: 45, colors: ["Gold"], sizes: ["6", "7", "8", "9"], rating: 4.6,
    img: "assets/products/ring-pear-cluster.jpg",
    desc: "A pear-shaped cluster of pavé stones set on a beaded triple-row band for extra texture." },
  { id: "p08", name: "Ivy Pavé Curb Bracelet", category: "bracelets", price: 57, oldPrice: 70, badge: "Sale", colors: ["Rose Gold"], rating: 4.7,
    img: "assets/products/bracelet-pave-curb.jpg",
    desc: "A substantial curb-link bracelet fully pavé-set for continuous shine, finished with a secure clasp." },
  { id: "p09", name: "Sol Bead Bracelet", category: "bracelets", price: 18, colors: ["Gold", "Black", "Pearl"], rating: 4.4,
    desc: "Stretch bead bracelet that layers beautifully with our chain styles — comfortable, no clasp needed." },
  { id: "p10", name: "Marlow Mini Crossbody", category: "bags", price: 58, colors: ["Black", "Rose Gold"], badge: "New", rating: 4.8,
    desc: "A compact vegan-leather crossbody with a structured shape and adjustable strap. Fits phone, cards and keys." },
  { id: "p11", name: "Reya Woven Belt", category: "bags", price: 21, colors: ["Gold", "Black"], rating: 4.3,
    desc: "A slim woven belt with a polished buckle — cinches a dress or layers over an oversized coat." },
  { id: "p12", name: "Faye Top-Handle Pouch", category: "bags", price: 46, oldPrice: 58, badge: "Sale", colors: ["Black", "Pearl"], rating: 4.6,
    desc: "A soft structured pouch bag with a short top handle and detachable long strap for two ways to wear." },
  { id: "p13", name: "Bloom Hair Claw Clip", category: "hair", price: 14, colors: ["Gold", "Pearl", "Black"], rating: 4.9,
    desc: "A strong-grip claw clip in a sculpted finish — holds thick hair comfortably all day." },
  { id: "p14", name: "Halo Pearl Hairpin Set", category: "hair", price: 16, colors: ["Pearl", "Gold"], badge: "New", rating: 4.7,
    desc: "Set of 4 pearl-topped pins for half-up styles, updos, or a simple finishing touch." },
  { id: "p15", name: "Rue Silk-Feel Scrunchie Duo", category: "hair", price: 12, colors: ["Rose Gold", "Black"], rating: 4.5,
    desc: "Two oversized silk-feel scrunchies that are gentle on hair and look just as good on the wrist." },
  { id: "p16", name: "Odette Cuff Bracelet", category: "bracelets", price: 32, colors: ["Gold", "Silver"], badge: "Bestseller", rating: 4.8,
    desc: "An open cuff with a subtle hammered texture — slips on easily and holds its shape." },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function formatPrice(n) {
  return "$" + n.toFixed(2);
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
