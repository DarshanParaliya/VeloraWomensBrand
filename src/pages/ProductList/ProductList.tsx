import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useProducts } from "@/hooks/use-products";
import { PRODUCT_LIST_CONFIG } from "./constants";
import { Filter, ChevronDown, X, ArrowRight, Star, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

export const ProductList: React.FC = () => {
  const { data: products, isLoading } = useProducts();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [urlCategory, setUrlCategory] = useState<string | null>(null);
  const [featuredId, setFeaturedId] = useState<number | null>(null);

  // Read all URL params on mount and on URL change
  useEffect(() => {
    const q = searchParams.get("query");
    const cat = searchParams.get("category");
    const id = searchParams.get("id");
    const sort = searchParams.get("sort");
    const filter = searchParams.get("filter");

    setSearchQuery(q ? decodeURIComponent(q) : null);
    setUrlCategory(cat ? decodeURIComponent(cat) : null);
    setFeaturedId(id ? parseInt(id, 10) : null);

    if (sort === "new" || filter === "new") {
      setSortBy("New Arrivals");
    } else {
      setSortBy("Featured");
    }

    if (filter === "new") {
      setIsNewOnly(true);
    } else {
      setIsNewOnly(false);
    }

    if (q || cat) {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  // Derive unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // The featured/hero product (from ?id= param)
  const featuredProduct = useMemo(() => {
    if (!products || !featuredId) return null;
    return products.find(p => p.id === featuredId) ?? null;
  }, [products, featuredId]);

  // Apply filters and sorting — exclude the featured product from the grid
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    // Filter by ?query= (title, category, description)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false)
      );
    }

    // Filter by ?category= from URL
    if (urlCategory) {
      result = result.filter(
        p => p.category.toLowerCase() === urlCategory.toLowerCase()
      );
    }

    // Filter by sidebar category (secondary filter)
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Exclude the featured product from the main grid to avoid duplication
    if (featuredId) {
      result = result.filter(p => p.id !== featuredId);
    }

    // Filter by New Arrivals only
    if (isNewOnly) {
      result = result.filter(p => p.isNew);
    }

    // Sort
    switch (sortBy) {
      case "New Arrivals":
        result.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "Price: Low to High":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "Price: High to Low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "Rating":
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case "Featured":
      default:
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
    }

    return result;
  }, [products, selectedCategory, sortBy, searchQuery, urlCategory, featuredId, isNewOnly]);

  const clearAllFilters = () => {
    setSearchQuery(null);
    setUrlCategory(null);
    setFeaturedId(null);
    setSelectedCategory(null);
    setIsNewOnly(false);
    setSortBy("Featured");
    navigate("/products");
  };

  const isFiltered = !!(searchQuery || urlCategory || selectedCategory || isNewOnly);
  const sortOptions = ["Featured", "New Arrivals", "Price: Low to High", "Price: High to Low", "Rating"];

  // Active label for the page header
  const activeLabel = searchQuery
    ? `Results for: "${searchQuery}"`
    : urlCategory
      ? `Category: ${urlCategory}`
      : null;

  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Editorial Banner */}
      <div className="relative h-[40vh] w-full overflow-hidden bg-neutral-100 mt-20">
        <img
          src={PRODUCT_LIST_CONFIG.bannerImage}
          alt="Collection Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-neutral-500 mb-4 md:mb-6">
            {activeLabel ?? PRODUCT_LIST_CONFIG.subtitle}
          </h1>
          <h2 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase text-neutral-900">
            {urlCategory ?? PRODUCT_LIST_CONFIG.title}
          </h2>
        </div>
      </div>

      <Container>
        {/* Active filter chips */}
        <AnimatePresence>
          {isFiltered && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 py-6 flex-wrap"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-bold">Active:</span>
              {searchQuery && (
                <span className="flex items-center gap-2 bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  Search: "{searchQuery}"
                  <button onClick={() => { setSearchQuery(null); navigate(urlCategory ? `/products?category=${encodeURIComponent(urlCategory)}` : "/products"); }}>
                    <X size={10} />
                  </button>
                </span>
              )}
              {urlCategory && (
                <span className="flex items-center gap-2 bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  {urlCategory}
                  <button onClick={clearAllFilters}><X size={10} /></button>
                </span>
              )}
              {isNewOnly && (
                <span className="flex items-center gap-2 bg-neutral-900 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                  New Arrivals
                  <button onClick={() => { setIsNewOnly(false); setSortBy("Featured"); navigate("/products"); }}>
                    <X size={10} />
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 transition-colors border-b border-neutral-200 ml-2"
              >
                Clear All
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sticky Utility Bar */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 mb-12 mt-[-1px]">
          <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-8 px-2">
            <div className="flex items-center gap-12">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-medium transition-colors ${isFilterOpen ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900"}`}
              >
                <Filter size={14} strokeWidth={1.5} />
                {isFilterOpen ? "Close Filters" : "Filters"}
              </button>
              <div className="h-4 w-[1px] bg-neutral-200 hidden md:block" />
              <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                {(featuredProduct ? 1 : 0) + filteredProducts.length} Pieces
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {selectedCategory} <X size={10} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-8">
              <div className="relative group">
                <button className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-medium hover:text-neutral-500 transition-colors">
                  Sort By: {sortBy}
                  <ChevronDown size={14} strokeWidth={1.5} />
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-neutral-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {sortOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`w-full text-left px-6 py-4 text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-neutral-50 ${sortBy === option ? "text-neutral-900 font-bold" : "text-neutral-500"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <div className="pb-12 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-neutral-50 px-2 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-8">
                <div className="space-y-6">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-900">Categories</h3>
                  <div className="flex flex-col gap-4">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category === selectedCategory ? null : category);
                          setIsFilterOpen(false);
                          // Clear the main search/category URL parameters so they don't fight with the sidebar
                          if (urlCategory || searchQuery || featuredId) {
                            navigate("/products");
                          }
                        }}
                        className={`text-left text-[11px] tracking-[0.1em] uppercase transition-colors ${selectedCategory === category ? "text-neutral-900 font-bold" : "text-neutral-500"}`}
                      >
                        {category}
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsFilterOpen(false);
                        if (urlCategory || searchQuery || featuredId) {
                          navigate("/products");
                        }
                      }}
                      className={`text-left text-[11px] tracking-[0.1em] uppercase transition-colors ${!selectedCategory ? "text-neutral-900 font-bold" : "text-neutral-500"}`}
                    >
                      All Collections
                    </button>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-900">Price Range</h3>
                  <p className="text-[11px] text-neutral-400 italic">Showing all price points</p>
                </div>
                <div className="space-y-6 col-span-2">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-900">Our Heritage</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-md">
                    Every piece in our collection is curated with an emphasis on sustainable luxury and timeless design.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Featured Hero Product ─────────────────────────────── */}
        <AnimatePresence>
          {featuredProduct && (
            <motion.div
              key={featuredProduct.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="mb-20"
            >
              {/* Label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">Featured Pick</span>
                <div className="flex-1 h-px bg-neutral-100" />
              </div>

              <FeaturedHeroCard product={featuredProduct} />

              {/* Related items label */}
              {filteredProducts.length > 0 && (
                <div className="flex items-center gap-4 mt-20 mb-0">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
                    More in {featuredProduct.category}
                  </span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Product Grid ─────────────────────────────────── */}
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          emptyMessage={
            isFiltered
              ? "No pieces found matching your search. Try a different term."
              : "No pieces found. Try adjusting your filters."
          }
        />
      </Container>
    </main>
  );
};

// ── Featured Hero Card ──────────────────────────────────────────────────────
const FeaturedHeroCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isWishlisted = useAppSelector(state =>
    state.wishlist.items.some(item => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
    toast({ title: "Added to Bag", description: `${product.title} added to your bag.` });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#F5F5F5] overflow-hidden">
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-[4/5] overflow-hidden bg-neutral-200"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {/* Category badge */}
        <span className="absolute top-6 left-6 bg-[#121212] text-[#F5F5F5] text-[9px] uppercase tracking-[0.3em] px-4 py-2">
          {product.category}
        </span>
      </motion.div>

      {/* Info */}
      <div className="flex flex-col justify-center px-12 py-16 bg-[#F5F5F5]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold">{product.vendor}</p>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-[#121212] leading-none">
              {product.title}
            </h2>
            <div className="flex items-center gap-3">
              <Star size={12} className="fill-[#121212] text-[#121212]" />
              <span className="text-[11px] font-bold text-[#121212]">{product.rating}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm">
            {product.description}
          </p>

          <div className="text-3xl font-light text-[#121212]">
            ${parseFloat(product.price).toFixed(2)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#121212] text-[#F5F5F5] px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-neutral-800 transition-colors"
            >
              <ShoppingBag size={14} />
              Add to Bag
            </button>
            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`px-6 py-4 border text-[10px] uppercase tracking-[0.2em] font-bold transition-colors ${isWishlisted
                  ? "border-[#121212] bg-[#121212] text-[#F5F5F5]"
                  : "border-neutral-300 text-[#121212] hover:border-[#121212]"
                }`}
            >
              {isWishlisted ? "Saved" : "Wishlist"}
            </button>
            <Link
              href={`/product/${product.id}`}
              className="px-6 py-4 border border-neutral-300 text-[10px] uppercase tracking-[0.2em] font-bold text-[#121212] hover:border-[#121212] transition-colors flex items-center gap-2"
            >
              Full Details <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
