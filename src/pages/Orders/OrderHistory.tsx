import React from "react";
import { Container } from "@/components/layout/Container";
import { Package, ChevronRight, Clock, MapPin, Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  {
    id: "VEL-2026-0042",
    date: "March 20, 2026",
    total: "$380.00",
    status: "Processing",
    items: [
      { name: "Organic Linen Blazer", price: "$220", image: "https://images.unsplash.com/photo-1591047139829-d91aec36adcd?q=80&w=1470&auto=format&fit=crop" },
      { name: "Silk Slip Dress", price: "$160", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1470&auto=format&fit=crop" }
    ]
  },
  {
    id: "VEL-2026-0015",
    date: "March 15, 2026",
    total: "$120.00",
    status: "Delivered",
    items: [
      { name: "Minimalist Tote Bag", price: "$120", image: "https://images.unsplash.com/photo-1584917033904-49ce695ae693?q=80&w=1470&auto=format&fit=crop" }
    ]
  },
  {
    id: "VEL-2025-0988",
    date: "December 12, 2025",
    total: "$450.00",
    status: "Delivered",
    items: [
      { name: "Recycled Wool Coat", price: "$450", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1374&auto=format&fit=crop" }
    ]
  }
];

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4 text-neutral-900">My Orders</h1>
              <p className="text-sm text-neutral-400 font-light tracking-widest uppercase">Manage your luxury selections and track delivery status.</p>
            </div>
            
            <div className="relative w-full md:w-80">
               <input 
                 type="text" 
                 placeholder="Search Order ID..." 
                 className="w-full border-b border-neutral-200 py-3 pl-8 text-sm outline-none focus:border-black transition-colors font-light"
               />
               <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-8">
            {mockOrders.map((order) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group border border-neutral-100 rounded-2xl overflow-hidden hover:border-black transition-all cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                 {/* Order Top Bar */}
                 <div className="bg-neutral-50 p-6 flex flex-wrap items-center justify-between gap-6 border-b border-neutral-100">
                    <div className="flex gap-12">
                       <div>
                         <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">Order Placed</span>
                         <span className="text-sm font-light text-neutral-900">{order.date}</span>
                       </div>
                       <div>
                         <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">Total Amount</span>
                         <span className="text-sm font-bold text-neutral-900">{order.total}</span>
                       </div>
                       <div>
                         <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">Status</span>
                         <span className={`text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full ${
                           order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'
                         }`}>
                           {order.status}
                         </span>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">Order ID</span>
                       <span className="text-sm font-bold text-neutral-900">{order.id}</span>
                    </div>
                 </div>

                 {/* Order Content */}
                 <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex -space-x-4">
                       {order.items.map((item, idx) => (
                         <div key={idx} className="w-20 h-24 rounded-lg overflow-hidden border-4 border-white shadow-sm hover:translate-y-[-8px] transition-transform duration-500 hover:z-10 relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale saturate-[0.5]" />
                         </div>
                       ))}
                    </div>

                    <div className="flex-1 max-w-md">
                       <p className="text-sm text-neutral-500 font-light leading-relaxed">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''} in this order. 
                          {order.status === 'Processing' ? ' Your luxury selection is being prepared with care.' : ' Successfully delivered to your doorstep.'}
                       </p>
                    </div>

                    <div className="flex gap-8">
                       <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 hover:text-black transition-colors">
                          View Details
                       </button>
                       <button className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 group-hover:gap-5 transition-all">
                          Track Order <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State Help */}
          <div className="mt-32 p-12 bg-neutral-50 rounded-3xl text-center space-y-6">
             <Package className="w-8 h-8 text-neutral-300 mx-auto" />
             <h3 className="text-2xl font-light italic serif text-neutral-900">Looking for a guest order?</h3>
             <p className="text-sm text-neutral-500 font-light max-w-md mx-auto">
               If you placed an order as a guest, please check your confirmation email for a direct link to your order status.
             </p>
             <button className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 pt-4">Track Via Email</button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderHistory;
