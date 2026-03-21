import { Container } from "@/components/layout/Container";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { removeItem, updateQuantity, CartItem, toggleSelectItem, selectAllItems, clearCart } from "@/store/cartSlice";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

export default function Cart() {
  const { cartItems, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const allSelected = cartItems.length > 0 && cartItems.every(item => item.selected);
  const someSelected = cartItems.some(item => item.selected);

  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen py-32 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
        <Container className="text-center max-w-lg px-6">
          <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-10 mx-auto shadow-inner">
            <ShoppingBag className="w-10 h-10 text-neutral-300" />
          </div>
          <h1 className="text-xs uppercase tracking-[0.8em] text-neutral-400 mb-6 font-medium">Your selection</h1>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-8">Currently Empty</h2>
          <p className="text-neutral-500 font-light leading-relaxed mb-12">
            Explore our curated gallery and discover pieces that define your personal narrative.
          </p>
          <Link to="/">
            <button className="h-14 px-12 bg-neutral-900 text-white uppercase tracking-[0.6em] text-[10px] shadow-2xl hover:bg-neutral-800 transition-all active:scale-[0.98]">
              Continue Shopping
            </button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-24 pb-32">
      <Container>
        <div className="mb-20 animate-in fade-in slide-in-from-top-4 duration-700 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-xs uppercase tracking-[0.8em] text-neutral-400 mb-4 font-medium">Shopping Bag</h1>
            <p className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900">Review Selection ({cartItems.length})</p>
          </div>
          <div className="flex items-center gap-10 pb-2">
            <button 
              onClick={() => dispatch(clearCart())}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 hover:text-neutral-900 border-b border-transparent hover:border-neutral-900 pb-2 transition-all"
            >
              Empty Bag <Trash2 size={14} />
            </button>
            <Checkbox 
              checked={allSelected} 
              onChange={(checked) => dispatch(selectAllItems(checked))}
              label={allSelected ? "Unselect All" : "Select All Items"}
            />
          </div>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Cart Items Column */}
          <div className="lg:col-span-8 space-y-12">
            {cartItems.map((item: CartItem) => (
              <div key={`${item.product.id}-${item.size || 'no-size'}`} className="group relative flex gap-6 sm:gap-10 pb-12 border-b border-neutral-100 last:border-0 animate-in fade-in slide-in-from-bottom-8 duration-700">
                
                {/* Checkbox Section */}
                <div className="pt-2 sm:pt-4">
                  <Checkbox 
                    checked={item.selected} 
                    onChange={() => dispatch(toggleSelectItem({ id: item.product.id, size: item.size }))} 
                  />
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {/* Image Section */}
                  <Link to={`/product/${item.product.id}`} className={cn("relative aspect-[3/4] overflow-hidden bg-neutral-50 block transition-opacity duration-500", !item.selected && "opacity-40 grayscale")}>
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                    />
                  </Link>
                  
                  {/* Content Section */}
                  <div className="sm:col-span-2 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Link to={`/product/${item.product.id}`} className="space-y-2 group/info">
                         <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-medium group-hover/info:text-neutral-600 transition-colors">{item.product.vendor}</p>
                         <h3 className="text-2xl font-light text-neutral-900 leading-tight tracking-tight group-hover/info:text-neutral-500 transition-colors">
                          {item.product.title}
                         </h3>
                         {item.size && (
                           <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium mt-1">
                             Size: <span className="text-neutral-900">{item.size}</span>
                           </p>
                         )}
                      </Link>
                      <button 
                        onClick={() => dispatch(removeItem({ id: item.product.id, size: item.size }))}
                        className="p-2 text-neutral-300 hover:text-neutral-900 transition-all transform hover:rotate-90"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="mt-auto pt-8 flex items-end justify-between">
                      <div className="space-y-4">
                         <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Quantity</p>
                         <div className="flex items-center border border-neutral-100 p-1 bg-white">
                            <button 
                              onClick={() => dispatch(updateQuantity({ id: item.product.id, size: item.size, quantity: Math.max(1, item.quantity - 1) }))}
                              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium text-neutral-900">{item.quantity}</span>
                            <button 
                              onClick={() => dispatch(updateQuantity({ id: item.product.id, size: item.size, quantity: item.quantity + 1 }))}
                              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                      
                      <div className="text-right">
                         <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Item Total</p>
                         <span className="text-xl font-medium text-neutral-900">
                          ${(Number(item.product.price) * item.quantity).toFixed(2)}
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar: Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-neutral-50/50 p-10 rounded-[2rem] border border-neutral-100 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <h2 className="text-[11px] uppercase tracking-[0.6em] font-medium text-neutral-400 mb-10 text-center">Summary Overview</h2>
              
              <div className="space-y-6 mb-10 text-sm">
                <div className="flex justify-between items-center text-neutral-500 font-light">
                  <span className="uppercase tracking-[0.2em] text-[10px]">Selected Items</span>
                  <span className="text-neutral-900 font-medium tabular-nums">{totalQuantity}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-500 font-light">
                  <span className="uppercase tracking-[0.2em] text-[10px]">Subtotal (USD)</span>
                  <span className="text-neutral-900 font-medium tabular-nums">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-500 font-light">
                  <span className="uppercase tracking-[0.2em] text-[10px]">Shipping & Tax</span>
                  <span className="text-[10px] tracking-widest italic">Wait for Checkout</span>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-8 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] uppercase tracking-[0.4em] font-semibold text-neutral-900">Est. Total</span>
                  <span className="text-3xl font-light text-neutral-900 tabular-nums">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                to={someSelected ? "/checkout" : "#"} 
                className={cn("block", !someSelected && "cursor-not-allowed pointer-events-none")}
              >
                <button 
                  disabled={!someSelected}
                  className={cn(
                    "w-full h-16 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 text-white uppercase tracking-[0.6em] text-[11px] shadow-2xl transition-all flex items-center justify-center gap-4 group border-none",
                    someSelected ? "hover:bg-neutral-800 active:scale-[0.98]" : "opacity-40 grayscale cursor-not-allowed"
                  )}
                >
                  {someSelected ? "Confirm Payment" : "Select Items to Checkout"}
                  {someSelected && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                </button>
              </Link>
              
              <p className="text-center text-[9px] uppercase tracking-[0.3em] text-neutral-300 mt-8">
                Luxury concierge shipping worldwide
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
