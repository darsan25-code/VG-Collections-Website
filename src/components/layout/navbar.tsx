"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-serif",
                isScrolled
                    ? "bg-[#FCFBF8] shadow-md py-4 text-gray-900"
                    : "bg-transparent py-6 text-white drop-shadow-md"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative w-auto h-12 md:h-16 flex items-center">
                    <img
                        src="/images/logo.png"
                        alt="VG Collections"
                        className="h-9 md:h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-gold transition-colors duration-200 uppercase tracking-widest relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className="hover:text-gold transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="relative hover:text-gold transition-colors">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-2 -right-2 bg-maroon text-ivory-100 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-ivory-100 text-maroon border-t border-maroon/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium hover:text-gold transiton-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-4 pt-4 border-t border-maroon/10">
                                <button className="flex items-center space-x-2 text-sm font-medium hover:text-gold">
                                    <Search className="w-4 h-4" /> <span>Search</span>
                                </button>
                                <button className="flex items-center space-x-2 text-sm font-medium hover:text-gold">
                                    <ShoppingBag className="w-4 h-4" /> <span>Cart (0)</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
