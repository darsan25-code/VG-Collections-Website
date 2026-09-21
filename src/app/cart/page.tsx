"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-ivory-100">
        <div className="section-container py-10 md:py-14">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-2">
              Your Selection
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-maroon">
              Shopping Bag
              {itemCount > 0 && (
                <span className="text-lg font-sans font-normal text-stone ml-3">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h1>
          </div>

          {items.length === 0 ? (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 rounded-full bg-ivory-200 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-maroon/30" />
              </div>
              <h2 className="font-serif text-2xl text-maroon mb-3">
                Your bag is empty
              </h2>
              <p className="text-stone mb-8 max-w-sm mx-auto">
                Explore our curated saree collection and add pieces you love.
              </p>
              <Button variant="primary" size="lg" asChild>
                <Link href="/sarees">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Continue Shopping
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-1">
                {/* Column Headers */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 pb-4 border-b border-ivory-200 text-[10px] uppercase tracking-[0.2em] font-bold text-stone">
                  <span>Product</span>
                  <span className="text-center w-28">Quantity</span>
                  <span className="text-right w-24">Price</span>
                  <span className="w-8" />
                </div>

                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto_auto] gap-4 py-6 border-b border-ivory-200 items-start md:items-center"
                  >
                    {/* Image */}
                    <Link href={`/sarees/${item.product.slug}`} className="flex-shrink-0">
                      <div className="w-20 h-28 md:w-24 md:h-32 relative rounded-sm overflow-hidden bg-ivory-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="space-y-1 min-w-0">
                      <p className="text-[10px] text-gold-dark uppercase tracking-widest font-bold">
                        {item.product.category}
                      </p>
                      <Link
                        href={`/sarees/${item.product.slug}`}
                        className="font-serif text-base text-maroon hover:text-gold-dark transition-colors leading-snug block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-stone">{item.product.fabric}</p>
                      {/* Mobile Price */}
                      <p className="md:hidden font-bold text-charcoal mt-2">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border border-ivory-300 rounded-sm w-fit">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 flex items-center justify-center text-stone hover:text-maroon transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-8 h-8 flex items-center justify-center text-stone hover:text-maroon transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price (desktop) */}
                    <p className="hidden md:block font-bold text-charcoal text-right w-24">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-stone hover:text-maroon transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}

                {/* Continue Shopping */}
                <div className="pt-4">
                  <Link
                    href="/sarees"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone hover:text-maroon transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-6 space-y-5 sticky top-28">
                  <h2 className="font-serif text-xl text-maroon">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-stone">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-semibold text-charcoal">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-gold-dark font-semibold" : "font-semibold text-charcoal"}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[11px] text-stone">
                        Add ₹{(2000 - subtotal).toLocaleString("en-IN")} more for free shipping
                      </p>
                    )}
                  </div>

                  <div className="border-t border-ivory-200 pt-4 flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-widest font-bold text-charcoal">Total</span>
                    <span className="font-serif text-2xl text-maroon font-bold">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone">
                    Taxes included. Secure checkout powered by SSL encryption.
                  </p>

                  <Button variant="primary" size="lg" className="w-full" asChild>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    {["Secure", "Authentic", "Returns"].map((t) => (
                      <span key={t} className="text-[10px] text-stone uppercase tracking-widest">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
