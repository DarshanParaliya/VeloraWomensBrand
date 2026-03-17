import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector, useAppDispatch } from "@/hooks/use-redux";
import { clearCart } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { ShieldCheck, CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const shipping = 10.00;
  const tax = totalPrice * 0.08; // 8% mockup tax
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0 && !isSuccess) {
    setLocation("/cart");
    return null;
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      dispatch(clearCart());
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive an email confirmation shortly.",
      });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Container className="py-32 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">Thank you for your order!</h1>
        <p className="text-lg text-muted-foreground mb-10 max-w-lg">
          Your order has been confirmed and will be shipped shortly. 
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-10 h-14">
            Continue Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <main className="py-12 bg-muted/5 min-h-screen">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>
            
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
                <h2 className="text-xl font-display font-semibold mb-6">Contact Information</h2>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required className="h-12 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
                <h2 className="text-xl font-display font-semibold mb-6">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="h-12 rounded-xl" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="h-12 rounded-xl" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Street address or P.O. Box" required className="h-12 rounded-xl" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required className="h-12 rounded-xl" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" required className="h-12 rounded-xl" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" required className="h-12 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Payment Mock */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <CreditCard className="w-32 h-32" />
                </div>
                <h2 className="text-xl font-display font-semibold mb-6 relative z-10 flex items-center gap-2">
                  Payment Method <ShieldCheck className="w-5 h-5 text-green-500" />
                </h2>
                <div className="grid gap-6 relative z-10">
                  <div className="grid gap-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" required className="h-12 rounded-xl" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" required className="h-12 rounded-xl" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="exp">Expiration Date</Label>
                      <Input id="exp" placeholder="MM/YY" required className="h-12 rounded-xl" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required className="h-12 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-md sticky top-28">
              <h2 className="text-xl font-display font-bold mb-6 text-foreground">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border shrink-0 bg-muted">
                      <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{item.product.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{item.product.vendor}</p>
                    </div>
                    <div className="font-semibold text-sm">
                      ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6 pt-6 border-t border-border text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-medium text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form" 
                disabled={isProcessing}
                size="lg" 
                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20"
              >
                {isProcessing ? "Processing..." : `Pay $${finalTotal.toFixed(2)}`}
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Secure, encrypted payment
              </p>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}
