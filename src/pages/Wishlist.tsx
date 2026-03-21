import React from "react";
import { Container } from "@/components/layout/Container";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { clearWishlist } from "@/store/wishlistSlice";
import { ProductCard } from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export const Wishlist: React.FC = () => {
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-white min-h-screen py-32 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
        <Container className="text-center max-w-lg px-6">
          <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-10 mx-auto shadow-inner border border-neutral-100/50">
            <Heart size={40} className="w-10 h-10 text-neutral-300 stroke-[1px]" />
          </div>
          <h1 className="text-xs uppercase tracking-[0.8em] text-neutral-400 mb-6 font-medium">Your Boutique</h1>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-8">Wishlist is Empty</h2>
          <p className="text-neutral-500 font-light leading-relaxed mb-12">
            Curate your collection of timeless pieces. Save items you love and they will appear here.
          </p>
          <Link to="/products">
            <button className="h-14 px-12 bg-neutral-900 text-white uppercase tracking-[0.6em] text-[10px] shadow-2xl hover:bg-neutral-800 transition-all active:scale-[0.98]">
              Explore Collection
            </button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-32 pb-32">
      <Container>
        <div className="mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center gap-4 mb-4">
             <span className="text-[10px] uppercase tracking-[0.8em] text-neutral-400 font-medium">Your Boutique</span>
             <div className="h-px flex-1 bg-neutral-100" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900 mb-2 font-display">
                Saved Pieces
              </h1>
              <p className="text-neutral-500 font-light tracking-widest uppercase text-[10px]">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={() => dispatch(clearWishlist())}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 hover:text-neutral-900 border-b border-transparent hover:border-neutral-900 pb-2 transition-all"
              >
                Clear All <X size={14} />
              </button>
              <Link to="/cart" className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-900 border-b border-neutral-900 pb-2 transition-all hover:gap-5">
                View Shopping Bag <ShoppingBag size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Curation Footer */}
        <div className="mt-40 pt-20 border-t border-neutral-100 text-center max-w-2xl mx-auto">
          <h3 className="text-[11px] uppercase tracking-[0.5em] text-neutral-400 mb-8 font-medium italic">Velora Concierge</h3>
          <p className="text-lg font-light text-neutral-600 leading-relaxed mb-10">
            "True luxury is not just what you wear, but how it makes you feel. Your wishlist is a reflection of your evolving narrative."
          </p>
          <div className="w-12 h-px bg-neutral-200 mx-auto" />
        </div>
      </Container>
    </main>
  );
};

export default Wishlist;
