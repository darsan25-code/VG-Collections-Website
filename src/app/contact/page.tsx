import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { ContactSection } from "@/components/home/contact-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with VG Collections. Visit our store in Choolaimedu, Chennai, or send us a message. We're happy to help with saree selection and bridal consultations.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main id="main-content">
        {/* Header */}
        <div className="bg-maroon-dark pt-28 pb-14 text-center relative">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent absolute bottom-0 left-0 right-0" />
          <div className="section-container relative z-10">
            <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-3">
              We&apos;d Love to Hear From You
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-ivory-50 mb-4">
              Contact Us
            </h1>
            <p className="text-ivory-200/60 text-sm md:text-base max-w-md mx-auto">
              Visit our store, call us, or send a message. Our saree specialists are
              here to guide you.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <ContactSection />

        {/* Map placeholder */}
        <section className="bg-ivory-200/60 py-12" aria-label="Store location">
          <div className="section-container text-center">
            <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
              Find Us
            </p>
            <h2 className="font-serif text-2xl text-maroon mb-2">Visit Our Store</h2>
            <p className="text-stone text-sm mb-6">
              No.14/27, Thiruvalluvarpuram 2nd Street, 2nd Floor, Choolaimedu, Chennai – 600094
            </p>
            <a
              href="https://maps.google.com/?q=Choolaimedu+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-maroon text-maroon text-xs font-bold uppercase tracking-widest hover:bg-maroon hover:text-ivory-50 transition-colors rounded-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
