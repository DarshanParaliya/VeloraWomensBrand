import React, { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Heart,
  Share2,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Star,
  ShoppingBag,
  Zap
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";

import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";

interface ProductDetailCardProps {
  product?: Product; // Pass product directly if available
  params?: { id?: string }; // wouter passes params to route components
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product: initialProduct,
  params: routeParams
}) => {
  const [, wouterParams] = useRoute("/product/:id");
  const params = routeParams || wouterParams;
  const productId = parseInt(params?.id || "0", 10);

  // Only fetch if a product wasn't passed as a prop
  const { data: fetchedProduct, isLoading, isError } = useProduct(productId);

  const product = initialProduct || (fetchedProduct as Product | undefined);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  if (isLoading && !initialProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-neutral-200" />
      </div>
    );
  }

  if ((isError || !product) && !initialProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-xl font-light tracking-[0.3em] uppercase mb-8">Product Not Found</h1>
        <Link href="/shop" className="text-[10px] uppercase tracking-[0.2em] border-b border-neutral-900 pb-1">
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to the bag.",
        variant: "destructive",
      });
      return;
    }
    dispatch(addToCart({ product, quantity }));
    toast({
      title: "Added to Bag",
      description: `${product.title} (Size: ${selectedSize}) has been added to your bag.`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before checking out.",
        variant: "destructive",
      });
      return;
    }
    dispatch(addToCart({ product, quantity }));
    toast({
      title: "Proceeding to Checkout",
      description: `Redirecting you to complete your purchase of ${product.title}.`,
    });
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Container>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-16">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-neutral-900 transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-900 truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
          {/* Product Image */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-neutral-50 overflow-hidden relative group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all duration-300 z-10"
              >
                <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-900"} strokeWidth={1.5} />
              </button>
            </motion.div>

            {/* Optional Gallery if product has multiple images, otherwise match original clean look */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/5] bg-neutral-50 overflow-hidden cursor-pointer">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-neutral-900 border-b border-black pb-0.5">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-full">
                    <Star size={10} className="fill-black text-black" />
                    <span className="text-[10px] font-bold text-black">{product.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-light tracking-tight text-neutral-900">
                  {product.title}
                </h1>
                <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase font-medium">Vendor: {product.vendor}</p>
              </div>

              <div className="text-3xl font-light text-neutral-900">
                ${parseFloat(product.price).toFixed(2)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-10"
            >
              <p className="text-sm text-neutral-500 font-light leading-relaxed">
                {product.description || "A meticulously crafted piece that combines timeless aesthetic with modern functionality. Designed for longevity and style, this item serves as a perfect addition to your curated collection."}
              </p>

              {/* Interaction Block */}
              <div className="space-y-8 bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                {/* Size Selector (Enhanced addition) */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-900">Size</label>
                  </div>
                  <div className="flex gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-[10px] border transition-all ${selectedSize === size ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-400 border-neutral-100 hover:border-neutral-900"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-bold text-neutral-900">Quantity</label>
                  <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg border border-neutral-100 w-full sm:w-40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                    >
                      <Minus size={16} strokeWidth={1.5} />
                    </button>
                    <span className="text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                    >
                      <Plus size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    variant="premium"
                    size="premium-lg"
                    onClick={handleAddToCart}
                    className="w-full py-8 text-[11px] tracking-[0.3em] uppercase font-bold shadow-xl overflow-hidden"
                  >
                    <ShoppingBag className="mr-3 h-4 w-4" />
                    ADD TO BAG
                  </Button>

                  <div className="flex gap-4">
                    <button
                      onClick={() => dispatch(toggleWishlist(product))}
                      className="flex-1 bg-white border border-neutral-100 py-4 rounded-xl flex items-center justify-center gap-3 text-[9px] tracking-[0.2em] uppercase hover:bg-neutral-50 transition-all font-bold text-neutral-900 shadow-sm"
                    >
                      <Heart size={14} strokeWidth={1.5} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                      {isWishlisted ? "In Wishlist" : "Wishlist"}
                    </button>
                    <button className="p-4 bg-white border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-all shadow-sm">
                      <Share2 size={14} strokeWidth={1.5} className="text-neutral-900" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Tabs */}
              <div className="space-y-8">
                <div className="flex gap-8 border-b border-neutral-100">
                  {["Description", "Shipping", "Care"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 relative font-bold ${activeTab === tab ? "text-neutral-900" : "text-neutral-300 hover:text-neutral-500"}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tabLine" className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-black" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[100px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-[13px] text-neutral-500 font-light leading-relaxed"
                    >
                      {activeTab === "Description" && (
                        <p>{product.description || "The piece embodies the Quiet Luxury philosophy—crafted with a focus on silhouette and high-quality fabrication rather than overt branding. It is an investment in your personal style archive."}</p>
                      )}
                      {activeTab === "Shipping" && (
                        <p>Standard delivery arrives in 3-5 business days. Complimentary express shipping available on orders over $500. Every order is packed in our signature sustainable boxes.</p>
                      )}
                      {activeTab === "Care" && (
                        <p>Maintain the integrity of the fabric by following professional care guidelines. Avoid direct heat and store in the provided garment bag when not in use.</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-neutral-100">
                <div className="flex items-start gap-4">
                  <ShieldCheck size={20} strokeWidth={1} className="text-black" />
                  <div>
                    <h4 className="text-[10px] tracking-[0.1em] uppercase font-bold text-neutral-900 mb-1 font-display">Authentic</h4>
                    <p className="text-[11px] text-neutral-400 font-light underline decoration-neutral-100 underline-offset-4">Verified original selection</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <RotateCcw size={20} strokeWidth={1} className="text-black" />
                  <div>
                    <h4 className="text-[10px] tracking-[0.1em] uppercase font-bold text-neutral-900 mb-1 font-display">Returns</h4>
                    <p className="text-[11px] text-neutral-400 font-light underline decoration-neutral-100 underline-offset-4">14-day return period</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </main>
  );
};

