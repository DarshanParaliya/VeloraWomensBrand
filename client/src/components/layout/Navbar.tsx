import { Link } from "wouter";
import { ShoppingCart, Heart, Search, Menu, User } from "lucide-react";
import { useAppSelector } from "@/hooks/use-redux";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-background border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-display font-bold text-xl">V</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground hidden sm:block">
                Vendor<span className="text-primary">Hub</span>
              </span>
            </Link>

            <div className="hidden md:flex relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search products, vendors, categories..."
                className="pl-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary/20 rounded-full h-11"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/wishlist" className="relative p-2 text-foreground/80 hover:text-primary transition-colors">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link href="/cart" className="relative p-2 text-foreground/80 hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartQuantity > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartQuantity}
                </span>
              )}
            </Link>

            <div className="hidden sm:block w-px h-6 bg-border mx-2" />
            
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full text-foreground/80">
              <User className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
