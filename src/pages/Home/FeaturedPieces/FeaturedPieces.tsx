import React from "react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "@/data/products";

const FEATURED_PIECES = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

export const FeaturedPieces: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-50">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 px-4">
          <div className="mb-8 md:mb-0">
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4">Curated</h2>
            <p className="text-3xl font-light tracking-widest uppercase text-neutral-900">Featured Pieces</p>
          </div>
          <Link to="/products" className="text-[10px] uppercase tracking-[0.3em] font-semibold border-b border-black pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all">
            Discover All
          </Link>
        </div>
        <ProductGrid products={FEATURED_PIECES} isLoading={false} />
      </Container>
    </section>
  );
};
