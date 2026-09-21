import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { SAREE_PLACEHOLDERS } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story of VG Collections — a Chennai-based premium saree boutique with over three decades of heritage, craftsmanship, and passion for Indian textiles.",
};

const team = [
  {
    name: "Geetha Perumal",
    role: "Founder & Creative Director",
    image: SAREE_PLACEHOLDERS.founderAvatar,
    bio: "With a lifelong passion for Indian textiles, Geetha founded VG Collections to bring the finest handwoven sarees to discerning customers across India.",
  },
];

const milestones = [
  { year: "1993", event: "Founded in Choolaimedu, Chennai" },
  { year: "2002", event: "Expanded to bridal and wedding collections" },
  { year: "2012", event: "Partnered with 50+ master weavers across South India" },
  { year: "2020", event: "Launched national delivery service" },
  { year: "2024", event: "Launched premium online boutique" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Craft",
    desc: "Every saree is chosen with love — personally inspected for quality, authenticity, and beauty.",
  },
  {
    icon: Users,
    title: "Weaver Partnerships",
    desc: "We work directly with over 200 artisan families, ensuring fair wages and preserving traditional techniques.",
  },
  {
    icon: Star,
    title: "Uncompromising Quality",
    desc: "Only the finest fabrics make it to our collection. We test every piece before it reaches your door.",
  },
  {
    icon: Leaf,
    title: "Sustainable Heritage",
    desc: "We champion eco-conscious practices and support weaving communities that protect India's natural dyeing traditions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main id="main-content">
        {/* Hero */}
        <div className="relative bg-maroon-dark pt-28 pb-16 overflow-hidden">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent absolute bottom-0 left-0 right-0" />
          <div className="section-container text-center relative z-10">
            <p className="text-gold text-xs uppercase tracking-[0.35em] font-bold mb-3">
              Our Story
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-ivory-50 mb-4">
              About VG Collections
            </h1>
            <p className="text-ivory-200/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Three decades of passion, craftsmanship, and an unwavering love for India&apos;s
              most magnificent textile tradition.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-ivory-50">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="relative">
                <div className="aspect-[4/5] relative rounded-sm overflow-hidden">
                  <Image
                    src={SAREE_PLACEHOLDERS.aboutStory}
                    alt="Handwoven saree craftsmanship"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
                {/* Decorative borders */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold/40 hidden md:block" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold/40 hidden md:block" />
              </div>
              <div className="space-y-6">
                <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold">
                  Est. 1993 · Chennai
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-maroon leading-tight">
                  Born from a Love<br />for Indian Textiles
                </h2>
                <div className="w-10 h-px bg-gold" />
                <p className="text-stone text-base leading-relaxed">
                  VG Collections was founded in 1993 by Geetha Perumal in the heart of
                  Chennai&apos;s Choolaimedu neighbourhood. What began as a small curated boutique
                  with a handful of Kanchipuram silks has grown into one of Chennai&apos;s most
                  trusted names for premium sarees and ethnic wear.
                </p>
                <p className="text-stone text-base leading-relaxed">
                  Our philosophy is simple: every saree we sell must be something we would
                  proudly give to our own family. We travel across Tamil Nadu, Varanasi,
                  Gujarat, and Rajasthan to handpick pieces directly from master weavers —
                  ensuring that each saree tells a story of authentic craft.
                </p>
                <p className="text-stone text-base leading-relaxed">
                  Today, we are honoured to serve customers across India, helping them find
                  sarees for their most cherished moments — from everyday elegance to once-in-a-
                  lifetime bridal celebrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-ivory-100">
          <div className="section-container">
            <div className="text-center mb-12">
              <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
                What We Stand For
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-4">Our Values</h2>
              <div className="gold-line" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-ivory-50 border border-ivory-200 rounded-sm p-7 flex gap-5 hover:border-gold/30 transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-full bg-maroon/8 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-maroon" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-maroon mb-2">{title}</h3>
                    <p className="text-stone text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-20 bg-maroon-dark">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="section-container pt-16">
            <div className="text-center mb-12">
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-3">
                Our Journey
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-ivory-50 mb-4">
                Three Decades of Excellence
              </h2>
              <div className="gold-line" />
            </div>
            <div className="relative max-w-2xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-16 top-0 bottom-0 w-px bg-gold/20 hidden md:block" />
              <div className="space-y-8">
                {milestones.map(({ year, event }) => (
                  <div key={year} className="flex items-start gap-6 md:gap-10">
                    <div className="flex-shrink-0 w-14 text-right">
                      <span className="font-serif text-gold font-bold text-base">{year}</span>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-4 flex-shrink-0 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-gold border-2 border-maroon-dark" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-ivory-200/80 text-sm leading-relaxed">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-16" />
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-ivory-50 text-center">
          <div className="section-container max-w-xl">
            <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
              Ready to Shop?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-maroon mb-4">
              Find Your Perfect Saree
            </h2>
            <p className="text-stone mb-8">
              Explore our full collection of handpicked sarees — from everyday elegance to
              bridal masterpieces.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/sarees">
                  Shop Sarees
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
