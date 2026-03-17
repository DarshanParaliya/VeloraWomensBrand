import { useRoute } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, RefreshCw, Loader2, ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "wouter";

export default function ProductDetails() {
  const [, params] = useRoute("/product/:id");
  const productId = parseInt(params?.id || "0", 10);
  const { data: product, isLoading, isError } = useProduct(productId);
  
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const isWishlisted = useAppSelector((state) => 
    state.wishlist.items.some((item) => item.id === productId)
  );

  if (isLoading) {
    return (
      <Container className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </Container>
    );
  }

  if (isError || !product) {
    return (
      <Container className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button variant="default" className="rounded-full">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.title} added to your cart.`,
    });
  };

  return (
    <main className="py-12 md:py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery (Simplified for single image based on schema) */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted border border-border shadow-xl">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-semibold rounded-full" style={{ background: 'linear-gradient(90deg,rgba(27,67,139,0.10),rgba(16,185,129,0.10))', color: '#0891B2' }}>
                {product.category}
              </span>
              <div className="flex items-center gap-1 font-semibold" style={{ color: '#10B981' }}>
                <Star className="w-4 h-4 fill-current" />
                <span>{Number(product.rating).toFixed(1)}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-2 mb-8">
              <span className="text-muted-foreground">Sold by</span>
              <Link href={`/vendor/${encodeURIComponent(product.vendor)}`} className="font-semibold hover:underline" style={{ color: '#0891B2' }}>
                {product.vendor}
              </Link>
            </div>

            <div className="text-4xl font-bold text-foreground mb-8">
              ${Number(product.price).toFixed(2)}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {product.description || "Premium quality product crafted with attention to detail. Experience the best from our verified vendor."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 pb-12 border-b border-border">
              <div className="flex items-center border border-input rounded-full px-2 bg-background h-14 w-full sm:w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center font-semibold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 h-14 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </Button>
              
              <Button 
                onClick={() => dispatch(toggleWishlist(product))}
                variant="outline" 
                size="icon" 
                className="h-14 w-14 rounded-full border-2 text-foreground/80 hover:text-secondary hover:border-secondary transition-colors"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "text-secondary" : ""}`} fill={isWishlisted ? "currentColor" : "none"} />
              </Button>
            </div>

            {/* Value Props */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(27,67,139,0.12),rgba(8,145,178,0.15))' }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: '#0891B2' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Authentic Product</h4>
                  <p className="text-sm text-muted-foreground">Verified original item direct from the vendor.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(8,145,178,0.12),rgba(16,185,129,0.15))' }}>
                  <Truck className="w-6 h-6" style={{ color: '#10B981' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Fast Shipping</h4>
                  <p className="text-sm text-muted-foreground">Dispatches within 24 hours of order confirmation.</p>
                </div>
              </div>
              <div className="flex gap-4 sm:col-span-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(27,67,139,0.10),rgba(16,185,129,0.12))' }}>
                  <RefreshCw className="w-6 h-6" style={{ color: '#1B438B' }} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">30-Day Returns</h4>
                  <p className="text-sm text-muted-foreground">Not satisfied? Return it within 30 days for a full refund.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </main>
  );
}
