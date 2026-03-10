import { ProductCard } from "./ProductCard";
import { Product } from "@shared/schema";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  products: Product[] | undefined;
  isLoading: boolean;
  title?: string;
  emptyMessage?: string;
}

export function ProductGrid({ 
  products, 
  isLoading, 
  title, 
  emptyMessage = "No products found." 
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="font-medium">Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center bg-muted/30 rounded-2xl border border-dashed border-border">
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">No Results</h3>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {title && <h2 className="text-3xl font-display font-bold mb-8 text-foreground">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
