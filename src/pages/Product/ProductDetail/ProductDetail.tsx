import React from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";
import { ProductDetailCard } from "@/components/product/productDetailCard";


export const ProductDetail: React.FC = () => {
  const params = useParams();
  const productId = parseInt(params.id || "0", 10);
  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-neutral-200" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <h1 className="text-xl font-light tracking-[0.3em] uppercase mb-8">Product Not Found</h1>
        <Link to="/products" className="text-[10px] uppercase tracking-[0.2em] border-b border-neutral-900 pb-1">
          Back to Shop
        </Link>
      </div>
    );
  }

  return <ProductDetailCard product={product} />;
};

export default ProductDetail;
