import { Container } from "./Container";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-display font-bold text-lg">V</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Vendor<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The premier marketplace connecting premium vendors with discerning shoppers. Quality guaranteed.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Featured</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Vendors</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Become a Vendor</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Vendor Guidelines</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Top Sellers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} VendorHub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
