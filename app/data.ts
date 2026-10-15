export type Shape = "column" | "orb" | "flask" | "block";

export type Product = {
  id: number;
  no: string;
  slug: string;
  name: string;
  translation: string;
  family: string;
  concentration: "Extrait de Parfum" | "Eau de Parfum";
  oil: number; // % perfume oil
  longevity: number; // hours on skin
  sillage: "Intimate" | "Moderate" | "Generous";
  hue: string; // colour of the juice
  shape: Shape;
  sizes: { ml: number; price: number }[];
  notes: { top: string[]; heart: string[]; base: string[] };
  tagline: string;
  story: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    no: "I",
    slug: "heure-dambre",
    name: "Heure d'Ambre",
    translation: "The amber hour",
    family: "Leather · Amber",
    concentration: "Extrait de Parfum",
    oil: 24,
    longevity: 12,
    sillage: "Generous",
    hue: "#8A4A22",
    shape: "column",
    sizes: [{ ml: 50, price: 285 }, { ml: 100, price: 410 }],
    notes: { top: ["Calabrian Bergamot", "Pink Pepper"], heart: ["Orris Butter", "Suede"], base: ["Labdanum", "Assam Oud"] },
    tagline: "Smoked bergamot over a warm leather glove.",
    story: [
      "Composed for the moment the lamps are lit. Bergamot and pink pepper open bright and dry, then settle into orris and soft suede.",
      "By the second hour the labdanum takes over: resinous, honeyed, faintly smoky. It stays on a cashmere collar until morning.",
    ],
  },
  {
    id: 2,
    no: "II",
    slug: "soleil-bas",
    name: "Soleil Bas",
    translation: "Low sun",
    family: "Tobacco · Citrus",
    concentration: "Eau de Parfum",
    oil: 20,
    longevity: 9,
    sillage: "Moderate",
    hue: "#B07A33",
    shape: "orb",
    sizes: [{ ml: 50, price: 245 }, { ml: 100, price: 350 }],
    notes: { top: ["Sicilian Mandarin", "Green Cardamom"], heart: ["Jasmine Sambac", "Tobacco Leaf"], base: ["Haitian Vetiver", "Tonka Bean"] },
    tagline: "The last warm hour on a terrace.",
    story: [
      "Mandarin peel and crushed cardamom, warmed by sun-dried tobacco leaf. Jasmine sambac gives it a quiet, almost tea-like sweetness.",
      "The drydown is vetiver and tonka: clean, golden, close to the skin.",
    ],
  },
  {
    id: 3,
    no: "III",
    slug: "sel-dambre",
    name: "Sel d'Ambre",
    translation: "Salt & amber",
    family: "Marine · Woody",
    concentration: "Eau de Parfum",
    oil: 18,
    longevity: 8,
    sillage: "Moderate",
    hue: "#C2A47A",
    shape: "flask",
    sizes: [{ ml: 50, price: 260 }, { ml: 100, price: 375 }],
    notes: { top: ["Sea Salt", "Green Fig"], heart: ["Virginia Cedar", "Sandalwood"], base: ["Ambergris Accord", "White Musk"] },
    tagline: "Skin after a day by the sea.",
    story: [
      "Salt drying on warm skin, a green fig split open, the smell of sun-bleached wood.",
      "Our ambergris is an accord built in the laboratory, never taken from the sea. It gives the same luminous, mineral warmth.",
    ],
  },
  {
    id: 4,
    no: "IV",
    slug: "iris-velours",
    name: "Iris Velours",
    translation: "Velvet iris",
    family: "Powdery · Floral",
    concentration: "Extrait de Parfum",
    oil: 22,
    longevity: 11,
    sillage: "Moderate",
    hue: "#6A5560",
    shape: "block",
    sizes: [{ ml: 50, price: 295 }, { ml: 100, price: 420 }],
    notes: { top: ["Blackberry", "Violet Leaf"], heart: ["Florentine Iris", "Rose de Mai"], base: ["Bourbon Vanilla", "Patchouli"] },
    tagline: "Cool iris root, softened with dark fruit.",
    story: [
      "Florentine iris rhizomes rest for three years before distillation. The butter they give is one of the most precious materials in perfumery.",
      "We set it against blackberry and Grasse May rose, then let vanilla and patchouli round the edges. Powdery up close, quiet from across the room.",
    ],
  },
  {
    id: 5,
    no: "V",
    slug: "bois-sylvestre",
    name: "Bois Sylvestre",
    translation: "Woodland",
    family: "Green · Woody",
    concentration: "Eau de Parfum",
    oil: 18,
    longevity: 8,
    sillage: "Intimate",
    hue: "#6B6A3E",
    shape: "column",
    sizes: [{ ml: 50, price: 255 }, { ml: 100, price: 365 }],
    notes: { top: ["Juniper Berry", "Pine Needle"], heart: ["Cypress", "Wild Fern"], base: ["Oakmoss", "Vetiver"] },
    tagline: "A forest path just before the light goes.",
    story: [
      "Crushed juniper and pine resin, cypress and wet fern. Green and cool, without any of the sharpness of a cologne.",
      "Oakmoss gives the base its shadow. It wears close and lasts.",
    ],
  },
  {
    id: 6,
    no: "VI",
    slug: "figue-noire",
    name: "Figue Noire",
    translation: "Black fig",
    family: "Green · Fig",
    concentration: "Extrait de Parfum",
    oil: 22,
    longevity: 10,
    sillage: "Moderate",
    hue: "#5A4A52",
    shape: "orb",
    sizes: [{ ml: 50, price: 275 }, { ml: 100, price: 395 }],
    notes: { top: ["Fig Leaf", "Bergamot"], heart: ["Black Tea", "Violet"], base: ["Atlas Cedar", "Skin Musk"] },
    tagline: "The last hour before sleep.",
    story: [
      "Green fig leaf steeped in smoky black tea, with violet adding a cool, inky softness.",
      "Atlas cedar and musk keep it close to the body. Made for evenings that end late.",
    ],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const fromPrice = (p: Product) => Math.min(...p.sizes.map((s) => s.price));
export const flaconImage = (p: Product) => `/flacons/${p.slug}.png`;

/** Editorial photography. None of these show a branded product. */
const u = (id: string) => (w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const PHOTOS = {
  iris: u("photo-1703411963134-082db95ec9b3"),
  jasmine: u("photo-1750540835451-5b8028fbf7c1"),
  rose: u("photo-1629694242280-20637c63285b"),
  copperSmoke: u("photo-1648388148732-9235c8d39afe"),
  smokeWisp: u("photo-1723997774348-545a51f8f50b"),
  smokeLine: u("photo-1627759928897-7a75e7dfad90"),
  dropperHands: u("photo-1515377905703-c4788e51af15"),
  amberDropper: u("photo-1608571423902-eed4a5ad8108"),
};

export const MATERIALS = [
  { name: "Florentine Iris", origin: "Tuscany, Italy", note: "Rhizomes aged three years before distillation", photo: PHOTOS.iris },
  { name: "Jasmine Grandiflorum", origin: "Grasse, France", note: "Picked by hand at dawn, August to October", photo: PHOTOS.jasmine },
  { name: "Rose de Mai", origin: "Grasse, France", note: "Three weeks of harvest each May", photo: PHOTOS.rose },
  { name: "Assam Oud", origin: "Assam, India", note: "From cultivated Aquilaria, never wild trees", photo: PHOTOS.copperSmoke },
];

export const SALONS = [
  { id: "paris", city: "Paris", name: "Le Salon Montaigne", address: "42 Avenue Montaigne, 75008 Paris", hours: "Tuesday to Saturday, 11:00–19:00" },
  { id: "grasse", city: "Grasse", name: "L'Atelier de Grasse", address: "124 Route de Pégomas, 06130 Grasse", hours: "By appointment only" },
];

export const SERVICES = [
  { id: "consultation", name: "Fragrance consultation", detail: "60 minutes · complimentary" },
  { id: "bespoke", name: "Bespoke perfume", detail: "Six months · from €18,000 · by application" },
  { id: "engraving", name: "Engraving & gifting", detail: "30 minutes · complimentary" },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
