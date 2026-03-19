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

import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useState } from "react";

function Router() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar onSearchClick={() => setIsSearchOpen(true)} />
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/seller/:name" element={<SellerStore />} />
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
