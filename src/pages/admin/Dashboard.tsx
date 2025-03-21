
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  TrendingUp,
  DollarSign,
  ShoppingBag,
  User
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart, 
  Line 
} from 'recharts';
import Logo from '@/components/ui/Logo';

// Sample data for charts
const salesData = [
  { name: 'Jan', revenue: 4000, orders: 24 },
  { name: 'Feb', revenue: 3000, orders: 18 },
  { name: 'Mar', revenue: 5000, orders: 30 },
  { name: 'Apr', revenue: 2780, orders: 16 },
  { name: 'May', revenue: 1890, orders: 11 },
  { name: 'Jun', revenue: 2390, orders: 14 },
  { name: 'Jul', revenue: 3490, orders: 21 },
];

const productPerformance = [
  { name: 'UI Kit', sales: 432 },
  { name: 'Templates', sales: 321 },
  { name: 'Icons', sales: 283 },
  { name: 'Plugins', sales: 230 },
  { name: 'Fonts', sales: 195 },
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  
  // Check if user is admin, if not redirect to home
  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);
  
  // If still checking auth or user is not admin, don't render the dashboard
  if (!user || user.role !== 'admin') {
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-background border-r">
        <div className="p-6">
          <Logo />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <Link to="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link to="/admin/products" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground hover:bg-muted">
            <Package className="mr-3 h-5 w-5" />
            Products
          </Link>
          
          <Link to="/admin/orders" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground hover:bg-muted">
            <ShoppingCart className="mr-3 h-5 w-5" />
            Orders
          </Link>
          
          <Link to="/admin/customers" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground hover:bg-muted">
            <Users className="mr-3 h-5 w-5" />
            Customers
          </Link>
          
          <Link to="/admin/payments" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground hover:bg-muted">
            <CreditCard className="mr-3 h-5 w-5" />
            Payments
          </Link>
          
          <Link to="/admin/coupons" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground hover:bg-muted">
            <Tag className="mr-3 h-5 w-5" />
            Coupons
          </Link>
          
          <Link to="/admin/settings" className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-foreground hover:bg-muted">
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
                      src={user.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} 
                      alt={user.name} 
                      className="rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,567.00</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+4.9%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.6%</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500 font-medium">+0.8%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="orders" stroke="hsl(var(--accent))" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={productPerformance}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" scale="band" />
                      <Tooltip />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Order #{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(Date.now() - 1000 * 60 * 60 * (i * 5 + 1)).toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        ${(Math.random() * 100 + 10).toFixed(2)}
                      </div>
                      <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { name: 'John Doe', email: 'john@example.com' },
                    { name: 'Jane Smith', email: 'jane@example.com' },
                    { name: 'Bob Johnson', email: 'bob@example.com' },
                    { name: 'Alice Brown', email: 'alice@example.com' },
                    { name: 'Chris Davis', email: 'chris@example.com' },
                  ].map((customer, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
