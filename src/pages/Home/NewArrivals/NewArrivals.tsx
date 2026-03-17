import React from "react";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { NEW_ARRIVALS } from "./constants";

export const NewArrivals: React.FC = () => {
  return (
    <section className="py-24 bg-neutral-50/50">
      <Container>
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4">Latest</h2>
          <p className="text-3xl font-light tracking-widest uppercase text-neutral-900">New Arrivals</p>
        </div>
        <ProductGrid products={NEW_ARRIVALS} isLoading={false} />
      </Container>
    </section>
  );
};
