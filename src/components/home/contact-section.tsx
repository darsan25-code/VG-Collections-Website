"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export function ContactSection() {
    return (
        <section className="py-24 bg-[#f8f6f2]">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-dark text-sm uppercase tracking-[0.2em] block mb-2">Get in Touch</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 font-bold">Visit Our Store</h2>
                    <div className="w-24 h-1 bg-gold mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gold">
                            <h3 className="font-serif text-2xl text-gray-900 mb-6 font-bold">VG Collection</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-maroon/10 p-3 rounded-full text-maroon">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Address</p>
                                        <p className="text-gray-700 leading-relaxed font-medium">
                                            No.14/27, Thiruvalluvarpuram 2nd Street,<br />
                                            2nd Floor, Choolaimedu,<br />
                                            Chennai – 600094
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-maroon/10 p-3 rounded-full text-maroon">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Phone</p>
                                        <a href="tel:9445826955" className="text-gray-700 font-medium hover:text-gold transition-colors">
                                            +91 94458 26955
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-maroon/10 p-3 rounded-full text-maroon">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Email</p>
                                        <a href="mailto:geethaperumal1206@gmail.com" className="text-gray-700 font-medium hover:text-gold transition-colors">
                                            geethaperumal1206@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100"
                    >
                        <h3 className="font-serif text-2xl text-gray-900 mb-2 font-bold">Send us a Message</h3>
                        <p className="text-gray-600 mb-8 text-sm">We'd love to hear from you. Fill out the form below.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-gray-900">Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none text-gray-900" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-bold text-gray-900">Phone</label>
                                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none text-gray-900" placeholder="Your Phone" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-gray-900">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none text-gray-900" placeholder="Your Email" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-gray-900">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-md bg-white border border-gray-300 focus:border-gold focus:ring-1 focus:ring-gold transition-all outline-none text-gray-900" placeholder="How can we help you?"></textarea>
                            </div>

                            <Button className="w-full" size="lg">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
