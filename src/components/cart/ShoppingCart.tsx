
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart as CartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';
import { useCartContext } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

const ShoppingCart: React.FC = () => {
  const { cartItems, clearCart, getCartTotal } = useCartContext();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + tax;
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <CartIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart ({cartItems.length})</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={clearCart}
        >
          Clear Cart
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="space-y-1">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-8">
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        
        <div>
          <div className="bg-muted/30 rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout">
                <Button className="w-full mt-4">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout powered by Stripe. 
                We accept credit cards, PayPal, and cryptocurrencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
