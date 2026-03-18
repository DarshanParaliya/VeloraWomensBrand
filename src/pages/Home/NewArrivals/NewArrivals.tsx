import React from "react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { MOCK_PRODUCTS } from "@/data/products";
import { Link } from "wouter";

const NEW_ARRIVALS = MOCK_PRODUCTS.filter(p => p.isNew);

export const NewArrivals: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-50/50">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4">Latest</h2>
          <p className="text-3xl font-light tracking-widest uppercase text-neutral-900">New Arrivals</p>
        </div>
        <ProductGrid products={NEW_ARRIVALS.slice(0, 4)} isLoading={false} />
        {NEW_ARRIVALS.length > 4 && (
          <div className="text-center mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
            >
              View All New Arrivals
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};
