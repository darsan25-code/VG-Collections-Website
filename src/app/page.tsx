import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/home/hero";
import { ProductGrid } from "@/components/product/product-grid";
import { Footer } from "@/components/layout/footer";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-ivory-100 selection:bg-maroon selection:text-ivory-50">
      <Navbar />
      <Hero />
      <ProductGrid />

      {/* About / Heritage Section */}
      <section className="py-24 bg-maroon text-ivory-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-6">A Legacy of Weaving</h2>
          <p className="max-w-2xl mx-auto text-lg font-light leading-relaxed opacity-90">
            For over three decades, VG Collections has been synonymous with purity, tradition, and artistry.
            Each saree is a masterpiece, handwoven by master artisans who breathe life into every thread.
          </p>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
