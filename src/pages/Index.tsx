
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, Zap, Award } from 'lucide-react';

const Index: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Transactions',
      description: 'All payments are encrypted and secure. We never store your credit card details.',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Instant Delivery',
      description: 'Receive your digital products instantly after purchase via email.',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'High-Quality Products',
      description: 'Curated selection of premium digital products from top creators.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Satisfaction Guarantee',
      description: 'Not satisfied? We offer a 30-day money-back guarantee on all purchases.',
    },
  ];

  const categories = [
    {
      name: 'UI Templates',
      count: 128,
      image: 'https://images.unsplash.com/photo-1601158935942-52255782d322?q=80&w=1936&auto=format&fit=crop',
    },
    {
      name: 'Stock Photos',
      count: 256,
      image: 'https://images.unsplash.com/photo-1595859703065-2259982784bb?q=80&w=1974&auto=format&fit=crop',
    },
    {
      name: 'Icons & Graphics',
      count: 512,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    },
    {
      name: 'Fonts',
      count: 64,
      image: 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                The Best Digital Marketplace
              </h2>
              <p className="text-muted-foreground">
                We offer high-quality digital products, secure transactions, and excellent customer support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background hover-scale">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedProducts />
        
        {/* Categories section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4">Categories</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Browse By Category
              </h2>
              <p className="text-muted-foreground">
                Explore our wide range of digital products categorized for easy discovery.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <a 
                  key={index} 
                  href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative rounded-xl overflow-hidden aspect-square hover-scale"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-medium text-white">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} Products</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                What Our Customers Say
              </h2>
              <p className="text-muted-foreground">
                Don't just take our word for it, hear from our satisfied customers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="bg-muted/30 hover-scale">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                        <img 
                          src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${index + 1}.jpg`}
                          alt="Customer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {index === 0 ? 'Sarah Johnson' : index === 1 ? 'Michael Chen' : 'Emma Wilson'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {index === 0 ? 'Designer' : index === 1 ? 'Developer' : 'Marketer'}
                        </p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">
                      {index === 0 
                        ? "The quality of digital products I've purchased here is outstanding. Saved me hours of work!" 
                        : index === 1 
                          ? "Great platform with excellent customer service. The checkout process was seamless."
                          : "I've been using templates from this site for my business. Highly recommend!"
                      }
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
