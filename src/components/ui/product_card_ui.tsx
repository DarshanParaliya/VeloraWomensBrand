import * as React from "react";
import { cn } from "@/lib/utils";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProductCardUIProps {
  id: string | number;
  title: string;
  price: string | number;
  image: string;
  category: string;
  vendor?: string;
  rating?: string | number;
  onAddToCart?: (e: React.MouseEvent) => void;
  onToggleWishlist?: (e: React.MouseEvent) => void;
  onQuickView?: (e: React.MouseEvent) => void;
  isWishlisted?: boolean;
  className?: string;
  to?: string;
  LinkComponent?: React.ElementType;
  // Size selection props
  isSizeBased?: boolean;
  selectedSize?: string | null;
  onSizeSelect?: (size: string) => void;
}

export const ProductCardUI = React.forwardRef<HTMLDivElement, ProductCardUIProps>(
  (
    {
      title,
      price,
      image,
      category,
      vendor,
      rating,
      onAddToCart,
      onToggleWishlist,
      onQuickView,
      isWishlisted = false,
      className,
      to,
      LinkComponent = "a",
      isSizeBased = false,
      selectedSize = null,
      onSizeSelect,
    },
    ref
  ) => {
    const SIZES = ["XS", "S", "M", "L", "XL"];

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex flex-col overflow-hidden bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-black/5",
          className
        )}
      >
        {/* Image Container with Overlay Controls */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <LinkComponent {...(LinkComponent === "a" ? { href: to } : { to })} className="block h-full w-full">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              loading="lazy"
            />
          </LinkComponent>

          {/* Category Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className="bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-neutral-900 backdrop-blur-md shadow-sm">
              {category}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onToggleWishlist}
            className={cn(
              "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            )}
          >
            <Heart className={cn("h-5 w-5 transition-colors duration-300", isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-900")} strokeWidth={1.5} />
          </button>

          {/* Quick Actions Overlay */}
          <div className="absolute bottom-0 left-0 right-0 flex translate-y-full transform flex-col items-center justify-center p-6 transition-transform duration-500 group-hover:translate-y-0 bg-gradient-to-t from-black/40 to-transparent gap-4">
            {isSizeBased && (
              <div className="flex gap-2 mb-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      onSizeSelect?.(size);
                    }}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center text-[10px] font-bold border rounded-sm transition-all shadow-sm",
                      selectedSize === size
                        ? "bg-white text-black border-white scale-110"
                        : "bg-black/20 text-white border-white/30 hover:bg-black/40 hover:border-white/60"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
            <Button
              variant="premium"
              size="premium-lg"
              onClick={onAddToCart}
              className="shadow-xl"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col p-5">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wider text-neutral-400">
            <span className="font-medium text-[#0891B2]">{vendor}</span>
            {rating && (
              <div className="flex items-center gap-1 text-[#10B981]">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-bold">{Number(rating).toFixed(1)}</span>
              </div>
            )}
          </div>

          <LinkComponent {...(LinkComponent === "a" ? { href: to } : { to })} className="group/title block">
            <h3 className="mb-2 line-clamp-1 font-display text-lg font-light tracking-tight text-neutral-900 transition-colors group-hover/title:text-neutral-500">
              {title}
            </h3>
          </LinkComponent>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-medium text-neutral-900">
              ${Number(price).toFixed(2)}
            </span>
            <button
              onClick={onQuickView}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
              title="Quick View"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCardUI.displayName = "ProductCardUI";
