import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, Mail, MapPin, Navigation } from "lucide-react";

interface PaymentMethodProps {
  handleCheckout: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ handleCheckout, isProcessing }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-6 mb-10">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900">Secure Checkout</h2>
        <ShieldCheck className="w-5 h-5 text-neutral-900" />
      </div>

      <form onSubmit={handleCheckout} id="checkout-form" className="space-y-16">
        {/* Contact Info */}
        <div className="space-y-6">
          <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-medium flex items-center gap-3">
            <Mail className="w-3 h-3" />
            Contact Delivery
          </label>
          <div className="relative group">
            <Input 
              type="email" 
              placeholder="jane.doe@luxury.com" 
              required 
              className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 font-light h-14" 
            />
          </div>
        </div>

        {/* Shipping details */}
        <div className="space-y-8">
          <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-medium flex items-center gap-3">
            <MapPin className="w-3 h-3" />
            Shipping Destination
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-1 group">
               <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">First Name</label>
               <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="Jane" />
            </div>
            <div className="space-y-1">
               <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">Last Name</label>
               <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="Doe" />
            </div>
            <div className="md:col-span-2 space-y-1">
               <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">Street Address</label>
               <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="Luxury Lane 123" />
            </div>
            <div className="space-y-1">
               <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">City</label>
               <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="Manhattan" />
            </div>
            <div className="space-y-1">
               <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">ZIP / Postal</label>
               <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="10001" />
            </div>
          </div>
        </div>

        {/* Payment Mock */}
        <div className="space-y-8 bg-neutral-50/50 p-10 rounded-3xl border border-neutral-100 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-neutral-200 transition-all duration-500">
           <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-medium flex items-center gap-3">
             <CreditCard className="w-3 h-3" />
             Private Card Details
           </label>
           <div className="space-y-8">
              <div className="space-y-1">
                 <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">Card Number</label>
                 <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light tracking-widest" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-10">
                 <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">Expiry Date</label>
                    <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="MM / YY" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-neutral-400 ml-1">CVV</label>
                    <Input required className="rounded-none border-0 border-b border-neutral-200 focus-visible:ring-0 focus-visible:border-neutral-900 transition-all px-0 bg-transparent placeholder:text-neutral-300 h-12 font-light" placeholder="123" />
                 </div>
              </div>
           </div>
        </div>

        <div className="pt-8">
          <Button 
            disabled={isProcessing} 
            type="submit" 
            className="w-full h-16 rounded-none bg-neutral-900 text-white uppercase tracking-[0.6em] text-[11px] hover:bg-neutral-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] border border-neutral-900 group overflow-hidden relative"
          >
            <span className="relative z-10">{isProcessing ? "Processing Submission..." : "Complete Purchase"}</span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Button>
          <p className="text-center text-[9px] uppercase tracking-[0.3em] text-neutral-400 mt-6 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            Encrypted & Secure Transaction
          </p>
        </div>
      </form>
    </div>
  );
};
