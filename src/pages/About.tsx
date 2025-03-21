
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Users, Award, Clock } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Started the company with a vision to provide affordable premium digital accounts to everyone.'
    },
    {
      name: 'Jane Doe',
      role: 'Head of Customer Support',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Dedicated to ensuring every customer query is resolved with the utmost care and attention.'
    },
    {
      name: 'David Wilson',
      role: 'Account Security Specialist',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      bio: 'Ensures all accounts are securely delivered and maintained for our customers.'
    }
  ];

  const values = [
    {
      icon: <ShieldCheck className="h-10 w-10" />,
      title: 'Trustworthy',
      description: 'We pride ourselves on our reliability and the quality of accounts we provide.'
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: 'Customer-Focused',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.'
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: 'Premium Quality',
      description: 'We only offer premium accounts with guaranteed uptime and reliability.'
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: 'Instant Delivery',
      description: 'Get immediate access to your premium accounts after purchase.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Your Premium Account Provider
            </h1>
            <p className="text-xl text-muted-foreground">
              We specialize in providing high-quality premium accounts for streaming, music, gaming, VPN, 
              and antivirus services at affordable prices.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Our Story</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-6">
                  Founded in 2020, our company started with a simple mission: to make premium digital services 
                  accessible to everyone at affordable prices.
                </p>
                <p className="text-lg mb-6">
                  We recognized that many people wanted access to premium streaming, music, gaming, and security 
                  services but were hindered by the high subscription costs.
                </p>
                <p className="text-lg">
                  Today, we've helped thousands of customers access their favorite platforms and services 
                  at a fraction of the regular cost, while maintaining a 99% satisfaction rate.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop" 
                  alt="Our office" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Our Values */}
          <div className="mb-20 bg-muted/30 py-16 px-6 rounded-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
