import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Hero } from "@/components/home/hero";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { CategoryGrid } from "@/components/home/category-grid";
import { BridalBanner } from "@/components/home/bridal-banner";
import { Craftsmanship } from "@/components/home/craftsmanship";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { ContactSection } from "@/components/home/contact-section";
import { ProductGrid } from "@/components/product/product-grid";
import {
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
} from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VG Collections — Premium Sarees & Ethnic Wear | Chennai",
  description:
    "Discover timeless handwoven sarees at VG Collections, Chennai. Kanchipuram silk, Banarasi georgette, bridal collections and handloom sarees. Free shipping on orders above ₹2000.",
};

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main id="main-content" className="min-h-screen bg-ivory-100">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Featured Collections — Editorial */}
        <FeaturedCollections />

        {/* 3. Category Grid */}
        <CategoryGrid />

        {/* 4. New Arrivals */}
        <ProductGrid
          products={newArrivals}
          title="New Arrivals"
          eyebrow="Just In"
          viewAllHref="/sarees?filter=new"
          columns={4}
        />

        {/* 5. Craftsmanship / Heritage Banner */}
        <Craftsmanship />

        {/* 6. Best Sellers */}
        <ProductGrid
          products={bestSellers}
          title="Best Sellers"
          eyebrow="Most Loved"
          viewAllHref="/sarees?filter=bestseller"
          columns={4}
        />

        {/* 7. Bridal Collection Banner */}
        <BridalBanner />

        {/* 8. Why VG Collections */}
        <WhyUs />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. Newsletter */}
        <Newsletter />

        {/* 11. Contact */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
