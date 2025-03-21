
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container px-4 md:px-6">
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Create an account</h1>
              <p className="text-muted-foreground text-center md:text-left max-w-md">
                Join our digital marketplace to buy, store, and manage high-quality digital products.
              </p>
              
              <div className="hidden md:block space-y-6 mt-8">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                      <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Instant Access to Digital Products</h3>
                    <p className="text-sm text-muted-foreground">Download your purchases immediately after checkout.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">Pay using credit cards, PayPal, or cryptocurrencies.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Get Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive updates on order status and new products.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <AuthForm type="register" redirectPath="/" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
