import { Link } from "wouter";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Product } from "@shared/schema";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isWishlisted = useAppSelector((state) => 
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ product }));
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleToggleWishlist}
              className={cn(
                "p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110",
                isWishlisted ? "text-secondary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-foreground shadow-sm">
              {product.category}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start gap-2 mb-1">
            <Link 
              href={`/vendor/${encodeURIComponent(product.vendor)}`}
              className="text-xs text-primary font-medium hover:underline z-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {product.vendor}
            </Link>
            <div className="flex items-center gap-1 text-accent text-xs font-semibold bg-accent/10 px-1.5 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-current" />
              <span>{Number(product.rating).toFixed(1)}</span>
            </div>
          </div>
          
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-foreground">
              ${Number(product.price).toFixed(2)}
            </span>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all z-10 relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
