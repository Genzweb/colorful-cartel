
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart as CartIcon, QrCode, Wallet, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';
import { useCartContext } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const ShoppingCart: React.FC = () => {
  const { cartItems, clearCart, getCartTotal } = useCartContext();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + tax;
  
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [cryptoPaymentOpen, setCryptoPaymentOpen] = useState(false);
  
  // Sample crypto addresses
  const cryptoAddresses = {
    Bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    Ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    Litecoin: 'LTC1234567890abcdefghijklmnopqrstuvwxyz',
    Dogecoin: 'D123456789abcdefghijklmnopqrstuvwxyz',
  };
  
  const handleCryptoSelect = (value: string) => {
    setSelectedCrypto(value);
  };
  
  const handleCopyAddress = () => {
    const address = cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses];
    navigator.clipboard.writeText(address);
    toast.success('Crypto address copied to clipboard');
  };
  
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
              
              <div className="flex flex-col space-y-2">
                <Link to="/checkout">
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Dialog open={cryptoPaymentOpen} onOpenChange={setCryptoPaymentOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      Pay with Cryptocurrency
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Cryptocurrency Payment</DialogTitle>
                      <DialogDescription>
                        Send payment to one of our cryptocurrency addresses.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Select Cryptocurrency
                        </label>
                        <Select value={selectedCrypto} onValueChange={handleCryptoSelect}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cryptocurrency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Bitcoin">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="Ethereum">Ethereum (ETH)</SelectItem>
                            <SelectItem value="Litecoin">Litecoin (LTC)</SelectItem>
                            <SelectItem value="Dogecoin">Dogecoin (DOGE)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {selectedCrypto && (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-md">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{selectedCrypto} Address</span>
                              <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>
                            </div>
                            <code className="text-xs block bg-muted p-2 rounded break-all">
                              {cryptoAddresses[selectedCrypto as keyof typeof cryptoAddresses]}
                            </code>
                          </div>
                          
                          <div className="flex justify-center">
                            <div className="text-center">
                              <div className="border p-4 inline-block rounded-md mb-2">
                                <QrCode className="h-40 w-40" />
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Scan QR code with your wallet app
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            <p>Please send exactly <strong>${total.toFixed(2)}</strong> worth of {selectedCrypto} to the address above.</p>
                            <p className="mt-1">After sending payment, please click the button below to notify us.</p>
                          </div>
                          
                          <Button className="w-full" onClick={() => {
                            toast.success('Payment notification sent! We will verify your transaction.');
                            setCryptoPaymentOpen(false);
                          }}>
                            I've Sent the Payment
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
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
