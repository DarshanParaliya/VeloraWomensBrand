import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldCheck, Mail, MapPin, X, Home, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  handleCheckout: (e: React.FormEvent) => void;
  isProcessing: boolean;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ handleCheckout, isProcessing }) => {
  const [address, setAddress] = useState({
    fullName: "Jane Doe",
    building: "Luxury Suite 12A",
    street: "Fifth Avenue 721",
    landmark: "Trump Tower",
    city: "New York",
    state: "NY",
    pincode: "10022"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(tempAddress);
    setIsModalOpen(false);
  };
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-6 mb-10">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900">Secure Checkout</h2>
        <ShieldCheck className="w-5 h-5 text-neutral-900" />
      </div>

      <form onSubmit={handleCheckout} id="checkout-form" className="space-y-16">
        

        {/* Shipping details - Compact Version */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-medium flex items-center gap-3">
              <MapPin className="w-3 h-3" />
              Shipping Destination
            </label>
          </div>

          <div className="bg-white border border-neutral-100 p-8 rounded-[1.5rem] shadow-sm space-y-6 relative group hover:border-neutral-900 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-between items-start">
                <div className="space-y-4 flex-1">
                   <div className="space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium italic">Recipient</p>
                      <h4 className="text-xl font-light tracking-tight text-neutral-900 font-display uppercase tracking-widest">{address.fullName}</h4>
                   </div>
                   <div className="space-y-1 max-w-sm">
                      <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-medium italic">Address Details</p>
                      <p className="text-[13px] text-neutral-500 font-light leading-relaxed line-clamp-2 uppercase tracking-wide">
                        {address.building}, {address.street}, {address.city}, {address.state} — {address.pincode}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-light uppercase tracking-widest mt-1">
                        Near {address.landmark}
                      </p>
                   </div>
                </div>
                <button 
                  type="button"
                  onClick={() => {
                    setTempAddress(address);
                    setIsModalOpen(true);
                  }} 
                  className="text-[10px] uppercase tracking-[0.3em] text-neutral-900 border-b border-neutral-200 pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-all font-bold"
                >
                  Edit Address
                </button>
             </div>
             
             {/* Hidden inputs to maintain form functionality for handleCheckout if needed */}
             <div className="hidden">
               <input readOnly name="fullName" value={address.fullName} />
               <input readOnly name="address" value={`${address.building}, ${address.street}`} />
             </div>
          </div>
        </div>

        {/* Address Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
                onClick={() => setIsModalOpen(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[2.5rem] p-12 shadow-2xl overflow-hidden border border-neutral-100"
              >
                <div className="flex justify-between items-center mb-12">
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-[0.6em] text-neutral-400 font-medium">Localization</h3>
                    <p className="text-3xl font-light tracking-tight text-neutral-900">Update Address</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 bg-neutral-50 rounded-full hover:bg-neutral-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-900" />
                  </button>
                </div>

                <form onSubmit={handleSaveAddress} className="space-y-10">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-neutral-400">Full Name</label>
                      <Input 
                        value={tempAddress.fullName}
                        onChange={(e) => setTempAddress({...tempAddress, fullName: e.target.value})}
                        className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                        required
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-neutral-400">Building / Apartment</label>
                      <Input 
                        value={tempAddress.building}
                        onChange={(e) => setTempAddress({...tempAddress, building: e.target.value})}
                        className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                        required
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-neutral-400">Street / Area</label>
                      <Input 
                        value={tempAddress.street}
                        onChange={(e) => setTempAddress({...tempAddress, street: e.target.value})}
                        className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                        required
                      />
                    </div>
                    <div className="col-span-2 space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-neutral-400">Landmark</label>
                      <Input 
                        value={tempAddress.landmark}
                        onChange={(e) => setTempAddress({...tempAddress, landmark: e.target.value})}
                        className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                        placeholder="e.g. Near Central Park"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-neutral-400">City</label>
                      <Input 
                        value={tempAddress.city}
                        onChange={(e) => setTempAddress({...tempAddress, city: e.target.value})}
                        className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-neutral-400">State</label>
                        <Input 
                          value={tempAddress.state}
                          onChange={(e) => setTempAddress({...tempAddress, state: e.target.value})}
                          className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-neutral-400">Pincode</label>
                        <Input 
                          value={tempAddress.pincode}
                          onChange={(e) => setTempAddress({...tempAddress, pincode: e.target.value})}
                          className="rounded-none border-0 border-b border-neutral-100 focus-visible:ring-0 focus-visible:border-neutral-900 h-10 px-0 bg-transparent text-sm font-light"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 h-14 bg-neutral-50 text-neutral-900 uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-100 transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-2 h-14 bg-neutral-900 text-white uppercase tracking-[0.4em] text-[10px] hover:bg-neutral-800 transition-all px-12 font-medium"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
