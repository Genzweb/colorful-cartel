
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will get back to you soon!",
    });
  };
  
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email Us',
      details: 'support@premiumaccounts.com',
      action: 'mailto:support@premiumaccounts.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Call Us',
      details: '+1 (234) 567-890',
      action: 'tel:+12345678901'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Location',
      details: 'Digital Marketplace Inc, NY, USA',
      action: '#'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: 'Working Hours',
      details: 'Mon-Fri: 9AM-6PM EST',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4">Get In Touch</Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground">
              Have questions about our premium accounts? Our team is here to help you 24/7.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((item, index) => (
              <a 
                key={index} 
                href={item.action}
                className="block"
              >
                <Card className="p-6 text-center hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.details}</p>
                </Card>
              </a>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Card className="p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Account inquiry" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="I'd like to know more about..." 
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </Card>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "How do I receive my account details after purchase?",
                      a: "Your account details will be sent to your email immediately after your payment is confirmed."
                    },
                    {
                      q: "Are these accounts legal?",
                      a: "All accounts are obtained through legitimate methods and are completely legal to use."
                    },
                    {
                      q: "What if my account stops working?",
                      a: "We offer a 30-day warranty on all accounts. If your account stops working, contact us for a free replacement."
                    },
                    {
                      q: "Can I change the password on my account?",
                      a: "For security reasons, we recommend not changing the password on your account as this may cause it to stop working."
                    },
                  ].map((faq, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground text-sm">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Guarantee</h2>
                <p className="text-muted-foreground mb-4">
                  We stand behind the quality of our accounts and offer a 30-day warranty on all purchases. 
                  If you encounter any issues, our support team is ready to assist you.
                </p>
                <Button variant="outline" asChild>
                  <a href="/about">Learn More About Us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
