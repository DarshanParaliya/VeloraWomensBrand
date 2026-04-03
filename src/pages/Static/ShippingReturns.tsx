import React from "react";
import { Container } from "@/components/layout/Container";
import { Truck, RotateCcw, ShieldCheck, Globe } from "lucide-react";
import { motion } from "framer-motion";

const ShippingReturns: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">Shipping & Returns</h1>
            <p className="text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
              We strive to deliver your Velora essentials as swiftly and sustainably as possible. 
              Our global logistics network is optimized for minimal carbon impact.
            </p>
          </motion.div>

          {/* Shipping Info */}
          <section className="mb-24 space-y-12">
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4 flex items-center gap-3">
              <Truck className="w-4 h-4" /> Shipping Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-lg font-light text-neutral-900">Standard Shipping</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Domestic orders are typically delivered within 3-5 business days. 
                  Free standard shipping on all orders over $150.
                </p>
                <p className="text-[10px] font-bold text-neutral-900">$10 Flat Rate for orders below $150.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-light text-neutral-900">Express Delivery</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  Need it sooner? Express shipping delivers within 1-2 business days.
                </p>
                <p className="text-[10px] font-bold text-neutral-900">$25 Flat Rate for express shipping.</p>
              </div>
            </div>
            <div className="p-8 bg-neutral-50 rounded-xl">
               <div className="flex items-center gap-4 mb-4">
                 <Globe className="w-5 h-5 text-neutral-400" />
                 <h3 className="text-lg font-light text-neutral-900">International Shipping</h3>
               </div>
               <p className="text-sm text-neutral-500 font-light leading-relaxed">
                 We ship to over 50 countries worldwide. International shipping rates and duties 
                 are calculated at checkout based on your delivery address. Typical delivery 
                 timeframe: 7-14 business days.
               </p>
            </div>
          </section>

          {/* Returns Policy */}
          <section className="space-y-12">
            <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4 flex items-center gap-3">
              <RotateCcw className="w-4 h-4" /> Returns & Exchanges
            </h2>
            <div className="space-y-8">
              <p className="text-lg text-neutral-800 font-light leading-relaxed">
                We accept returns within 30 days of delivery, provided the items are in their 
                original, unworn condition with all tags attached.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900">1. Initiating</h4>
                   <p className="text-sm text-neutral-400 font-light">
                     Visit our returns portal and enter your order number.
                   </p>
                </div>
                <div className="space-y-3">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900">2. Packaging</h4>
                   <p className="text-sm text-neutral-400 font-light">
                     Place items in our compostable mailer or original box.
                   </p>
                </div>
                <div className="space-y-3">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-900">3. Mailing</h4>
                   <p className="text-sm text-neutral-400 font-light">
                     Drop off at any authorized carrier point.
                   </p>
                </div>
              </div>

              <div className="p-6 border border-neutral-100 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-neutral-900 shrink-0" />
                <p className="text-xs text-neutral-500 font-light leading-relaxed italic">
                  Note: Final sale items, personalized products, and intimate apparel are not eligible 
                  for return due to hygiene and environmental sustainability concerns.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default ShippingReturns;
