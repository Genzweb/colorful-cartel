
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShoppingCart from '@/components/cart/ShoppingCart';

const Cart: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <ShoppingCart />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
