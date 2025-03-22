
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  CreditCard, 
  Tag, 
  Settings, 
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/ui/Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r">
        <div className="p-6">
          <Logo />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link 
            to="/admin/products" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin/products') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Package className="mr-3 h-5 w-5" />
            Products
          </Link>
          
          <Link 
            to="/admin/orders" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin/orders') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <ShoppingCart className="mr-3 h-5 w-5" />
            Orders
          </Link>
          
          <Link 
            to="/admin/customers" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin/customers') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Users className="mr-3 h-5 w-5" />
            Customers
          </Link>
          
          <Link 
            to="/admin/payments" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin/payments') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <CreditCard className="mr-3 h-5 w-5" />
            Payments
          </Link>
          
          <Link 
            to="/admin/coupons" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin/coupons') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Tag className="mr-3 h-5 w-5" />
            Coupons
          </Link>
          
          <Link 
            to="/admin/settings" 
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
              isActive('/admin/settings') 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
        
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-background border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="md:hidden">
              <Logo size="sm" withText={false} />
            </div>
            
            <h1 className="text-xl font-semibold hidden md:block">Admin Dashboard</h1>
            
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <img 
                      src={user?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} 
                      alt={user?.name || ''} 
                      className="rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Separator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
