"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag, Heart, ChevronLeft, ChevronRight,
  Package, RefreshCw, Shield, Truck, Check, Minus, Plus, ChevronDown
} from "lucide-react";
import { Product, formatPrice, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: Product;
}

const DELIVERY_INFO = [
  { icon: Truck, label: "Free shipping", desc: "On orders above ₹2,000" },
  { icon: RefreshCw, label: "Easy returns", desc: "Within 7 days" },
  { icon: Shield, label: "Authentic", desc: "Certificate included" },
  { icon: Package, label: "Gift packed", desc: "Premium packaging" },
];

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  const [imageError, setImageError] = useState<boolean[]>(
    product.images.map(() => false)
  );

  const discountPercent = getDiscountPercent(product.price, product.originalPrice);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const nextImage = () => setActiveImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const toggleSection = (id: string) =>
    setExpandedSection((prev) => (prev === id ? null : id));

  const accordionSections = [
    {
      id: "description",
      title: "Description",
      content: product.description,
    },
    {
      id: "details",
      title: "Product Details",
      content: [
        `Fabric: ${product.fabric}`,
        `Category: ${product.category}`,
        `Colour: ${product.color}`,
        `Blouse: ${product.details.blouseInfo}`,
        `Origin: ${product.details.origin}`,
        product.details.workType ? `Work Type: ${product.details.workType}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    },
    {
      id: "care",
      title: "Wash & Care",
      content: product.details.washCare,
    },
    {
      id: "delivery",
      title: "Delivery & Returns",
      content:
        "Free shipping on orders above ₹2,000. Standard delivery 4–7 business days. Express delivery available at checkout.\n\nEasy returns within 7 days of delivery. Product must be unused and in original packaging.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20">
      {/* ── Image Gallery ── */}
      <div className="flex flex-col sm:flex-row gap-3 lg:sticky lg:top-28 lg:self-start">
        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex sm:flex-col gap-2 order-2 sm:order-1 sm:w-20 overflow-x-auto sm:overflow-visible no-scrollbar">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "flex-shrink-0 w-16 h-20 sm:w-full sm:aspect-[3/4] rounded-sm overflow-hidden border-2 transition-colors",
                  activeImage === i
                    ? "border-maroon"
                    : "border-ivory-200 hover:border-ivory-300"
                )}
              >
                {!imageError[i] ? (
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    width={80}
                    height={107}
                    className="object-cover w-full h-full"
                    onError={() => {
                      const errs = [...imageError];
                      errs[i] = true;
                      setImageError(errs);
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-ivory-200 flex items-center justify-center">
                    <span className="text-maroon/30 font-serif text-xs">VG</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="flex-1 relative aspect-[3/4] bg-ivory-200 rounded-sm overflow-hidden order-1 sm:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              {!imageError[activeImage] ? (
                <Image
                  src={product.images[activeImage]}
                  alt={`${product.name} — image ${activeImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => {
                    const errs = [...imageError];
                    errs[activeImage] = true;
                    setImageError(errs);
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-ivory-200">
                  <div className="w-16 h-16 rounded-full border-2 border-maroon/20 flex items-center justify-center mb-3">
                    <span className="text-maroon/30 font-serif text-2xl">VG</span>
                  </div>
                  <p className="text-maroon/40 text-xs uppercase tracking-widest">
                    {product.category}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows (only if multiple images) */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-ivory-50/90 rounded-full flex items-center justify-center shadow-sm hover:bg-ivory-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-charcoal" />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-ivory-50/90 rounded-full flex items-center justify-center shadow-sm hover:bg-ivory-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-charcoal" />
              </button>
            </>
          )}

          {/* Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === activeImage ? "w-4 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-ivory-50/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Product Info ── */}
      <div className="space-y-6">
        {/* Category & Badges */}
        <div className="flex items-center flex-wrap gap-2">
          <Link
            href={`/sarees?category=${encodeURIComponent(product.category)}`}
            className="text-xs text-gold-dark uppercase tracking-[0.2em] font-bold hover:text-gold transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-ivory-300 text-xs">·</span>
          <span className="text-xs text-stone uppercase tracking-widest">{product.fabric}</span>
          {discountPercent && <Badge variant="discount">−{discountPercent}%</Badge>}
          {product.newArrival && <Badge variant="new">New</Badge>}
          {product.bridal && <Badge variant="bridal">Bridal</Badge>}
          {product.availability === "limited" && <Badge variant="limited">Limited Stock</Badge>}
        </div>

        {/* Name */}
        <h1 className="font-serif text-3xl md:text-4xl text-maroon leading-tight">
          {product.name}
        </h1>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <p className="font-serif text-2xl font-bold text-maroon">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <>
              <p className="text-stone text-base line-through">
                {formatPrice(product.originalPrice)}
              </p>
              <p className="text-sm font-bold text-gold-dark">
                Save {formatPrice(product.originalPrice - product.price)}
              </p>
            </>
          )}
        </div>

        {/* Gold divider */}
        <div className="w-10 h-px bg-gold" />

        {/* Short description */}
        <p className="text-stone text-base leading-relaxed">
          {product.description.split(".")[0] + "."}
        </p>

        {/* Origin */}
        <div className="flex items-center gap-2 text-xs text-stone">
          <span className="w-1 h-1 rounded-full bg-gold" />
          Origin: <span className="font-bold text-charcoal-muted">{product.details.origin}</span>
        </div>

        {/* Quantity */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-charcoal mb-3">
            Quantity
          </p>
          <div className="flex items-center border border-ivory-300 rounded-sm w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="w-10 h-10 flex items-center justify-center text-charcoal-muted hover:text-maroon hover:bg-ivory-100 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-charcoal text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="w-10 h-10 flex items-center justify-center text-charcoal-muted hover:text-maroon hover:bg-ivory-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            disabled={product.availability === "out_of_stock"}
            className="flex-1"
          >
            {addedToCart ? (
              <>
                <Check className="mr-2 w-4 h-4" />
                Added to Bag!
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 w-4 h-4" />
                {product.availability === "out_of_stock" ? "Sold Out" : "Add to Bag"}
              </>
            )}
          </Button>
          <Button
            variant="gold"
            size="lg"
            className="flex-1"
            disabled={product.availability === "out_of_stock"}
            asChild
          >
            <Link href="/checkout">Buy Now</Link>
          </Button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "w-12 h-12 flex-shrink-0 border rounded-sm flex items-center justify-center transition-all duration-200",
              isWishlisted
                ? "border-maroon bg-maroon text-ivory-50"
                : "border-ivory-300 text-charcoal-muted hover:border-maroon hover:text-maroon"
            )}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </button>
        </div>

        {/* Delivery Info */}
        <div className="grid grid-cols-2 gap-3 py-5 border-y border-ivory-200">
          {DELIVERY_INFO.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-ivory-200 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-maroon" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal">{label}</p>
                <p className="text-[11px] text-stone mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-0 border-t border-ivory-200">
          {accordionSections.map((section) => (
            <div key={section.id} className="border-b border-ivory-200">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between py-4 text-left"
                aria-expanded={expandedSection === section.id}
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-charcoal">
                  {section.title}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-stone transition-transform duration-300",
                    expandedSection === section.id && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 pr-6">
                      {section.content.split("\n").map((line, i) => (
                        <p key={i} className="text-stone text-sm leading-relaxed mb-1.5">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
