import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { FEATURED_COLLECTIONS } from './constants';
import { FeaturedItem } from './types';

export const FeaturedSection: React.FC = () => {
  return (
    <section className="pt-16 bg-white overflow-hidden">
      <Container>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 h-auto md:h-[450px]">
          {/* Main Large Item (Div A) - Left Side */}
          <div className="w-full md:w-2/3 h-[300px] md:h-full relative group overflow-hidden bg-neutral-50  shadow-sm">
            <FeaturedCard item={FEATURED_COLLECTIONS[0]} isLarge={true} />
          </div>

          {/* Right Side Column (Stacking Div B and C) */}
          <div className="w-full md:w-1/3 flex flex-col gap-4 h-full">
            <div className="flex-1 h-[220px] md:h-1/2 relative group overflow-hidden bg-neutral-50 shadow-sm">
              <FeaturedCard item={FEATURED_COLLECTIONS[1]} isLarge={false} />
            </div>
            <div className="flex-1 h-[220px] md:h-1/2 relative group overflow-hidden bg-neutral-50 shadow-sm">
              <FeaturedCard item={FEATURED_COLLECTIONS[2]} isLarge={false} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const FeaturedCard: React.FC<{ item: FeaturedItem; isLarge: boolean }> = ({ item, isLarge }) => (
  <Link href={item.link} className="relative block w-full h-full group">
    <div className="relative w-full h-full">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />

      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

      {/* Modern Glass Card - Bottom Aligned */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="p-5 md:p-6  shadow-2xl backdrop-blur-lg border-white/50 transform transition-all duration-500 group-hover:-translate-y-2">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold text-velora-teal uppercase tracking-[0.3em] mb-1">
                {item.category}
              </span>
              <h3 className={`${isLarge ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'} font-display font-medium text-slate-900 leading-tight uppercase tracking-wide`}>
                {item.title}
              </h3>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full velora-btn shadow-lg transform transition-transform duration-500 group-hover:rotate-45">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Action reveal */}
          <div className="overflow-hidden h-0 group-hover:h-8 transition-all duration-500 ease-out">
            <div className="mt-4 pt-4 border-t border-slate-200/50">
              <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">
                Discover Collection
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
