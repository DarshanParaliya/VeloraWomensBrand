import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { removeItem, updateQuantity, CartItem } from "@/store/cartSlice";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const CartSummary: React.FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-neutral-50/50 rounded-3xl border border-dashed border-neutral-200">
        <ShoppingBag className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
        <p className="text-neutral-500 font-light italic">Your selection is currently empty.</p>
        <Link to="/shop" className="text-xs uppercase tracking-widest text-neutral-900 mt-4 inline-block border-b border-neutral-900 pb-1 font-medium">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-6">
        <h2 className="text-2xl font-light tracking-tight text-neutral-900">Review Selection</h2>
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">{cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}</span>
      </div>

      <div className="space-y-10">
        {cartItems.map((item: CartItem) => (
          <div key={`${item.product.id}-${item.size || 'no-size'}`} className="group relative flex gap-8 items-start">
            <Link to={`/product/${item.product.id}`} className="relative w-32 h-44 overflow-hidden bg-neutral-100 flex-shrink-0">
              <img 
                src={item.product.image} 
                alt={item.product.title} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              />
            </Link>

            <div className="flex-1 flex flex-col justify-between min-h-[176px] py-1 overflow-hidden">
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <Link to={`/product/${item.product.id}`} className="space-y-1 block group/info overflow-hidden">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium group-hover/info:text-neutral-600 transition-colors uppercase truncate">{item.product.vendor}</p>
                    <h3 className="text-lg font-light text-neutral-900 leading-tight group-hover/info:text-neutral-500 transition-colors line-clamp-2">{item.product.title}</h3>
                    {item.size && (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium mt-1">
                        Size: <span className="text-neutral-900">{item.size}</span>
                      </p>
                    )}
                  </Link>
                  <button 
                    onClick={() => dispatch(removeItem({ id: item.product.id, size: item.size }))}
                    className="p-2 text-neutral-300 hover:text-neutral-900 transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm font-medium text-neutral-900">${Number(item.product.price).toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center bg-white border border-neutral-100 p-1 group-hover:border-neutral-200 transition-colors">
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.product.id, size: item.size, quantity: Math.max(1, item.quantity - 1) }))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-medium text-neutral-900 tabular-nums">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.product.id, size: item.size, quantity: item.quantity + 1 }))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-900 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-base font-medium text-neutral-900 tabular-nums">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
