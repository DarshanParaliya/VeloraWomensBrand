import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/use-products";
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  // For demonstration, slice the products into featured and new arrivals
  const featuredProducts = products?.slice(0, 4);
  const newArrivals = products?.slice(4, 12);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
        
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                The Next Gen Marketplace
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-foreground leading-[1.1] mb-6">
                Discover Premium <br />
                <span className="text-gradient">Independent Brands</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Shop unique products from carefully vetted vendors worldwide. Support independent creators while enjoying guaranteed quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Start Shopping
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-2 hover:bg-muted transition-all">
                  Become a Vendor
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-green-500 w-5 h-5" /> Quality Vetted
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-accent w-5 h-5" /> Fast Delivery
                </div>
              </div>
            </div>
            
            <div className="relative lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
              {/* landing page hero fashion aesthetic */}
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1200&fit=crop" 
                alt="Fashion model showcasing premium items" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">Featured Vendor</p>
                    <p className="text-white font-display font-bold text-xl">Lumina Studio</p>
                  </div>
                  <Link href="/vendor/Lumina Studio">
                    <Button variant="secondary" size="sm" className="rounded-full font-semibold">
                      Visit Store <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop" },
              { name: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop" },
              { name: "Home & Decor", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop" },
              { name: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54c28?w=400&h=400&fit=crop" },
            ].map((cat, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-display font-bold text-xl sm:text-2xl tracking-wide">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked selections from our top vendors.</p>
            </div>
            <Link href="/" className="hidden sm:flex items-center text-primary font-semibold hover:underline">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </Container>
      </section>
      
      {/* Promo Banner */}
      <section className="py-12">
        <Container>
          <div className="rounded-3xl bg-gradient-to-r from-primary to-secondary p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800&fit=crop')] bg-cover"></div>
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">Support Independent Creators</h2>
              <p className="text-white/90 text-lg mb-8">
                When you buy from VendorHub, you're directly supporting independent businesses and creators around the world.
              </p>
              <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 font-semibold">
                Read Our Story
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="py-16 lg:py-24 bg-muted/10">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Fresh Drops</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the latest arrivals added by our community of vendors this week.
            </p>
          </div>
          <ProductGrid products={newArrivals} isLoading={isLoading} />
        </Container>
      </section>
    </main>
  );
}
