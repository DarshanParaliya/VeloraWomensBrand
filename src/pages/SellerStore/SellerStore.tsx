import React from "react";
import { useRoute } from "wouter";
import { useVendorProducts } from "@/hooks/use-products";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { MapPin, Star, ShieldCheck } from "lucide-react";
import { SELLER_STORE_CONFIG, DEFAULT_MOCK_STATS } from "./constants";

export const SellerStore: React.FC = () => {
  const [, params] = useRoute("/seller/:name");
  const sellerName = decodeURIComponent(params?.name || "Premium Seller");
  const { data: products, isLoading } = useVendorProducts(sellerName);

  const productCount = products?.length || 0;

  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Editorial Header */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden bg-neutral-100">
        <img 
          src={SELLER_STORE_CONFIG.bannerImage} 
          alt="Seller Banner" 
          className="w-full h-full object-cover grayscale opacity-80"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <Container>
        <div className="-mt-32 relative z-10">
          <div className="bg-white p-12 md:p-16 border border-neutral-100 shadow-sm flex flex-col md:flex-row gap-16 items-start">
            {/* Identity */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-neutral-900">
                  {sellerName}
                </h1>
                {DEFAULT_MOCK_STATS.isVerified && (
                  <ShieldCheck size={20} className="text-neutral-400" strokeWidth={1.5} />
                )}
              </div>
              
              <p className="text-neutral-500 font-light leading-relaxed max-w-2xl text-lg">
                {SELLER_STORE_CONFIG.defaultDescription}
              </p>

              <div className="flex flex-wrap gap-12 pt-4">
                <div className="flex items-center gap-3">
                  <Star size={16} className="text-neutral-300" />
                  <div>
                    <p className="text-xs font-bold tracking-widest text-neutral-900">{DEFAULT_MOCK_STATS.rating}</p>
                    <p className="text-[10px] tracking-widest text-neutral-400 uppercase">Rating</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-neutral-300" />
                  <div>
                    <p className="text-xs font-bold tracking-widest text-neutral-900">{DEFAULT_MOCK_STATS.location}</p>
                    <p className="text-[10px] tracking-widest text-neutral-400 uppercase">Location</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold tracking-widest text-neutral-900">{productCount}</div>
                  <p className="text-[10px] tracking-widest text-neutral-400 uppercase">Collections</p>
                </div>
              </div>
            </div>

            {/* Logo Silhouette */}
            <div className="hidden md:flex w-32 h-32 items-center justify-center border border-neutral-100 rounded-full text-4xl font-light tracking-tighter text-neutral-200">
               {sellerName.charAt(0)}
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
             <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 mb-4">Maison {sellerName}</h2>
             <p className="text-2xl font-light tracking-widest uppercase">The Entire Collection</p>
          </div>
          <ProductGrid 
            products={products || []} 
            isLoading={isLoading} 
          />
        </div>
      </Container>
    </main>
  );
};

export default SellerStore;
