import React, { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useProducts } from "@/hooks/use-products";
import { PRODUCT_LIST_CONFIG } from "./constants";
import { Filter, ChevronDown, X } from "lucide-react";

export const ProductList: React.FC = () => {
  const { data: products, isLoading } = useProducts();
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Derive unique categories from products
  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "Price: High to Low":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "Rating":
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      default: // Featured or others
        break;
    }

    return result;
  }, [products, selectedCategory, sortBy]);

  const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating"];

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
                {PRODUCT_LIST_CONFIG.subtitle}
            </h1>
            <h2 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase text-neutral-900">
                {PRODUCT_LIST_CONFIG.title}
            </h2>
        </div>
      </div>

      <Container>
        {/* Sticky Utility Bar (Toolbar + Filter Section) */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 mb-12 mt-[-1px]">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center py-8 gap-8 px-2">
              <div className="flex items-center gap-12">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-medium transition-colors ${isFilterOpen ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
                  >
                      <Filter size={14} strokeWidth={1.5} />
                      {isFilterOpen ? 'Close Filters' : 'Filters'}
                  </button>
                  <div className="h-4 w-[1px] bg-neutral-200 hidden md:block" />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                      {filteredProducts.length} Pieces
                  </p>
                  {selectedCategory && (
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full"
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
                               className={`w-full text-left px-6 py-4 text-[10px] tracking-[0.2em] uppercase transition-colors hover:bg-neutral-50 ${sortBy === option ? 'text-neutral-900 font-bold' : 'text-neutral-500'}`}
                             >
                               {option}
                             </button>
                          ))}
                      </div>
                  </div>
              </div>
          </div>

          {/* Filter Section (Now inside sticky container) */}
          {isFilterOpen && (
            <div className="pb-12 animate-in fade-in slide-in-from-top-4 duration-500 border-t border-neutral-50 px-2 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-8">
                <div className="space-y-6">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-900">Categories</h3>
                  <div className="flex flex-col gap-4">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                        className={`text-left text-[11px] tracking-[0.1em] uppercase transition-colors ${selectedCategory === category ? 'text-neutral-900 font-bold' : 'text-neutral-500'}`}
                      >
                        {category}
                      </button>
                    ))}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`text-left text-[11px] tracking-[0.1em] uppercase transition-colors ${!selectedCategory ? 'text-neutral-900 font-bold' : 'text-neutral-500'}`}
                    >
                      All Collections
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-900">Price Range</h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-[11px] text-neutral-400 italic">Showing all price points</p>
                  </div>
                </div>

                <div className="space-y-6 col-span-2">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-neutral-900">Our Heritage</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-md">
                    Every piece in our collection is curated with an emphasis on sustainable luxury and timeless design. Filter through our archives to find your next staple.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4-column minimal grid is handled by ProductGrid */}
        <ProductGrid 
            products={filteredProducts} 
            isLoading={isLoading} 
            emptyMessage="No pieces found matching your criteria. Try adjusting your filters."
        />
      </Container>
    </main>
  );
};

export default ProductList;
