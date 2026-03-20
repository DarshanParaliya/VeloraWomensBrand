import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "../Container";
import { BRAND_NAME, NAV_LINKS } from "./constants";
import { NavItem } from "./types";
import { useAppSelector } from "@/hooks/use-redux";
import { useNavigate } from "react-router-dom";

export interface NavbarProps {
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link: NavItem) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium tracking-widest uppercase hover:text-neutral-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] cursor-pointer">
              {BRAND_NAME}
            </h1>
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button
              onClick={onSearchClick}
              className="hidden sm:block hover:opacity-60 transition-opacity"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => navigate("/wishlist")}
              className="relative hover:opacity-60 transition-opacity"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigate("/cart")}
              className="relative hover:opacity-60 transition-opacity group"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-cyan-500 to-emerald-400 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button className="md:hidden hover:opacity-60 transition-opacity">
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};
