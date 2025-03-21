
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  const categories = [
    {
      name: 'Streaming',
      count: 28,
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1940&auto=format&fit=crop',
      description: 'Access to premium streaming platforms for movies, TV shows and more.'
    },
    {
      name: 'Music',
      count: 35,
      image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop',
      description: 'Premium music streaming accounts with unlimited access to millions of songs.'
    },
    {
      name: 'Adult',
      count: 42,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop',
      description: 'Premium access to adult content platforms with exclusive benefits.'
    },
    {
      name: 'Gaming',
      count: 54,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
      description: 'Game accounts with premium features, subscriptions and exclusive content.'
    },
    {
      name: 'VPN',
      count: 18,
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932&auto=format&fit=crop',
      description: 'Secure your online privacy with premium VPN account access.'
    },
    {
      name: 'Antivirus',
      count: 15,
      image: 'https://images.unsplash.com/photo-1614064548237-096d8b3b70ff?q=80&w=2070&auto=format&fit=crop',
      description: 'Protect your devices with premium antivirus software accounts.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Browse Categories</Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Find Your Premium Accounts
            </h1>
            <p className="text-muted-foreground">
              Explore our wide range of premium digital accounts categorized for easy discovery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary">{category.count} Products</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
