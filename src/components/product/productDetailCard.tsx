import React, { useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "@/hooks/use-products";
import { Product } from "@shared/schema";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Star,
  ShoppingBag,
  ArrowRight,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addItem } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";

import { Loader2 } from "lucide-react";
import { MOCK_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────
const SIZES = ["XS", "S", "M", "L", "XL"];
const MAX_RELATED = 4;

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
interface ProductDetailCardProps {
  /** Pass product directly if already available (e.g. from a parent component). */
  product?: Product;
  /** wouter passes route params to route components via this prop. */
  params?: { id?: string };
  /**
   * Optional pre-filtered list of related products.
   * If omitted the component derives the list internally from MOCK_PRODUCTS.
   */
  relatedProducts?: Product[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Smart Component
// ─────────────────────────────────────────────────────────────────────────────
export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({
  product: initialProduct,
  params: routeParams,
  relatedProducts: externalRelated,
}) => {
  const params = useParams();
  const productId = parseInt(params?.id || "0", 10);

  // Only fetch if a product wasn't passed as a prop
  const { data: fetchedProduct, isLoading, isError } = useProduct(productId);

  const product = initialProduct || (fetchedProduct as Product | undefined);

  // ── Smart Selection Logic ───────────────────────────────────────────────
  const nonSizeCategories = useMemo(() => ["Accessories", "Home Decor", "Furniture", "Electronics", "Textiles", "Art", "Beauty", "Parlour"], []);
  const isSizeBased = useMemo(() => product && !nonSizeCategories.includes(product.category), [product, nonSizeCategories]);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  // Default to 'S' for size-based, null otherwise
  const [selectedSize, setSelectedSize] = useState<string | null>(isSizeBased ? "S" : null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simulated gallery for mock products
  const productGallery = useMemo(() => [
    product?.image,
    product?.image,
    product?.image,
    product?.image
  ].filter(Boolean) as string[], [product]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productGallery.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productGallery.length) % productGallery.length);
  };

  // Update selected size when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(!nonSizeCategories.includes(product.category) ? "S" : null);
    }
  }, [product, nonSizeCategories]);

  // ── Related Products (Smart Filtering) ──────────────────────────────────
  const relatedProducts = useMemo<Product[]>(() => {
    // Prefer externally supplied list
    if (externalRelated) return externalRelated.slice(0, MAX_RELATED);
    if (!product) return [];

    return MOCK_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id,
    ).slice(0, MAX_RELATED);
  }, [product, externalRelated]);

  // ── Loading / Error States ───────────────────────────────────────────────
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
        <Link to="/products" className="text-[10px] uppercase tracking-[0.2em] border-b border-neutral-900 pb-1">
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) return null;

  // ── Wishlist State ───────────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id),
  );

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    if (isSizeBased && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to the bag.",
        variant: "destructive",
      });
      return;
    }
    
    const payload = { 
      product, 
      quantity,
      ...(isSizeBased && selectedSize ? { size: selectedSize } : {})
    };
    
    dispatch(addItem(payload));
    
    toast({
      title: "Added to Bag",
      description: `${product.title}${isSizeBased && selectedSize ? ` (Size: ${selectedSize})` : ""} has been added to your bag.`,
    });
  };

  const handleBuyNow = () => {
    if (isSizeBased && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    const payload = { 
      product, 
      quantity,
      ...(isSizeBased && selectedSize ? { size: selectedSize } : {})
    };
    
    dispatch(addItem(payload));
    navigate("/checkout");
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Container>
        {/* ── Breadcrumbs ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-16">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/products" className="hover:text-neutral-900 transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-900 truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* ── Product Detail ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="lg:col-span-5 lg:col-start-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/5] bg-neutral-50 overflow-hidden relative group rounded-sm cursor-zoom-in"
              onClick={() => setIsImageOpen(true)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleWishlist(product));
                }}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all duration-300 z-10"
              >
                <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-900"} strokeWidth={1.5} />
              </button>
            </motion.div>

            {/* Quick View — Image Modal */}
            <AnimatePresence>
              {isImageOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
                  onClick={() => setIsImageOpen(false)}
                >
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={32} strokeWidth={1} />
                  </motion.button>
                  
                  <motion.img
                    key={currentImageIndex}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={productGallery[currentImageIndex]}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {productGallery.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 md:left-8 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all transform hover:-translate-x-1"
                      >
                        <ChevronLeft size={24} strokeWidth={1} />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 md:right-8 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all transform hover:translate-x-1"
                      >
                        <ChevronRight size={24} strokeWidth={1} />
                      </button>

                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-black/40 px-6 py-3 rounded-full backdrop-blur-lg border border-white/10">
                        {productGallery.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "bg-white scale-125 w-4" : "bg-white/30"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gallery strip */}
            <div className="grid grid-cols-4 gap-3 mt-3">
              {productGallery.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-[4/5] bg-neutral-50 overflow-hidden cursor-pointer rounded-sm border-2 transition-all ${idx === currentImageIndex ? "border-neutral-900 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 space-y-8 pt-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] tracking-[0.4em] uppercase font-bold text-neutral-900 border-b border-black pb-0.5">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-full">
                    <Star size={8} className="fill-black text-black" />
                    <span className="text-[9px] font-bold text-black">{product.rating}</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-light tracking-tight text-neutral-900">
                  {product.title}
                </h1>
                <p className="text-neutral-400 text-[9px] tracking-[0.2em] uppercase font-medium">Vendor: {product.vendor}</p>
              </div>

              <div className="text-2xl font-light text-neutral-900 pt-2">
                ${parseFloat(product.price).toFixed(2)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-[13px] text-neutral-500 font-light leading-relaxed">
                {product.description || "A meticulously crafted piece that combines timeless aesthetic with modern functionality. Designed for longevity and style, this item serves as a perfect addition to your curated collection."}
              </p>

              {/* Interaction Block */}
              <div className="space-y-6 bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                {/* Size Selector */}
                {isSizeBased && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-neutral-900">Size</label>
                    </div>
                    <div className="flex gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-8 h-8 flex items-center justify-center text-[9px] border transition-all rounded-sm ${selectedSize === size ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-400 border-neutral-200 hover:border-neutral-900"}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-[9px] tracking-[0.2em] uppercase font-bold text-neutral-900">Quantity</label>
                  <div className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-neutral-100 w-full sm:w-32">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="text-xs font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Button
                    variant="premium"
                    size="default"
                    onClick={handleAddToCart}
                    className="w-full py-4 text-[10px] tracking-[0.3em] uppercase font-bold shadow-md hover:shadow-lg transition-all bg-gradient-to-tr from-neutral-900 to-neutral-700 hover:from-neutral-800 hover:to-neutral-600 border-none"
                  >
                    <ShoppingBag className="mr-2 h-3.5 w-3.5" />
                    ADD TO BAG
                  </Button>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => dispatch(toggleWishlist(product))}
                      className="flex-1 bg-white border border-neutral-200 py-3 rounded-md flex items-center justify-center gap-2 text-[9px] tracking-[0.2em] uppercase hover:bg-neutral-50 hover:border-neutral-300 transition-all font-bold text-neutral-900 shadow-sm"
                    >
                      <Heart size={12} strokeWidth={1.5} className={isWishlisted ? "fill-red-500 text-red-500" : ""} />
                      {isWishlisted ? "In Wishlist" : "Wishlist"}
                    </button>
                    <button className="p-3 px-4 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm flex items-center justify-center">
                      <Share2 size={12} strokeWidth={1.5} className="text-neutral-900" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Tabs */}
              <div className="space-y-8">
                <div className="flex gap-8 border-b border-neutral-100">
                  {["Description", "Shipping", "Care"].map((tab) => (
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

        {/* ── Related Products Section ─────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-32"
            aria-label="Related products"
          >
            {/* Section header */}
            <div className="flex items-center gap-6 mb-12">
              <div className="flex-1 h-px bg-neutral-100" />
              <div className="text-center space-y-1">
                <p className="text-[9px] uppercase tracking-[0.5em] text-neutral-400 font-bold">
                  You May Also Like
                </p>
                <h2 className="text-2xl md:text-3xl font-light tracking-[0.15em] uppercase text-neutral-900">
                  More in {product.category}
                </h2>
              </div>
              <div className="flex-1 h-px bg-neutral-100" />
            </div>

            {/* Related Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((related: Product, index: number) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  <ProductCard product={related} />
                </motion.div>
              ))}
            </div>

            {/* CTA — view entire category */}
            <div className="flex justify-center mt-16">
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-900 border-b border-neutral-900 pb-1 hover:gap-5 transition-all duration-300"
              >
                View All {product.category}
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.section>
        )}
      </Container>
    </main>
  );
};

