"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CreditCard, Smartphone, Banknote, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentMethod = "cod" | "upi" | "card";

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: PaymentMethod;
  upiId: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    fullName: "", mobile: "", email: "", address: "",
    city: "", state: "", pincode: "", paymentMethod: "cod", upiId: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.mobile.match(/^[6-9]\d{9}$/)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "Please select a state";
    if (!form.pincode.match(/^\d{6}$/)) newErrors.pincode = "Enter a valid 6-digit pincode";
    if (form.paymentMethod === "upi" && !form.upiId.includes("@")) {
      newErrors.upiId = "Enter a valid UPI ID (e.g., name@upi)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    // Simulate order processing
    // TODO: Connect to backend order API / payment gateway (Razorpay / PayU)
    await new Promise((r) => setTimeout(r, 1500));

    const orderId = `VGC-${Date.now().toString(36).toUpperCase()}`;
    sessionStorage.setItem(
      "vg-order",
      JSON.stringify({ orderId, items, subtotal, shipping, total, form })
    );
    clearCart();
    router.push(`/order-confirmation?id=${orderId}`);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass = (field: keyof FormData) =>
    cn(
      "w-full px-4 py-3 rounded-sm border text-charcoal text-sm bg-white outline-none transition-colors",
      errors[field]
        ? "border-rose-muted focus:border-rose-muted"
        : "border-ivory-300 focus:border-maroon"
    );

  const labelClass = "text-xs font-bold uppercase tracking-[0.1em] text-charcoal-muted block mb-1.5";

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-ivory-100 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="font-serif text-2xl text-maroon mb-4">Your cart is empty</p>
            <Button variant="primary" size="lg" asChild>
              <Link href="/sarees">Shop Sarees</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-ivory-100">
        <div className="section-container py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-stone mb-8" aria-label="Checkout steps">
            <Link href="/cart" className="hover:text-maroon transition-colors">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-maroon font-bold">Checkout</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Contact Details */}
              <section>
                <h2 className="font-serif text-2xl text-maroon mb-6">Contact Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label htmlFor="fullName" className={labelClass}>Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="As on official documents"
                      className={inputClass("fullName")}
                      autoComplete="name"
                    />
                    {errors.fullName && <ErrorMsg msg={errors.fullName} />}
                  </div>
                  <div>
                    <label htmlFor="mobile" className={labelClass}>Mobile Number</label>
                    <input
                      id="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={(e) => updateField("mobile", e.target.value)}
                      placeholder="10-digit mobile number"
                      className={inputClass("mobile")}
                      autoComplete="tel"
                      maxLength={10}
                    />
                    {errors.mobile && <ErrorMsg msg={errors.mobile} />}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="For order confirmation"
                      className={inputClass("email")}
                      autoComplete="email"
                    />
                    {errors.email && <ErrorMsg msg={errors.email} />}
                  </div>
                </div>
              </section>

              {/* Delivery Address */}
              <section>
                <h2 className="font-serif text-2xl text-maroon mb-6">Delivery Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className={labelClass}>Address</label>
                    <textarea
                      id="address"
                      rows={2}
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="House/Flat number, Street, Area"
                      className={cn(inputClass("address"), "resize-none")}
                      autoComplete="street-address"
                    />
                    {errors.address && <ErrorMsg msg={errors.address} />}
                  </div>
                  <div>
                    <label htmlFor="city" className={labelClass}>City</label>
                    <input
                      id="city"
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="City"
                      className={inputClass("city")}
                      autoComplete="address-level2"
                    />
                    {errors.city && <ErrorMsg msg={errors.city} />}
                  </div>
                  <div>
                    <label htmlFor="pincode" className={labelClass}>Pincode</label>
                    <input
                      id="pincode"
                      type="text"
                      value={form.pincode}
                      onChange={(e) => updateField("pincode", e.target.value)}
                      placeholder="6-digit pincode"
                      className={inputClass("pincode")}
                      maxLength={6}
                      autoComplete="postal-code"
                    />
                    {errors.pincode && <ErrorMsg msg={errors.pincode} />}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="state" className={labelClass}>State</label>
                    <select
                      id="state"
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      className={cn(inputClass("state"), "cursor-pointer")}
                      autoComplete="address-level1"
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <ErrorMsg msg={errors.state} />}
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h2 className="font-serif text-2xl text-maroon mb-6">Payment Method</h2>

                {/* Payment Notice */}
                <div className="flex items-start gap-3 p-4 bg-gold/10 border border-gold/30 rounded-sm mb-6">
                  <AlertCircle className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    <strong>Demo mode:</strong> This is a frontend prototype. No actual payment will be processed.
                    Payment gateway integration (Razorpay/PayU) can be connected at the marked integration point.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "cod" as PaymentMethod,
                      icon: Banknote,
                      label: "Cash on Delivery",
                      desc: "Pay when your order arrives",
                    },
                    {
                      id: "upi" as PaymentMethod,
                      icon: Smartphone,
                      label: "UPI / Google Pay / PhonePe",
                      desc: "Pay instantly with any UPI app",
                    },
                    {
                      id: "card" as PaymentMethod,
                      icon: CreditCard,
                      label: "Credit / Debit Card",
                      desc: "Visa, Mastercard, RuPay accepted",
                    },
                  ].map(({ id, icon: Icon, label, desc }) => (
                    <label
                      key={id}
                      className={cn(
                        "flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all",
                        form.paymentMethod === id
                          ? "border-maroon bg-maroon/5"
                          : "border-ivory-200 bg-white hover:border-ivory-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={id}
                        checked={form.paymentMethod === id}
                        onChange={() => updateField("paymentMethod", id)}
                        className="accent-maroon w-4 h-4 flex-shrink-0"
                      />
                      <Icon className={cn("w-5 h-5 flex-shrink-0", form.paymentMethod === id ? "text-maroon" : "text-stone")} />
                      <div>
                        <p className="text-sm font-bold text-charcoal">{label}</p>
                        <p className="text-xs text-stone">{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* UPI ID Field */}
                {form.paymentMethod === "upi" && (
                  <div className="mt-4">
                    <label htmlFor="upiId" className={labelClass}>UPI ID</label>
                    <input
                      id="upiId"
                      type="text"
                      value={form.upiId}
                      onChange={(e) => updateField("upiId", e.target.value)}
                      placeholder="yourname@okaxis / yourname@upi"
                      className={inputClass("upiId")}
                    />
                    {errors.upiId && <ErrorMsg msg={errors.upiId} />}
                    {/* TODO: Integrate Razorpay/PayU UPI payment here */}
                    <p className="text-xs text-stone mt-2">
                      {/* Integration point: Razorpay Order API → Payment link → Verify webhook */}
                      UPI payment gateway integration ready — connect Razorpay credentials to activate.
                    </p>
                  </div>
                )}

                {form.paymentMethod === "card" && (
                  <div className="mt-4 p-4 bg-ivory-50 border border-ivory-200 rounded-sm">
                    <p className="text-xs text-stone">
                      {/* TODO: Embed Razorpay/Stripe card fields here */}
                      Card payment gateway integration ready — connect payment provider credentials to activate.
                    </p>
                  </div>
                )}
              </section>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="xl"
                loading={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Placing Order..." : `Place Order — ₹${total.toLocaleString("en-IN")}`}
              </Button>

              <p className="text-center text-xs text-stone">
                By placing your order, you agree to our{" "}
                <Link href="/contact#terms" className="underline hover:text-maroon">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/contact#privacy" className="underline hover:text-maroon">
                  Privacy Policy
                </Link>.
              </p>
            </form>

            {/* Order Summary Sidebar */}
            <aside>
              <div className="bg-ivory-50 border border-ivory-200 rounded-sm p-6 sticky top-28 space-y-5">
                <h2 className="font-serif text-xl text-maroon">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto no-scrollbar">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-3">
                      <div className="w-14 h-18 relative rounded-sm overflow-hidden bg-ivory-200 flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-maroon text-ivory-50 text-[9px] font-bold rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-charcoal font-semibold leading-snug truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-stone">{item.product.fabric}</p>
                      </div>
                      <p className="text-xs font-bold text-charcoal flex-shrink-0">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t border-ivory-200 text-sm">
                  <div className="flex justify-between text-stone">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-stone">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-gold-dark font-bold" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-maroon text-base pt-2 border-t border-ivory-200">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="space-y-1.5">
                  {[
                    "256-bit SSL Encryption",
                    "Authentic products guaranteed",
                    "Easy 7-day returns",
                  ].map((t) => (
                    <p key={t} className="text-[11px] text-stone flex items-center gap-2">
                      <Check className="w-3 h-3 text-gold flex-shrink-0" />
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <p className="text-xs text-rose-muted mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {msg}
    </p>
  );
}
