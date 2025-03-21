
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="container px-4 md:px-6">
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground text-center md:text-left max-w-md">
                Sign in to your account to continue your digital shopping experience.
              </p>
              
              <div className="hidden md:block space-y-6 mt-8">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Access Your Purchases</h3>
                    <p className="text-sm text-muted-foreground">View and download all your digital products.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Your Profile</h3>
                    <p className="text-sm text-muted-foreground">Update your account details and preferences.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Track Your Orders</h3>
                    <p className="text-sm text-muted-foreground">Check the status of your recent orders.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <AuthForm type="login" redirectPath="/" />
            </div>
          </div>
          
          {/* Admin login hint (for demo purposes) */}
          <div className="mt-8 text-center text-sm text-muted-foreground max-w-md mx-auto">
            <p>For admin access (demo only):</p>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
