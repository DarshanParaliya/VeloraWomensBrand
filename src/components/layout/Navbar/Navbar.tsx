import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Search, Menu, User, ChevronDown, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../Container";
import { BRAND_NAME, NAV_LINKS } from "./constants";
import { NavItem } from "./types";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice";

export interface NavbarProps {
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate("/");
  };

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
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-center">
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.3em] cursor-pointer">
              {BRAND_NAME}
            </h1>
            {isAuthenticated && user && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-neutral-400 block -mt-1"
              >
                Welcome, {user.name}
              </motion.span>
            )}
          </Link>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button
              onClick={onSearchClick}
              className="hidden sm:block hover:opacity-60 transition-opacity"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            {/* User Profile Hook */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 hover:opacity-60 transition-opacity"
              >
                <User size={20} strokeWidth={1.5} />
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isProfileOpen ? "rotate-180" : "rotate-0")} strokeWidth={1.5} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4 w-56 bg-white border border-neutral-100 rounded-2xl shadow-2xl p-2 z-[60] overflow-hidden"
                  >
                    {!isAuthenticated ? (
                      <>
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate("/auth");
                          }}
                          className="w-full text-left p-4 hover:bg-neutral-50 rounded-xl transition-colors group"
                        >
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-black transition-colors block mb-1">Access</span>
                          <span className="text-sm font-medium text-black">Login / Sign-up</span>
                        </button>
                        <div className="bg-neutral-50 mx-2 p-3 rounded-xl mb-1">
                          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold leading-relaxed">
                            Join Velora for exclusive access and tracking.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate("/profile");
                          }}
                          className="w-full text-left p-4 hover:bg-neutral-50 rounded-xl transition-colors group"
                        >
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-black transition-colors block mb-1">Account</span>
                          <span className="text-sm font-medium text-black">My Profile</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate("/orders");
                          }}
                          className="w-full text-left p-4 hover:bg-neutral-50 rounded-xl transition-colors group"
                        >
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-black transition-colors block mb-1">Purchases</span>
                          <span className="text-sm font-medium text-black">Your Orders</span>
                        </button>
                        <div className="h-px bg-neutral-100 my-1 mx-2" />
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left p-4 hover:bg-red-50 rounded-xl transition-colors group flex items-center justify-between"
                        >
                          <span className="text-sm font-medium text-red-600">Sign Out</span>
                          <LogOut size={14} className="text-red-600" />
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
