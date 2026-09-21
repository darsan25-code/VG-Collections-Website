import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-ivory-100 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Large 404 */}
          <p className="font-serif text-[120px] md:text-[180px] leading-none text-maroon/8 select-none font-bold">
            404
          </p>
          <div className="-mt-8 md:-mt-12 relative z-10 space-y-4">
            <p className="text-xs text-gold-dark uppercase tracking-[0.3em] font-bold">
              Page Not Found
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-maroon">
              This Page Has Been Draped Away
            </h1>
            <div className="gold-line" />
            <p className="text-stone text-base leading-relaxed max-w-sm mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s take you back to our beautiful collection.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button variant="primary" size="lg" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sarees">Browse Sarees</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
