// ============================================================
// VG Collections — Product Data Module
// ============================================================
// Replace `images` array paths with real product photos later.
// Everything else (name, price, category, etc.) can stay as-is.
// ============================================================

export interface ProductDetails {
  blouseInfo: string;
  washCare: string;
  origin: string;
  workType?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  fabric: string;
  color: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[]; // Replace with real image paths when available
  availability: "in_stock" | "limited" | "out_of_stock";
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  bridal: boolean;
  details: ProductDetails;
  tags?: string[];
}

export type ProductCategory =
  | "Silk Sarees"
  | "Georgette"
  | "Printed Silk"
  | "Cotton"
  | "Bridal"
  | "Handloom"
  | "Linen"
  | "Chiffon"
  | "Net Sarees";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Silk Sarees",
  "Georgette",
  "Printed Silk",
  "Cotton",
  "Bridal",
  "Handloom",
  "Linen",
  "Chiffon",
  "Net Sarees",
];

import { SAREE_PLACEHOLDERS } from "./placeholders";

// ============================================================
// Product Data
// ============================================================

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "royal-kanchipuram-silk",
    name: "Royal Kanchipuram Silk",
    category: "Silk Sarees",
    fabric: "Pure Mulberry Silk",
    color: "Deep Crimson",
    price: 25000,
    originalPrice: 32000,
    description:
      "A masterpiece of Kanchipuram weaving tradition. This magnificent silk saree features a rich zari border with intricate temple motifs and a contrasting pallu that showcases the finest craftsmanship of Tamil Nadu. Each thread tells a story of heritage and excellence.",
    images: [SAREE_PLACEHOLDERS.kanchipuram1, SAREE_PLACEHOLDERS.kanchipuram2],
    availability: "in_stock",
    featured: true,
    newArrival: false,
    bestSeller: true,
    bridal: true,
    tags: ["kanchipuram", "silk", "bridal", "zari"],
    details: {
      blouseInfo: "Matching running blouse included (0.8m)",
      washCare: "Dry clean only. Store in muslin cloth.",
      origin: "Kanchipuram, Tamil Nadu",
      workType: "Handwoven Zari",
    },
  },
  {
    id: "2",
    slug: "banarasi-georgette-elegance",
    name: "Banarasi Georgette Elegance",
    category: "Georgette",
    fabric: "Pure Georgette",
    color: "Royal Blue",
    price: 18500,
    originalPrice: 22000,
    description:
      "Flowing Banarasi georgette with delicate floral butti weave and golden zari borders. Lightweight and perfect for festive occasions. The subtle shimmer catches the light beautifully, making this a favourite for celebrations.",
    images: [SAREE_PLACEHOLDERS.banarasi1, SAREE_PLACEHOLDERS.banarasi2],
    availability: "in_stock",
    featured: true,
    newArrival: true,
    bestSeller: false,
    bridal: false,
    tags: ["banarasi", "georgette", "festive"],
    details: {
      blouseInfo: "Matching blouse fabric (0.8m)",
      washCare: "Gentle hand wash or dry clean.",
      origin: "Varanasi, Uttar Pradesh",
      workType: "Zari Butti",
    },
  },
  {
    id: "3",
    slug: "mysore-crepe-silk",
    name: "Mysore Crepe Silk",
    category: "Printed Silk",
    fabric: "Mysore Crepe Silk",
    color: "Emerald Green",
    price: 12000,
    description:
      "The pride of Karnataka's weaving tradition. Mysore crepe silk with a luminous finish and printed floral pattern. Light, drape-friendly, and perfect for daily wear occasions or festive gatherings.",
    images: [SAREE_PLACEHOLDERS.mysore1, SAREE_PLACEHOLDERS.mysore2],
    availability: "in_stock",
    featured: false,
    newArrival: true,
    bestSeller: true,
    bridal: false,
    tags: ["mysore", "silk", "printed"],
    details: {
      blouseInfo: "Matching blouse fabric included",
      washCare: "Dry clean recommended.",
      origin: "Mysore, Karnataka",
      workType: "Digital Print",
    },
  },
  {
    id: "4",
    slug: "handloom-khadi-cotton",
    name: "Handloom Khadi Cotton",
    category: "Cotton",
    fabric: "Handspun Khadi Cotton",
    color: "Natural Ivory",
    price: 4500,
    description:
      "Pure handspun khadi cotton saree that embodies simplicity and sustainability. Lightweight, breathable, and elegant — a perfect everyday companion that honours the spirit of Indian craftsmanship.",
    images: [SAREE_PLACEHOLDERS.khadi1, SAREE_PLACEHOLDERS.khadi2],
    availability: "in_stock",
    featured: true,
    newArrival: false,
    bestSeller: true,
    bridal: false,
    tags: ["khadi", "cotton", "handloom", "daily"],
    details: {
      blouseInfo: "No blouse included (plain)",
      washCare: "Machine wash gentle or hand wash. Mild detergent.",
      origin: "Gujarat",
      workType: "Handspun & Handwoven",
    },
  },
  {
    id: "5",
    slug: "bridal-kanjivaram-grand",
    name: "Bridal Kanjivaram Grand",
    category: "Bridal",
    fabric: "Pure Kanjivaram Silk",
    color: "Deep Maroon & Gold",
    price: 58000,
    originalPrice: 72000,
    description:
      "A truly royal bridal saree with heavy 24-carat gold zari work. The intricate temple border and majestic pallu make this the centrepiece of any bridal trousseau. Passed down through generations, this is more than a saree — it is an heirloom.",
    images: [SAREE_PLACEHOLDERS.bridal1, SAREE_PLACEHOLDERS.bridal2],
    availability: "limited",
    featured: true,
    newArrival: false,
    bestSeller: false,
    bridal: true,
    tags: ["bridal", "kanjivaram", "wedding", "gold zari", "heirloom"],
    details: {
      blouseInfo: "Heavy designer blouse included",
      washCare: "Dry clean only. Store in acid-free tissue paper.",
      origin: "Kanchipuram, Tamil Nadu",
      workType: "Heavy Gold Zari",
    },
  },
  {
    id: "6",
    slug: "linen-block-print",
    name: "Linen Block Print",
    category: "Handloom",
    fabric: "Pure Linen",
    color: "Indigo Blue",
    price: 7800,
    description:
      "Hand block-printed on premium Belgian linen. The geometric indigo patterns are stamped by master artisans in Jaipur, resulting in a one-of-a-kind wearable art piece. Each saree is unique.",
    images: [SAREE_PLACEHOLDERS.linen1, SAREE_PLACEHOLDERS.linen2],
    availability: "in_stock",
    featured: false,
    newArrival: true,
    bestSeller: false,
    bridal: false,
    tags: ["linen", "block print", "handcraft", "jaipur"],
    details: {
      blouseInfo: "Contrasting blouse fabric included",
      washCare: "Hand wash in cold water. Do not wring.",
      origin: "Jaipur, Rajasthan",
      workType: "Hand Block Print",
    },
  },
  {
    id: "7",
    slug: "soft-silk-contrast-border",
    name: "Soft Silk Contrast Border",
    category: "Silk Sarees",
    fabric: "Soft Silk",
    color: "Peacock Green",
    price: 9500,
    originalPrice: 12000,
    description:
      "A sophisticated soft silk saree with a striking contrast border in gold and maroon. The lightweight weave makes it comfortable for long wear while the rich colours ensure you stand out in any gathering.",
    images: [SAREE_PLACEHOLDERS.softSilk1, SAREE_PLACEHOLDERS.softSilk2],
    availability: "in_stock",
    featured: false,
    newArrival: true,
    bestSeller: true,
    bridal: false,
    tags: ["soft silk", "contrast border"],
    details: {
      blouseInfo: "Contrast blouse fabric (0.8m)",
      washCare: "Dry clean preferred.",
      origin: "Salem, Tamil Nadu",
      workType: "Machine Weave with Zari Border",
    },
  },
  {
    id: "8",
    slug: "chikankari-georgette",
    name: "Chikankari Georgette",
    category: "Georgette",
    fabric: "Georgette",
    color: "Blush Pink",
    price: 14500,
    description:
      "Delicate Lucknowi chikankari embroidery on premium georgette. The intricate white-on-pink shadow work creates an ethereal, romantic look perfect for evening occasions and festive gatherings.",
    images: [SAREE_PLACEHOLDERS.chikankari1, SAREE_PLACEHOLDERS.chikankari2],
    availability: "in_stock",
    featured: false,
    newArrival: false,
    bestSeller: true,
    bridal: false,
    tags: ["chikankari", "lucknow", "georgette", "embroidery"],
    details: {
      blouseInfo: "Plain georgette blouse included",
      washCare: "Dry clean only.",
      origin: "Lucknow, Uttar Pradesh",
      workType: "Hand Chikankari Embroidery",
    },
  },
];

// ============================================================
// Helper Functions
// ============================================================

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.newArrival);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestSeller);
}

export function getBridalCollection(): Product[] {
  return PRODUCTS.filter((p) => p.bridal);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(q)))
  );
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function getDiscountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
