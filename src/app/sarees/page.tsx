import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SareeShop } from "@/components/product/saree-shop";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sarees Collection",
  description:
    "Browse our premium collection of handwoven sarees — Kanchipuram silk, Banarasi georgette, bridal, handloom, cotton and more. Filter by category, fabric, and price.",
};

function ShopFallback() {
  return (
    <div className="flex gap-8">
      <div className="hidden lg:block w-60 flex-shrink-0">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-ivory-200 rounded" />
          ))}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] bg-ivory-200 rounded-sm mb-4" />
            <div className="h-3 bg-ivory-200 rounded mb-2" />
            <div className="h-4 bg-ivory-200 rounded mb-2" />
            <div className="h-4 bg-ivory-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SareesPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        {/* Page Header */}
        <div className="bg-maroon-dark pt-28 pb-12 md:pb-16 px-4 text-center relative overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent absolute bottom-0 left-0 right-0" />
          <div className="relative z-10">
            <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-3">
              Our Collection
            </p>
            <h1 className="font-serif text-3xl md:text-5xl text-ivory-50 mb-3">
              Sarees
            </h1>
            <p className="text-ivory-200/60 text-sm max-w-md mx-auto">
              Handpicked sarees from master weavers across India — each piece a work of art.
            </p>
          </div>
        </div>

        {/* Shop */}
        <div className="bg-ivory-100 py-10 md:py-14">
          <div className="section-container">
            <Suspense fallback={<ShopFallback />}>
              <SareeShop />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
