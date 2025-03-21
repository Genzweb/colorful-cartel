
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 -z-10" />
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="text-primary font-medium">Premium Accounts Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Premium Accounts at Affordable Prices
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Get instant access to premium streaming, music, adult content, gaming, VPN, and antivirus accounts at unbeatable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                  Browse Accounts
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Categories
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full max-w-5xl relative mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10 transition-all duration-300 hover:shadow-accent/20 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 opacity-0 hover:opacity-10 transition-opacity z-10" />
              <img 
                src="https://images.unsplash.com/photo-1603383928972-2116518cd3f3?q=80&w=2000&auto=format&fit=crop"
                alt="Premium accounts showcase" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass-card px-8 py-4 rounded-xl flex gap-10 shadow-lg">
              <div className="text-center">
                <p className="text-2xl font-bold">10k+</p>
                <p className="text-sm text-muted-foreground">Accounts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">8k+</p>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">99%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
