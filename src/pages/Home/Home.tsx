import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeroBanner } from "./HeroBanner/HeroBanner";
import { FeaturedSection } from "./FeaturedSection/FeaturedSection";
import { FeaturedPieces } from "./FeaturedPieces/FeaturedPieces";
import { Newsletter } from "./Newsletter/Newsletter";
import { NewArrivals } from "./NewArrivals/NewArrivals";
import { CATEGORIES, SELLER_PROMO } from "./constants";
import { CategoryItem } from "./types";

const Home: React.FC = () => {

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner Component */}
      <HeroBanner />

      {/* Featured Collections Section */}
      <FeaturedSection />

      {/* Categories Grid - Minimalist approach */}
      <section className="py-24 border-t border-neutral-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4">Collections</h2>
            <p className="text-2xl font-light tracking-widest uppercase">Shop by Category</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {CATEGORIES.map((cat: CategoryItem) => (
               <Link 
                 key={cat.name} 
                 to={`/products?category=${encodeURIComponent(cat.name)}`}
                 className="group cursor-pointer"
               >
                 <div className="aspect-[3/4] overflow-hidden mb-6 bg-neutral-100">
                   <img
                     src={cat.img}
                     alt={cat.name}
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                   />
                 </div>
                 <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-center group-hover:text-neutral-500 transition-colors">
                   {cat.name}
                 </h3>
               </Link>
             ))}
          </div>
        </Container>
      </section>

      {/* Featured Products Grid */}
      <FeaturedPieces />

      {/* Seller Promo - Premium Aesthetic */}
      <section className="py-32">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden bg-neutral-100">
              <img
                src={SELLER_PROMO.bgImage}
                alt="Promo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-8 px-4">
              <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400">Our Mission</h2>
              <h3 className="text-4xl font-light leading-snug tracking-tight text-neutral-900">
                {SELLER_PROMO.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light text-lg">
                {SELLER_PROMO.description}
              </p>
               <Link to="/about">
                <Button
                  variant="outline"
                  className="rounded-none px-10 py-6 border-neutral-900 uppercase tracking-[0.3em] text-[10px] hover:bg-neutral-900 hover:text-white transition-all duration-500"
                >
                  {SELLER_PROMO.cta}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* New Arrivals Section */}
      <NewArrivals />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
};

export default Home;
