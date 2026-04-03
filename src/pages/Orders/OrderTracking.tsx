import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { ChevronRight, MapPin, Clock, Truck, Package, RotateCcw, ShieldCheck, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock specific tracking events
  const timeline = [
    { status: "Ordered", date: "March 20, 2:10 PM", icon: <Package className="w-5 h-5 flex-shrink-0" />, completed: true },
    { status: "Processing", date: "March 20, 4:45 PM", icon: <Clock className="w-5 h-5 flex-shrink-0" />, completed: true },
    { status: "Shipped", date: "Estimation March 22", icon: <Truck className="w-5 h-5 flex-shrink-0" />, completed: false },
    { status: "Delivered", date: "Expected March 24", icon: <RotateCcw className="w-5 h-5 flex-shrink-0" />, completed: false }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/orders" className="hover:text-black transition-colors">My Orders</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-black">{id}</span>
          </nav>

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-neutral-100">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4 text-neutral-900 italic serif">Track your order.</h1>
              <div className="flex items-center gap-4 text-sm text-neutral-500 font-light">
                 <span className="bg-cyan-50 text-cyan-600 px-3 py-1 font-bold rounded-lg text-[10px] uppercase tracking-widest tracking-[0.2em]">Out for Dispatch</span>
                 <span className="w-1.5 h-1.5 bg-neutral-100 rounded-full" />
                 <span>Expected by Tuesday, March 24, 2026</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
               <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">Tracker ID</span>
               <span className="text-2xl font-bold text-neutral-900">GB-2026-X42B</span>
            </div>
          </div>

          {/* Tracking Pipeline */}
          <section className="bg-neutral-50 p-12 md:p-20 rounded-3xl relative overflow-hidden">
             {/* Progress Line */}
             <div className="absolute top-1/2 left-10 md:left-20 right-10 md:right-20 h-0.5 bg-neutral-200 -translate-y-1/2 hidden md:block" />
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: "40%" }}
               transition={{ duration: 2, delay: 0.5 }}
               className="absolute top-1/2 left-20 right-20 h-0.5 bg-neutral-900 -translate-y-1/2 hidden md:block z-10"
             />

             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-20">
                {timeline.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-6">
                     <div className={`p-4 rounded-full border-4 border-white shadow-xl transition-all duration-700 ${
                       step.completed ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-400'
                     }`}>
                        {step.icon}
                     </div>
                     <div>
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-900 mb-2">{step.status}</h4>
                        <p className="text-[10px] font-bold text-neutral-400 tracking-wider leading-relaxed">{step.date}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
             {/* Items Breakdown */}
             <div className="lg:col-span-12 space-y-10">
                <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4">Order Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { name: "Organic Linen Blazer", size: "M", price: "$220", image: "https://images.unsplash.com/photo-1591047139829-d91aec36adcd?q=80&w=1470&auto=format&fit=crop" },
                     { name: "Silk Slip Dress", size: "S", price: "$160", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1470&auto=format&fit=crop" }
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-6 items-center p-6 border border-neutral-50 rounded-xl hover:border-black transition-all">
                        <div className="w-16 h-20 rounded overflow-hidden">
                           <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale saturate-[0.5]" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-lg font-light text-neutral-900 mb-1">{item.name}</h4>
                           <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">Size: {item.size}</p>
                        </div>
                        <span className="text-sm font-bold text-neutral-900">{item.price}</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Shipping & Support */}
             <div className="lg:col-span-7 space-y-20 pt-12">
                <section className="space-y-12">
                   <h2 className="text-xs uppercase tracking-[0.5em] text-neutral-400 font-bold border-b border-neutral-100 pb-4">Shipping Destination</h2>
                   <div className="flex gap-6 items-start text-neutral-900">
                      <MapPin className="w-5 h-5 mt-1 text-neutral-400 shrink-0" />
                      <div className="font-light leading-relaxed">
                         <span className="block font-bold text-[10px] uppercase tracking-widest mb-2">Darshan Paraliya</span>
                         221B Baker Street, London, <br />
                         United Kingdom, NW1 6XE <br />
                         <span className="block mt-4 text-sm text-neutral-400">+44 20 7946 0958</span>
                      </div>
                   </div>
                </section>
             </div>

             <div className="lg:col-span-5 space-y-12 pt-12">
                <div className="p-10 border border-neutral-100 space-y-10 rounded-2xl">
                   <div className="space-y-4">
                      <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-900">Need Assistance?</h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        Our client services team is ready to help with any questions regarding your delivery or order history.
                      </p>
                   </div>
                   
                   <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg group">
                         <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4" /> Message Stylist
                         </div>
                         <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg group">
                         <div className="flex items-center gap-3">
                            <MessageSquare className="w-4 h-4" /> Live Support
                         </div>
                         <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>

                   <div className="flex items-start gap-4 p-4 border border-dashed border-neutral-200 opacity-60">
                      <ShieldCheck className="w-5 h-5 text-neutral-900 shrink-0" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-900 leading-relaxed">
                         12-Month Quality Guarantee <br />
                         included on all items.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderTracking;
