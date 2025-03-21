import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
    ],
    legal: [
      { name: 'Terms', path: '/terms' },
      { name: 'Privacy', path: '/privacy' },
      { name: 'Cookies', path: '/cookies' },
    ],
  };
  
  const socialLinks = [
    { icon: <Facebook size={18} />, path: 'https://facebook.com' },
    { icon: <Twitter size={18} />, path: 'https://twitter.com' },
    { icon: <Instagram size={18} />, path: 'https://instagram.com' },
    { icon: <Github size={18} />, path: 'https://github.com' },
  ];
  
  return (
    <footer className="bg-muted py-12 mt-20">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-16">
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-sm text-muted-foreground max-w-xs">
              The premier marketplace for high-quality digital products. Trusted by creators and customers worldwide.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DigitalMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:support@digitalmarket.com" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Mail size={14} />
              <span>support@digitalmarket.com</span>
            </a>
            <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Phone size={14} />
              <span>+1 (234) 567-890</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
