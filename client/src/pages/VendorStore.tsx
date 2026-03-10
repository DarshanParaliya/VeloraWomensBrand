import { useRoute } from "wouter";
import { useVendorProducts } from "@/hooks/use-products";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { MapPin, Star, Award, CheckCircle2 } from "lucide-react";

export default function VendorStore() {
  const [, params] = useRoute("/vendor/:name");
  const vendorName = decodeURIComponent(params?.name || "");
  const { data: products, isLoading } = useVendorProducts(vendorName);

  // Mock vendor stats
  const productCount = products?.length || 0;
  const rating = 4.8;
  const joinedDate = "Joined 2022";

  return (
    <main className="min-h-screen pb-20">
      {/* Vendor Header */}
      <div className="relative h-[250px] md:h-[350px] bg-muted w-full overflow-hidden">
        {/* landing page hero vendor shop background */}
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=600&fit=crop" 
          alt="Vendor Storefront Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      <Container className="-mt-16 md:-mt-24 relative z-10">
        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl border border-border mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl md:text-5xl font-display font-bold shadow-lg shrink-0 border-4 border-card">
              {vendorName.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{vendorName}</h1>
                <span className="inline-flex items-center text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Vendor
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-2xl text-sm md:text-base leading-relaxed">
                Dedicated to crafting and sourcing the highest quality products. Welcome to our official store on VendorHub. We guarantee authenticity and satisfaction on every single item.
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground leading-none">{rating} / 5.0</div>
                    <div className="text-xs text-muted-foreground">Store Rating</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground leading-none">{productCount}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground leading-none">Global</div>
                    <div className="text-xs text-muted-foreground">{joinedDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductGrid 
          products={products} 
          isLoading={isLoading} 
          title={`All products from ${vendorName}`}
        />
      </Container>
    </main>
  );
}
