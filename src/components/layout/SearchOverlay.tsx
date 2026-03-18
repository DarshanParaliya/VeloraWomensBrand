import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { Product } from "@shared/schema";
import { useProducts } from "@/hooks/use-products";
import { useLocation } from "wouter";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Static suggestion lists ────────────────────────────────────────────────
// Items under "Trending" should match product titles (→ /product/:id) or
// category names (→ /shop?category=). The component resolves the destination
// at click-time using the live products list.
const SEARCH_SUGGESTIONS = {
  Trending: ["Oversized Tees", "Velora Special", "Summer Collection"],
  Categories: ["Hoodies", "Cargo Pants", "Streetwear"],
};

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [showInlineResults, setShowInlineResults] = useState(false);
  const { data: products = [] } = useProducts();
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  // ── Navigation helpers ─────────────────────────────────────────────────────

  /** Navigate directly to a specific product's detail page. */
  const navigateToProduct = (product: Product) => {
    navigate(`/product/${product.id}`);
    onClose();
  };

  /**
   * Navigate to:
   *  - /product/:id  — if the term matches exactly ONE product title
   *  - /shop?category=… — if the term matches a known category name
   *  - /shop?query=… — fallback (generic search)
   */
  const navigateToTerm = (term: string) => {
    if (!term.trim()) return;
    const t = term.trim();

    // 1. Exact product-title match (case-insensitive) → product detail page
    const exactProduct = products.find(
      (p) => p.title.toLowerCase() === t.toLowerCase(),
    );
    if (exactProduct) {
      navigate(`/product/${exactProduct.id}`);
      onClose();
      return;
    }

    // 2. Category match → product listing page filtered by category
    const categoryMatch = products.find(
      (p) => p.category.toLowerCase() === t.toLowerCase(),
    );
    if (categoryMatch) {
      navigate(`/shop?category=${encodeURIComponent(categoryMatch.category)}`);
      onClose();
      return;
    }

    // 3. Generic search → shop with query param
    navigate(`/shop?query=${encodeURIComponent(t)}`);
    onClose();
  };

  /**
   * Dedicated handler for the static "Categories" suggestions.
   * Always redirects to /shop?category=… (shop all filtered by category).
   */
  const navigateToCategory = (category: string) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
    onClose();
  };

  // ── Filter live products by current search query ──────────────────────────
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.vendor.toLowerCase().includes(query.toLowerCase()),
  );

  // ── Auto-focus input when opened ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setShowInlineResults(false);
    }
  }, [isOpen]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && query.trim() !== "") {
        navigateToTerm(query);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, query, products]); // products in deps so the helper sees fresh data

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="search-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <motion.div
        key="search-panel"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/97 backdrop-blur-2xl text-[#F5F5F5] font-sans shadow-2xl"
        style={{ height: "60vh" }}
      >
        <div className="flex flex-col h-full">
          {/* ── Search Input Row ──────────────────────────────────────── */}
          <div className="container mx-auto px-8 pt-8 pb-5 flex-shrink-0">
            <div className="flex items-center border-b border-white/10 pb-5">
              <Search className="w-5 h-5 text-white/40 mr-4 flex-shrink-0" strokeWidth={1.5} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search Velora..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (showInlineResults) setShowInlineResults(false);
                }}
                className="bg-transparent border-none outline-none text-2xl md:text-3xl font-light w-full placeholder:text-white/20 tracking-tight"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors ml-4 flex-shrink-0"
                aria-label="Close search"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* ── Content ───────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="container mx-auto px-8 py-6">
              {!showInlineResults ? (
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-10">
                  {/* ── Left: Suggestions (30%) ─────────────────────── */}
                  <div className="lg:col-span-3 space-y-7">
                    {/* Trending Searches — resolves to product OR category OR query */}
                    <section>
                      <h3 className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">
                        Trending Searches
                      </h3>
                      <ul className="space-y-2.5">
                        {SEARCH_SUGGESTIONS.Trending.map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => navigateToTerm(item)}
                              className="text-sm font-light text-white/70 hover:text-white transition-colors duration-300 flex items-center group hover:underline underline-offset-4 decoration-white/20"
                            >
                              {item}
                              <ArrowRight
                                size={12}
                                className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Categories — always goes to /shop?category=… */}
                    <section>
                      <h3 className="text-[9px] uppercase tracking-[0.3em] text-white/40 mb-4 font-bold">
                        Categories
                      </h3>
                      <ul className="space-y-2.5">
                        {SEARCH_SUGGESTIONS.Categories.map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => navigateToCategory(item)}
                              className="text-sm font-light text-white/70 hover:text-white transition-all duration-300 hover:tracking-wide flex items-center group"
                            >
                              {item}
                              <ArrowRight
                                size={12}
                                className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* ── Right: Live Product Results (70%) ───────────── */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">
                        {query ? `Results for "${query}"` : "New In Early Access"}
                      </h3>
                      {query && filteredProducts.length > 4 && (
                        <button
                          onClick={() => navigate(`/shop?query=${encodeURIComponent(query)}`)}
                          className="text-[9px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                        >
                          View All ({filteredProducts.length})
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      {/* Each PRODUCT card → /product/:id */}
                      {(query ? filteredProducts.slice(0, 4) : products.slice(0, 4)).map(
                        (product) => (
                          <ProductSearchResult
                            key={product.id}
                            product={product}
                            onClick={() => navigateToProduct(product)}
                          />
                        ),
                      )}
                      {query && filteredProducts.length === 0 && (
                        <div className="col-span-full py-12 text-center">
                          <p className="text-sm font-light text-white/30">
                            No products found for "{query}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Inline Results Grid — each card → /product/:id */
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-light tracking-tight">
                      All Results{" "}
                      <span className="text-white/40 ml-2">({filteredProducts.length})</span>
                    </h3>
                    <button
                      onClick={() => setShowInlineResults(false)}
                      className="text-[9px] uppercase tracking-[0.2em] hover:text-white transition-colors border-b border-white/20 pb-0.5"
                    >
                      Back to Overview
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredProducts.map((product) => (
                      <ProductSearchResult
                        key={product.id}
                        product={product}
                        onClick={() => navigateToProduct(product)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Product Result Card ─────────────────────────────────────────────────────
const ProductSearchResult: React.FC<{ product: Product; onClick: () => void }> = ({
  product,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer flex gap-6 items-center"
    >
      <div className="w-24 h-32 flex-shrink-0 bg-white/5 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="flex-1 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          {product.category}
        </span>
        <h4 className="text-lg font-light leading-tight group-hover:text-white transition-colors">
          {product.title}
        </h4>
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/60 font-medium">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          <div className="text-[10px] uppercase tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
            View Detail <ArrowRight size={10} className="ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
