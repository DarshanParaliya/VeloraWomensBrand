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
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-3 h-auto md:h-[40px]">
          {/* Main Large Item (Div A) - Left Side */}
          <div className="w-full md:w-2/3 h-[80px] md:h-full relative group overflow-hidden bg-neutral-100">
            <FeaturedCard item={FEATURED_COLLECTIONS[0]} isLarge={true} />
          </div>

          {/* Right Side Column (Stacking Div B and C) */}
          <div className="w-full md:w-1/3 flex flex-col gap-0.5 h-full">
            <div className="flex-1 min-h-[19px] relative group overflow-hidden bg-neutral-100">
              <FeaturedCard item={FEATURED_COLLECTIONS[1]} isLarge={false} />
            </div>
            <div className="flex-1 min-h-[19px] relative group overflow-hidden bg-neutral-100">
              <FeaturedCard item={FEATURED_COLLECTIONS[2]} isLarge={false} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

const FeaturedCard: React.FC<{ item: FeaturedItem; isLarge: boolean }> = ({ item, isLarge }) => (
  <div className="relative w-full h-full">
    <img
      src={item.imageUrl}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
    <div className="absolute inset-0 flex items-center justify-center p-1 text-center">
      <Link href={item.link} className="w-full h-full flex items-center justify-center">
        <h3 className={`${isLarge ? 'text-[9px]' : 'text-[7px]'} font-medium text-white uppercase tracking-[0.2em]`}>
          {item.title}
        </h3>
      </Link>
    </div>
  </div>
);
