import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@shared/schema";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addItem } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";
import { ProductCardUI } from "@/components/ui/product_card_ui";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const nonSizeCategories = ["Accessories", "Home Decor", "Furniture", "Electronics", "Textiles", "Art", "Beauty", "Parlour"];
  const isSizeBased = !nonSizeCategories.includes(product.category);

  const [selectedSize, setSelectedSize] = React.useState<string | null>(isSizeBased ? "S" : null);

  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const checkAuth = (action: () => void) => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=${window.location.pathname}`);
      return;
    }
    action();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    checkAuth(() => {
      const payload = { 
        product, 
        ...(isSizeBased && selectedSize ? { size: selectedSize } : {})
      };
      
      dispatch(addItem(payload));
      
      toast({
        title: "Added to cart",
        description: `${product.title}${isSizeBased && selectedSize ? ` (Size: ${selectedSize})` : ""} has been added to your cart.`,
      });
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    checkAuth(() => {
      dispatch(toggleWishlist(product));
    });
  };

  // Quick View → redirect to dedicated ProductDetail page
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    checkAuth(() => {
      navigate(`/product/${product.id}`);
    });
  };

  const AuthLink = React.forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const { to, onClick, ...rest } = props;
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isAuthenticated) {
        e.preventDefault();
        navigate(`/auth?redirect=/product/${product.id}`);
      } else if (onClick) {
        onClick(e);
      }
    };
    return <Link {...rest} to={to} ref={ref} onClick={handleClick} />;
  });

  return (
    <ProductCardUI
      id={product.id}
      title={product.title}
      price={product.price}
      image={product.image}
      category={product.category}
      vendor={product.vendor}
      rating={product.rating}
      isWishlisted={isWishlisted}
      onAddToCart={handleAddToCart}
      onToggleWishlist={handleToggleWishlist}
      onQuickView={handleQuickView}
      to={`/product/${product.id}`}
      LinkComponent={AuthLink}
      isSizeBased={isSizeBased}
      selectedSize={selectedSize}
      onSizeSelect={(size) => setSelectedSize(size)}
    />
  );
}
