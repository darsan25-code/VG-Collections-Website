"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Product, formatPrice, getDiscountPercent } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountPercent = getDiscountPercent(product.price, product.originalPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/sarees/${product.slug}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Image & Interactive Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200 rounded-sm mb-4">
        {/* Main Product Image Link */}
        <Link
          href={`/sarees/${product.slug}`}
          aria-label={`View ${product.name} — ${formatPrice(product.price)}`}
          className="block relative w-full h-full"
        >
          {!imageError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-105"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Elegant Fallback Placeholder */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-ivory-200 to-ivory-300 text-center p-4">
              <div className="w-12 h-12 rounded-full border-2 border-maroon/20 flex items-center justify-center mb-3">
                <span className="text-maroon/30 font-serif text-lg">VG</span>
              </div>
              <p className="text-maroon/40 text-xs uppercase tracking-widest leading-tight">
                {product.category}
              </p>
            </div>
          )}

          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {discountPercent && (
            <Badge variant="discount">−{discountPercent}%</Badge>
          )}
          {product.newArrival && !discountPercent && (
            <Badge variant="new">New</Badge>
          )}
          {product.bridal && (
            <Badge variant="bridal">Bridal</Badge>
          )}
          {product.availability === "limited" && (
            <Badge variant="limited">Limited</Badge>
          )}
          {product.availability === "out_of_stock" && (
            <Badge variant="sold_out">Sold Out</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-ivory-50/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ivory-50 shadow-sm"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted ? "fill-maroon text-maroon" : "text-charcoal-muted"
            )}
          />
        </button>

        {/* Quick View Button (desktop) */}
        <button
          type="button"
          onClick={handleQuickView}
          aria-label={`Quick view ${product.name}`}
          className="absolute top-3 right-12 z-10 w-8 h-8 rounded-full bg-ivory-50/90 backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ivory-50 shadow-sm hidden md:flex"
        >
          <Eye className="w-4 h-4 text-charcoal-muted" />
        </button>

        {/* Add to Cart — Slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.availability === "out_of_stock"}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              "w-full py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-all duration-200",
              addedToCart
                ? "bg-gold text-charcoal"
                : "bg-ivory-50/95 backdrop-blur-sm text-maroon hover:bg-maroon hover:text-ivory-50",
              product.availability === "out_of_stock" && "opacity-50 cursor-not-allowed"
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <AnimatePresence mode="wait">
              <motion.span
                key={addedToCart ? "added" : "add"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                {addedToCart ? "Added to Bag!" : product.availability === "out_of_stock" ? "Sold Out" : "Add to Bag"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link
        href={`/sarees/${product.slug}`}
        className="block space-y-1.5 px-0.5"
        aria-label={`View details of ${product.name}`}
      >
        <p className="text-[10px] text-gold-dark uppercase tracking-[0.15em] font-bold">
          {product.category}
        </p>
        <h3 className="font-serif text-base text-charcoal group-hover:text-maroon transition-colors duration-300 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-bold text-maroon text-base">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice && (
            <p className="text-stone text-sm line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
