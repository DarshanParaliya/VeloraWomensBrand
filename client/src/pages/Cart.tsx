import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { Link } from "wouter";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  if (items.length === 0) {
    return (
      <Container className="py-24 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Discover amazing products from our vendors.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">
            Start Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <main className="py-12 md:py-20 bg-muted/10 min-h-screen">
      <Container>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="bg-card rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6 border border-border shadow-sm">
                <Link href={`/product/${item.product.id}`} className="shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link href={`/vendor/${item.product.vendor}`} className="text-sm text-primary font-medium hover:underline mb-1 inline-block">
                        {item.product.vendor}
                      </Link>
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground line-clamp-2 hover:text-primary transition-colors">
                          {item.product.title}
                        </h3>
                      </Link>
                    </div>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-input rounded-full px-1 bg-background h-10 w-28">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }))}
                        className="w-8 h-8 flex items-center justify-center font-medium text-muted-foreground hover:text-foreground"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center font-semibold text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                        className="w-8 h-8 flex items-center justify-center font-medium text-muted-foreground hover:text-foreground"
                      >
                        +
                      </button>
                    </div>
                    
                    <span className="font-bold text-lg text-foreground">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md sticky top-28">
              <h2 className="text-2xl font-display font-bold mb-6 text-foreground">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm sm:text-base">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span className="font-medium text-foreground">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right">USD inclusive of VAT if applicable</p>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20">
                  Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
