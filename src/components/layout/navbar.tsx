"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { searchProducts, Product } from "@/lib/products";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Sarees", href: "/sarees" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();

  // Determine if on hero page (transparent nav)
  const isHeroPage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isSearchOpen]);

  // Search
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setSearchResults(searchProducts(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const isTransparent = isHeroPage && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isTransparent
            ? "bg-transparent py-5 text-ivory-50"
            : "bg-ivory-50/95 backdrop-blur-md shadow-sm py-4 text-charcoal border-b border-ivory-200"
        )}
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="relative flex-shrink-0"
            aria-label="VG Collections — Home"
          >
            <Image
              src="/images/logo.jpeg"
              alt="VG Collections"
              width={140}
              height={48}
              className={cn(
                "h-10 md:h-12 w-auto object-contain transition-all duration-300",
                isTransparent ? "brightness-0 invert" : ""
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  role="menuitem"
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200 relative group py-1",
                    isTransparent
                      ? "text-ivory-100 hover:text-gold-light"
                      : "text-charcoal hover:text-maroon",
                    isActive && !isTransparent && "text-maroon"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              aria-label="Open search"
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "p-1.5 transition-colors duration-200 hover:text-gold",
                isTransparent ? "text-ivory-100" : "text-charcoal-muted"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label={`Shopping cart, ${itemCount} items`}
              onClick={toggleCart}
              className={cn(
                "relative p-1.5 transition-colors duration-200 hover:text-gold",
                isTransparent ? "text-ivory-100" : "text-charcoal-muted"
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="cart-count"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-maroon text-ivory-50 text-[9px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center leading-none"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "p-1.5 transition-colors",
                isTransparent ? "text-ivory-100" : "text-charcoal-muted"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label={`Cart, ${itemCount} items`}
              onClick={toggleCart}
              className={cn(
                "relative p-1.5 transition-colors",
                isTransparent ? "text-ivory-100" : "text-charcoal-muted"
              )}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-maroon text-ivory-50 text-[9px] font-bold min-w-[16px] min-h-[16px] rounded-full flex items-center justify-center leading-none px-0.5">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-1.5 transition-colors",
                isTransparent ? "text-ivory-100" : "text-charcoal"
              )}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-ivory-50 z-50 md:hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-ivory-200">
                <Image
                  src="/images/logo.jpeg"
                  alt="VG Collections"
                  width={120}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-charcoal-muted hover:text-maroon transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-5">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between py-4 text-base font-bold uppercase tracking-[0.1em] border-b border-ivory-200 transition-colors",
                            isActive ? "text-maroon" : "text-charcoal hover:text-maroon"
                          )}
                        >
                          {link.name}
                          <ChevronRight className="w-4 h-4 text-gold" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-5 border-t border-ivory-200 text-xs text-stone text-center">
                © {new Date().getFullYear()} VG Collections, Chennai
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-charcoal/80 backdrop-blur-sm flex flex-col"
          >
            {/* Search Bar */}
            <div className="bg-ivory-50 px-4 md:px-8 py-6 shadow-lg">
              <div className="section-container flex items-center gap-4">
                <Search className="w-5 h-5 text-gold flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search sarees, fabrics, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-charcoal text-lg placeholder:text-stone/60 outline-none font-sans"
                  aria-label="Search products"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                  className="p-2 text-charcoal-muted hover:text-maroon transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto">
              <div className="section-container py-6 max-w-3xl">
                {searchQuery.trim().length < 2 ? (
                  <div className="text-center py-16">
                    <p className="text-ivory-200/60 font-sans text-sm uppercase tracking-widest">
                      Start typing to search
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                      {["Kanchipuram", "Banarasi", "Cotton", "Bridal", "Silk"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-4 py-2 bg-ivory-50/10 text-ivory-200 text-xs uppercase tracking-widest border border-ivory-200/20 hover:bg-ivory-50/20 transition-colors rounded-sm"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-ivory-200/80 font-sans">
                      No results found for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                    </p>
                    <p className="text-ivory-200/50 text-sm mt-2">
                      Try searching by fabric, category, or collection name.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-ivory-200/50 text-xs uppercase tracking-widest mb-4">
                      {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                    </p>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/sarees/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-4 bg-ivory-50/8 hover:bg-ivory-50/15 rounded-sm transition-colors group"
                      >
                        <div className="w-12 h-16 bg-ivory-200/20 rounded-sm overflow-hidden flex-shrink-0 relative">
                          {/* Tiny image preview */}
                          <div className="w-full h-full bg-gradient-to-b from-ivory-200/30 to-ivory-300/30 flex items-center justify-center">
                            <span className="text-ivory-200/40 text-[8px] font-bold uppercase tracking-wider text-center leading-tight px-1">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-ivory-50 font-serif text-base group-hover:text-gold-light transition-colors truncate">
                            {product.name}
                          </p>
                          <p className="text-ivory-200/60 text-xs mt-0.5">
                            {product.category} · {product.fabric}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-gold-light font-bold text-sm">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
