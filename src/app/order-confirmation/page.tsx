"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, MapPin, Package } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

interface OrderData {
  orderId: string;
  items: Array<{
    product: { name: string; images: string[]; fabric: string; price: number };
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  form: {
    fullName: string;
    email: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    paymentMethod: string;
  };
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("vg-order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const paymentLabels: Record<string, string> = {
    cod: "Cash on Delivery",
    upi: "UPI Payment",
    card: "Card Payment",
  };

  const estimatedDelivery = () => {
    const d = new Date();
    d.setDate(d.getDate() + 6);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="pt-24 min-h-screen bg-ivory-100">
      <div className="section-container py-12 md:py-20 max-w-3xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold/30 flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-10 h-10 text-gold" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
              Order Confirmed
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-maroon mb-3">
              Thank You{order?.form.fullName ? `, ${order.form.fullName.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-stone text-base max-w-sm mx-auto leading-relaxed">
              Your order has been placed successfully. We will confirm it shortly
              via email and begin preparing your sarees with care.
            </p>

            {orderId && (
              <div className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-ivory-50 border border-ivory-200 rounded-sm">
                <span className="text-xs text-stone uppercase tracking-widest">Order ID</span>
                <span className="font-mono font-bold text-maroon text-sm">{orderId}</span>
              </div>
            )}
          </motion.div>
        </motion.div>

        {order ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            {/* Estimated Delivery */}
            <div className="bg-maroon text-ivory-50 rounded-sm p-5 flex items-start gap-4">
              <Package className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold-light font-bold mb-1">
                  Estimated Delivery
                </p>
                <p className="font-serif text-lg">{estimatedDelivery()}</p>
                <p className="text-ivory-200/70 text-xs mt-1">
                  Standard delivery 4–7 business days. You will receive a tracking link via email.
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-5">
              <h2 className="font-serif text-xl text-maroon mb-5">Items Ordered</h2>
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-14 h-[72px] relative rounded-sm overflow-hidden bg-ivory-200 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm text-maroon leading-snug">{item.product.name}</p>
                      <p className="text-xs text-stone mt-0.5">{item.product.fabric} · Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-charcoal text-sm flex-shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-5 pt-4 border-t border-ivory-200 space-y-2">
                <div className="flex justify-between text-sm text-stone">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-stone">
                  <span>Shipping</span>
                  <span className={order.shipping === 0 ? "text-gold-dark font-bold" : ""}>
                    {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-maroon text-base pt-2 border-t border-ivory-200">
                  <span>Total Paid</span>
                  <span>₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-maroon" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal">
                    Delivery Address
                  </h3>
                </div>
                <p className="text-sm text-charcoal-muted leading-relaxed">
                  {order.form.fullName}<br />
                  {order.form.address}<br />
                  {order.form.city}, {order.form.state} – {order.form.pincode}
                </p>
                <p className="text-sm text-stone mt-2">{order.form.mobile}</p>
              </div>

              <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag className="w-4 h-4 text-maroon" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal">
                    Payment
                  </h3>
                </div>
                <p className="text-sm text-charcoal-muted">
                  {paymentLabels[order.form.paymentMethod] || order.form.paymentMethod}
                </p>
                <p className="text-xs text-stone mt-2">
                  Confirmation sent to: {order.form.email}
                </p>
                <div className="mt-3 p-2 bg-gold/10 rounded-sm">
                  <p className="text-[11px] text-gold-dark">
                    Demo mode — no real payment was processed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-10">
            <p className="text-stone">Order details unavailable. Please check your email for confirmation.</p>
          </div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
        >
          <Button variant="primary" size="lg" asChild>
            <Link href="/sarees">
              <ShoppingBag className="mr-2 w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="pt-28 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-maroon border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <OrderConfirmationContent />
      </Suspense>
      <Footer />
    </>
  );
}
