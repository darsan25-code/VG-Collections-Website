import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { FooterNewsletter } from "./footer-newsletter";

// Clean inline SVG for WhatsApp matching Lucide's 16x16 icon style
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

const shopLinks = [
  { name: "Sarees", href: "/sarees" },
  { name: "New Arrivals", href: "/sarees?filter=new" },
  { name: "Collections", href: "/collections" },
  { name: "Best Sellers", href: "/sarees?filter=bestseller" },
  { name: "Bridal Collection", href: "/sarees?category=bridal" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Shipping & Returns", href: "/contact#shipping" },
  { name: "FAQ", href: "/contact#faq" },
  { name: "Privacy Policy", href: "/contact#privacy" },
  { name: "About Us", href: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-maroon-dark text-ivory-200" aria-label="Site footer">
      {/* Top Decorative Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="section-container py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">

          {/* 1. Brand Column */}
          <div className="space-y-5">
            <Link href="/" aria-label="VG Collections home" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="VG Collections"
                width={140}
                height={48}
                className="h-11 w-auto object-contain transition-opacity duration-200 hover:opacity-90"
              />
            </Link>
            <p className="text-sm font-light leading-relaxed text-ivory-300/80 max-w-xs">
              Weaving tradition into timeless luxury since decades. Experience the finest
              handpicked sarees, crafted with heritage and worn with pride.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 text-sm pt-1">
              <div className="flex items-start gap-3 text-ivory-300/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-gold/60" />
                <p className="leading-relaxed">
                  No.14/27, Thiruvalluvarpuram 2nd Street,<br />
                  2nd Floor, Choolaimedu,<br />
                  Chennai – 600094
                </p>
              </div>
              <div className="flex items-center gap-3 text-ivory-300/70">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold/60" />
                <a
                  href="tel:+919445826955"
                  className="hover:text-gold transition-colors"
                >
                  +91 94458 26955
                </a>
              </div>
              <div className="flex items-center gap-3 text-ivory-300/70">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold/60" />
                <a
                  href="mailto:geethaperumal1206@gmail.com"
                  className="hover:text-gold transition-colors break-all"
                >
                  geethaperumal1206@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons — Instagram & WhatsApp Only */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/vg_collections_trendy_sarees?stkn=b25sdHFvYmp0Z2Z6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VG Collections on Instagram"
                title="Follow us on Instagram"
                className="w-9 h-9 rounded-full border border-ivory-300/20 flex items-center justify-center text-ivory-300/70 hover:text-gold hover:border-gold/40 transition-all focus-visible:outline-gold"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919445826955"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact VG Collections on WhatsApp"
                title="Chat with us on WhatsApp"
                className="w-9 h-9 rounded-full border border-ivory-300/20 flex items-center justify-center text-ivory-300/70 hover:text-gold hover:border-gold/40 transition-all focus-visible:outline-gold"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. Shop Links */}
          <div className="space-y-5 sm:pt-2 lg:pt-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold/80">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-300/70 hover:text-gold transition-colors inline-block leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support Links */}
          <div className="space-y-5 sm:pt-2 lg:pt-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold/80">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory-300/70 hover:text-gold transition-colors inline-block leading-relaxed"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter & Trust Badges */}
          <div className="space-y-5 sm:pt-2 lg:pt-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold/80">
              Stay Connected
            </h4>
            <p className="text-sm text-ivory-300/70 leading-relaxed">
              Subscribe for exclusive collections, heritage stories, and special offers.
            </p>
            <FooterNewsletter />

            {/* Trust Badges */}
            <div className="pt-2 space-y-2">
              {["Free shipping on orders ₹2000+", "Easy 7-day returns", "Secure checkout"].map((badge) => (
                <p key={badge} className="text-[11px] text-ivory-300/50 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                  {badge}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory-300/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory-300/40">
          <p>
            © {new Date().getFullYear()} VG Collections. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact#privacy" className="hover:text-ivory-300/70 transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/contact#terms" className="hover:text-ivory-300/70 transition-colors">
              Terms
            </Link>
            <span>·</span>
            <p>Crafted with ♥ in Chennai</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
