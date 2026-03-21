import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux";
import { clearCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { CartSummary } from "./Cart/CartSummary";
import { PaymentMethod } from "./PaymentForm/PaymentMethod";

const Checkout: React.FC = () => {
  const { cartItems: allCartItems, totalAmount } = useAppSelector((state) => state.cart);
  const cartItems = allCartItems.filter(item => item.selected);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const shipping = 25.00; // Luxury flat rate
  const tax = totalAmount * 0.12; // Premium tax
  const finalTotal = totalAmount + shipping + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate premium payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      dispatch(clearCart());
      toast({
        title: "Order Processed",
        description: "Your luxury selection is being prepared for delivery.",
      });
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="bg-white min-h-screen py-32 animate-in fade-in zoom-in-95 duration-1000">
        <Container className="flex flex-col items-center justify-center text-center max-w-2xl px-6">
          <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-12 shadow-inner">
            <CheckCircle className="w-10 h-10 text-neutral-900" />
          </div>
          <h1 className="text-xs uppercase tracking-[0.8em] text-neutral-400 mb-6 font-medium">Confirmation</h1>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-8">Thank you for your order</h2>
          <p className="text-neutral-500 font-light leading-relaxed mb-12">
            Your transaction has been securely processed. A curated selection will be dispatched to your destination shortly. 
          </p>
          <div className="space-y-6 w-full">
            <Link to="/">
              <button className="w-full h-16 bg-neutral-900 text-white uppercase tracking-[0.6em] text-[11px] shadow-2xl hover:bg-neutral-800 transition-all active:scale-[0.98]">
                Return to Gallery
              </button>
            </Link>
            <p className="text-[10px] uppercase tracking-widest text-neutral-300">Order Ref: VL-{Math.floor(100000 + Math.random() * 900000)}</p>
          </div>
        </Container>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      <Container>
        {/* Header Navigation */}
        <div className="mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <Link to="/cart" className="group flex items-center gap-3 text-neutral-400 hover:text-neutral-900 transition-all mb-8 w-fit">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Return to Shopping Cart</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-xs uppercase tracking-[0.8em] text-neutral-400 font-medium">Transaction</h1>
              <p className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900">Finalize Order</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Section: Order Summary (Cart Summary) */}
          <div className="lg:col-span-6 space-y-16">
            <CartSummary />
            
            {/* Visual aesthetics/Divider */}
            <div className="space-y-12">
               <div className="h-px bg-neutral-100 w-full" />
               <div className="flex items-center gap-8 justify-center grayscale opacity-30 select-none">
                  <span className="text-xs font-serif italic tracking-[0.3em]">VELORA</span>
                  <span className="text-xs tracking-[0.4em] font-light">EST. 2026</span>
               </div>
            </div>
          </div>

          {/* Spacer for desktop */}
          <div className="lg:col-span-1 border-r border-neutral-50 h-full hidden lg:block" />

          {/* Section: Payment & Total Details */}
          <div className="lg:col-span-5 space-y-16">
            <div className="bg-neutral-50/30 p-10 rounded-[2rem] border border-neutral-100 shadow-sm backdrop-blur-xl animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
               <h3 className="text-lg font-light tracking-tight text-neutral-900 mb-10 border-b border-neutral-200/50 pb-6 uppercase text-center tracking-[0.5em] text-[10px]">Financial Overview</h3>
               
               <div className="space-y-6 mb-10 text-sm">
                 <div className="flex justify-between items-center text-neutral-500 font-light">
                    <span className="flex items-center gap-2 tracking-widest uppercase text-[10px]">Sub-Selection</span>
                    <span className="text-neutral-900 font-medium tabular-nums">${totalAmount.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-neutral-500 font-light">
                    <span className="flex items-center gap-2 tracking-widest uppercase text-[10px]">Global Express</span>
                    <span className="text-neutral-900 font-medium tabular-nums">${shipping.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center text-neutral-500 font-light">
                    <span className="flex items-center gap-2 tracking-widest uppercase text-[10px]">Value Added (12%)</span>
                    <span className="text-neutral-900 font-medium tabular-nums">${tax.toFixed(2)}</span>
                 </div>
               </div>

               <div className="border-t border-neutral-200 pt-8 mb-10">
                 <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-semibold">Total Commitment</span>
                       <p className="text-sm text-neutral-400 font-light">Inclusive of all local duties</p>
                    </div>
                    <span className="text-3xl font-light text-neutral-900 tabular-nums">${finalTotal.toFixed(2)}</span>
                 </div>
               </div>

               <PaymentMethod handleCheckout={handleCheckout} isProcessing={isProcessing} />
            </div>

            <div className="flex flex-col items-center gap-6 text-neutral-300">
               <div className="flex gap-4">
                  <ShieldCheck className="w-4 h-4" />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-medium">Bespoke Concierge Support Available</p>
               </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
};

export default Checkout;
