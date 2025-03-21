
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import Logo from '../ui/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartContext } from '@/context/CartContext';
import { useAuthContext } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCartContext();
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo size={isScrolled ? 'sm' : 'md'} />
            
            <div className="hidden md:flex ml-10 space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground/80'
                  } link-underline`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 h-9 bg-background rounded-full"
              />
            </div>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.name || 'Account'}</span>
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-2">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex-1 py-6 space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`block py-2 px-4 rounded-md hover:bg-muted ${
                            location.pathname === link.path ? 'bg-muted' : ''
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="py-6 border-t">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <Link to="/profile">
                          <Button variant="outline" className="w-full justify-start gap-2">
                            <User className="h-4 w-4" />
                            My Account
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link to="/login">
                          <Button className="w-full">Sign In</Button>
                        </Link>
                        <Link to="/register">
                          <Button variant="outline" className="w-full">Register</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
