"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email/form service
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-24 bg-ivory-100" id="contact" aria-label="Contact us">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold mb-3">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-maroon mb-4">
            Visit Our Store
          </h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-7 border-l-4 border-l-gold">
              <h3 className="font-serif text-2xl text-maroon mb-6">VG Collections</h3>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    content: (
                      <p className="text-charcoal-muted text-sm leading-relaxed">
                        No.14/27, Thiruvalluvarpuram 2nd Street,<br />
                        2nd Floor, Choolaimedu,<br />
                        Chennai – 600094
                      </p>
                    ),
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    content: (
                      <a
                        href="tel:+919445826955"
                        className="text-charcoal-muted text-sm hover:text-gold-dark transition-colors"
                      >
                        +91 94458 26955
                      </a>
                    ),
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    content: (
                      <a
                        href="mailto:geethaperumal1206@gmail.com"
                        className="text-charcoal-muted text-sm hover:text-gold-dark transition-colors break-all"
                      >
                        geethaperumal1206@gmail.com
                      </a>
                    ),
                  },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-maroon/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-maroon" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-charcoal mb-1">
                        {label}
                      </p>
                      {content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Store Hours */}
            <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal mb-4">
                Store Hours
              </h4>
              <div className="space-y-2 text-sm">
                {[
                  ["Monday – Saturday", "10:00 AM – 8:00 PM"],
                  ["Sunday", "11:00 AM – 6:00 PM"],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-stone">{day}</span>
                    <span className="text-charcoal font-semibold">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-ivory-50 border border-ivory-200 rounded-sm p-7 md:p-10"
          >
            <h3 className="font-serif text-2xl text-maroon mb-2">Send Us a Message</h3>
            <p className="text-stone text-sm mb-7">
              Whether you have a question, need styling advice, or want to book a bridal
              consultation — we&apos;re here.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle className="w-12 h-12 text-gold" />
                <h4 className="font-serif text-xl text-maroon">Message Sent!</h4>
                <p className="text-stone text-sm">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-charcoal-muted">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-sm bg-white border border-ivory-300 focus:border-maroon outline-none transition-colors text-charcoal text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-widest text-charcoal-muted">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 rounded-sm bg-white border border-ivory-300 focus:border-maroon outline-none transition-colors text-charcoal text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-charcoal-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-sm bg-white border border-ivory-300 focus:border-maroon outline-none transition-colors text-charcoal text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-charcoal-muted">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-sm bg-white border border-ivory-300 focus:border-maroon outline-none transition-colors text-charcoal text-sm resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  <Send className="mr-2 w-4 h-4" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
