import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { ProductDetailClient } from "@/components/product/product-detail-client";
import { ProductGrid } from "@/components/product/product-grid";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.category}`,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Related products: same category, excluding current
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        {/* Breadcrumb */}
        <div className="pt-24 pb-6 px-4 bg-ivory-50 border-b border-ivory-200">
          <div className="section-container">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone">
              <Link href="/" className="hover:text-maroon transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/sarees" className="hover:text-maroon transition-colors">Sarees</Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={`/sarees?category=${encodeURIComponent(product.category)}`}
                className="hover:text-maroon transition-colors"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-charcoal font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-10 md:py-16 bg-ivory-50">
          <div className="section-container">
            <ProductDetailClient product={product} />
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <ProductGrid
            products={related}
            title="You May Also Like"
            eyebrow={`More ${product.category}`}
            showViewAll={true}
            viewAllHref={`/sarees?category=${encodeURIComponent(product.category)}`}
            columns={4}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
