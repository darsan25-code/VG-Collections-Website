import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-maroon-dark text-ivory-200">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <img src="/images/logo.png" alt="VG Collections" className="h-12 w-auto brightness-0 invert opacity-90" />
                        </Link>
                        <p className="text-sm font-light opacity-80 leading-relaxed max-w-xs">
                            Weaving tradition into timeless luxury. Experience the finest silk sarees and ethnic wear.
                        </p>
                        <div className="space-y-2 text-sm opacity-80">
                            <p>No.14/27, Thiruvalluvarpuram 2nd Street,</p>
                            <p>2nd Floor, Choolaimedu, Chennai – 600094</p>
                            <p><a href="tel:9445826955" className="hover:text-gold transition-colors">+91 94458 26955</a></p>
                            <p><a href="mailto:geethaperumal1206@gmail.com" className="hover:text-gold transition-colors">geethaperumal1206@gmail.com</a></p>
                        </div>
                        <div className="flex space-x-4 pt-2">
                            <Link href="#" className="hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></Link>
                            <Link href="#" className="hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></Link>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif text-ivory-50">Explore</h4>
                        <ul className="space-y-2 text-sm font-light">
                            <li><Link href="/new-arrivals" className="hover:text-gold transition-colors">New Arrivals</Link></li>
                            <li><Link href="/best-sellers" className="hover:text-gold transition-colors">Best Sellers</Link></li>
                            <li><Link href="/wedding-collection" className="hover:text-gold transition-colors">Wedding Collection</Link></li>
                            <li><Link href="/gift-cards" className="hover:text-gold transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif text-ivory-50">Support</h4>
                        <ul className="space-y-2 text-sm font-light">
                            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-gold transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
                            <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-serif text-ivory-50">Stay Connected</h4>
                        <p className="text-sm font-light opacity-80">
                            Subscribe to receive updates, access to exclusive deals, and more.
                        </p>
                        <form className="flex flex-col space-y-3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-maroon/20 border border-maroon-light focus:border-gold rounded-sm py-2 pl-10 pr-4 text-sm outline-none transition-colors"
                                />
                            </div>
                            <Button size="sm" variant="secondary" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-maroon-light/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
                    <p>&copy; {new Date().getFullYear()} VG Collections. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed & Built for Luxury.</p>
                </div>
            </div>
        </footer>
    );
}
