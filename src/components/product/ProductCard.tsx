import { Link } from "wouter";
import { Product } from "@shared/schema";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useToast } from "@/hooks/use-toast";
import { ProductCardUI } from "@/components/ui/product_card_ui";

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

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Quick View",
      description: `Viewing details for ${product.title}`,
    });
  };

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
      href={`/product/${product.id}`}
      LinkComponent={Link}
    />
  );
}
