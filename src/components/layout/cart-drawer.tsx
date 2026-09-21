"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotalFormatted,
    itemCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="cart-drawer-overlay"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="cart-drawer"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-maroon" />
                <h2 className="font-serif text-lg text-maroon">
                  Your Bag
                  {itemCount > 0 && (
                    <span className="ml-2 text-sm font-sans font-normal text-stone">
                      ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-2 text-charcoal-muted hover:text-maroon transition-colors -mr-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
                  <div className="w-20 h-20 rounded-full bg-ivory-200 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-9 h-9 text-maroon/40" />
                  </div>
                  <h3 className="font-serif text-xl text-maroon mb-2">Your bag is empty</h3>
                  <p className="text-stone text-sm mb-8 leading-relaxed">
                    Discover our curated collection of premium sarees and add your favourites.
                  </p>
                  <Button variant="primary" size="md" onClick={closeCart} asChild>
                    <Link href="/sarees">
                      Explore Sarees
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-ivory-200">
                  {items.map((item) => (
                    <motion.li
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 p-4"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/sarees/${item.product.slug}`}
                        onClick={closeCart}
                        className="flex-shrink-0 w-20 h-[108px] rounded-sm overflow-hidden bg-ivory-200 relative block"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <p className="text-[10px] text-gold-dark uppercase tracking-widest font-bold mb-0.5">
                            {item.product.category}
                          </p>
                          <Link
                            href={`/sarees/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-serif text-sm text-maroon hover:text-gold-dark transition-colors leading-snug block truncate"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-stone mt-0.5">{item.product.fabric}</p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-ivory-300 rounded-sm">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-charcoal-muted hover:text-maroon hover:bg-ivory-200 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-charcoal-muted hover:text-maroon hover:bg-ivory-200 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-bold text-charcoal text-sm">
                            ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        aria-label={`Remove ${item.product.name}`}
                        onClick={() => removeItem(item.product.id)}
                        className="flex-shrink-0 self-start pt-1 p-1.5 text-stone hover:text-maroon transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer — Only when cart has items */}
            {items.length > 0 && (
              <div className="flex-shrink-0 border-t border-ivory-200 p-5 space-y-4 bg-ivory-50">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone uppercase tracking-widest">Subtotal</span>
                  <span className="font-serif text-xl text-maroon font-semibold">
                    {subtotalFormatted}
                  </span>
                </div>
                <p className="text-[11px] text-stone">
                  Shipping & taxes calculated at checkout.
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={closeCart}
                    asChild
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    className="w-full text-stone"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
