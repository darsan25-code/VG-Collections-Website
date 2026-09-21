"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES, Product, ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "New Arrivals", value: "new" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Sellers", value: "bestseller" },
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
  { label: "₹15,000 – ₹30,000", min: 15000, max: 30000 },
  { label: "Above ₹30,000", min: 30000, max: Infinity },
];

export function SareeShop() {
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  // Read URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    const filter = searchParams.get("filter");
    if (cat) {
      setSelectedCategories([cat as ProductCategory]);
    }
    if (filter === "new") setSortBy("new");
    if (filter === "bestseller") setSortBy("bestseller");
  }, [searchParams]);

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(PRICE_RANGES[0]);
    setSortBy("featured");
  };

  const filteredAndSorted = useMemo(() => {
    let results = [...PRODUCTS];

    // Filter by category
    if (selectedCategories.length > 0) {
      results = results.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price
    results = results.filter(
      (p) =>
        p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
    );

    // Sort
    switch (sortBy) {
      case "new":
        results = results.filter((p) => p.newArrival).concat(results.filter((p) => !p.newArrival));
        break;
      case "bestseller":
        results = results.filter((p) => p.bestSeller).concat(results.filter((p) => !p.bestSeller));
        break;
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      default:
        results = results.filter((p) => p.featured).concat(results.filter((p) => !p.featured));
    }

    return results;
  }, [selectedCategories, selectedPriceRange, sortBy]);

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPriceRange !== PRICE_RANGES[0];

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-maroon mb-4">
          Category
        </h3>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 accent-maroon rounded-sm"
              />
              <span
                className={cn(
                  "text-sm transition-colors",
                  selectedCategories.includes(cat)
                    ? "text-maroon font-semibold"
                    : "text-charcoal-muted group-hover:text-maroon"
                )}
              >
                {cat}
              </span>
              <span className="ml-auto text-xs text-stone">
                ({PRODUCTS.filter((p) => p.category === cat).length})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-maroon mb-4">
          Price Range
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="price-range"
                checked={selectedPriceRange === range}
                onChange={() => setSelectedPriceRange(range)}
                className="w-4 h-4 accent-maroon"
              />
              <span
                className={cn(
                  "text-sm transition-colors",
                  selectedPriceRange === range
                    ? "text-maroon font-semibold"
                    : "text-charcoal-muted group-hover:text-maroon"
                )}
              >
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-stone hover:text-maroon underline underline-offset-2 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters — Desktop */}
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-charcoal">
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-maroon hover:text-gold-dark transition-colors font-bold"
              >
                Clear
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-ivory-300 text-xs font-bold uppercase tracking-widest text-charcoal hover:border-maroon hover:text-maroon transition-colors rounded-sm"
            aria-label="Open filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-4 h-4 bg-maroon text-ivory-50 text-[9px] rounded-full flex items-center justify-center">
                {selectedCategories.length + (selectedPriceRange !== PRICE_RANGES[0] ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Product Count */}
          <p className="text-sm text-stone hidden sm:block">
            {filteredAndSorted.length} product{filteredAndSorted.length !== 1 ? "s" : ""}
          </p>

          {/* Sort */}
          <div className="relative ml-auto">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-ivory-300 text-xs font-bold uppercase tracking-widest text-charcoal hover:border-maroon transition-colors rounded-sm"
            >
              {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", sortOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-44 bg-ivory-50 border border-ivory-200 shadow-card rounded-sm z-30 overflow-hidden"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-3 text-xs font-medium hover:bg-ivory-100 transition-colors",
                        sortBy === opt.value ? "text-maroon font-bold bg-ivory-200/50" : "text-charcoal"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-maroon/8 text-maroon text-xs font-bold uppercase tracking-widest rounded-sm"
              >
                {cat}
                <button
                  onClick={() => toggleCategory(cat)}
                  aria-label={`Remove ${cat} filter`}
                  className="hover:text-maroon-dark"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedPriceRange !== PRICE_RANGES[0] && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-maroon/8 text-maroon text-xs font-bold uppercase tracking-widest rounded-sm">
                {selectedPriceRange.label}
                <button
                  onClick={() => setSelectedPriceRange(PRICE_RANGES[0])}
                  aria-label="Remove price filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-maroon mb-3">No sarees found</p>
            <p className="text-stone text-sm mb-6">
              Try adjusting your filters to discover more collections.
            </p>
            <Button variant="outline" size="md" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filteredAndSorted.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 bg-ivory-50 rounded-t-2xl z-50 max-h-[80vh] overflow-y-auto lg:hidden"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-maroon">Filters</h2>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    aria-label="Close filters"
                    className="p-2 text-charcoal-muted hover:text-maroon transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterContent />
                <div className="mt-8 pb-safe">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setFiltersOpen(false)}
                  >
                    Apply Filters ({filteredAndSorted.length} products)
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
