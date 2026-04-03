import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Provider } from "react-redux";
import { store } from "@/store";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home/Home";
import ProductDetail from "@/pages/Product/ProductDetail/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import SellerStore from "@/pages/SellerStore/SellerStore";
import ProductList from "@/pages/ProductList/ProductList";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import { Wishlist } from "@/pages/Wishlist";
import { Journal } from "@/pages/Journal/Journal";
import { JournalDetail } from "@/pages/Journal/JournalDetail";
import Sustainability from "@/pages/Sustainability/Sustainability";
import Careers from "@/pages/Careers/Careers";
import JobDetail from "@/pages/Careers/JobDetail";
import ShippingReturns from "@/pages/Static/ShippingReturns";
import SizeGuide from "@/pages/Static/SizeGuide";
import FAQ from "@/pages/Static/FAQ";
import PrivacyPolicy from "@/pages/Static/PrivacyPolicy";
import OrderHistory from "@/pages/Orders/OrderHistory";
import OrderTracking from "@/pages/Orders/OrderTracking";
import Auth from "@/pages/Auth/Auth";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";
import Profile from "@/pages/Account/Profile";

import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useState } from "react";
import { useAppSelector } from "@/hooks/use-redux";

function Router() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth?redirect=/profile" replace />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/seller/:name" element={<SellerStore />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<JournalDetail />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/:id" element={<JobDetail />} />
            <Route path="/shipping" element={<ShippingReturns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            
            {/* Protected Order Routes */}
            <Route 
              path="/orders" 
              element={isAuthenticated ? <OrderHistory /> : <Navigate to="/auth?redirect=/orders" replace />} 
            />
            <Route 
              path="/orders/:id" 
              element={isAuthenticated ? <OrderTracking /> : <Navigate to="/auth?redirect=/orders" replace />} 
            />

            <Route path="/shop" element={<Navigate to="/products" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
