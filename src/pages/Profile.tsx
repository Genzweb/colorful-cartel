
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Sample purchase history for demo
  const purchaseHistory = [
    {
      id: 'ORD-123456',
      date: '2023-11-15',
      product: 'Netflix Premium',
      price: '$9.99',
      status: 'Active'
    },
    {
      id: 'ORD-123457',
      date: '2023-10-28',
      product: 'Spotify Premium',
      price: '$4.99',
      status: 'Active'
    },
    {
      id: 'ORD-123458',
      date: '2023-09-12',
      product: 'NordVPN',
      price: '$11.99',
      status: 'Active'
    },
    {
      id: 'ORD-123459',
      date: '2023-08-05',
      product: 'McAfee Antivirus',
      price: '$19.99',
      status: 'Expired'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-muted-foreground mb-2">{user?.email}</p>
                    {user?.role === 'admin' && (
                      <Badge className="mb-4">Admin</Badge>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={logout}
                    >
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="account">
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Manage your account details and preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input id="name" defaultValue={user?.name} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input id="email" defaultValue={user?.email} />
                      </div>
                      <div className="pt-4">
                        <Button>Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Orders</CardTitle>
                      <CardDescription>
                        View and manage your premium account purchases.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {purchaseHistory.map((order) => (
                          <div 
                            key={order.id} 
                            className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between"
                          >
                            <div>
                              <h3 className="font-medium">{order.product}</h3>
                              <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                              <p className="text-sm text-muted-foreground">Purchased: {order.date}</p>
                            </div>
                            <div className="mt-4 sm:mt-0 flex items-center gap-4">
                              <p className="font-medium">{order.price}</p>
                              <Badge variant={order.status === 'Active' ? 'default' : 'outline'}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your account security and password.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="text-sm font-medium">
                          Current Password
                        </label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="text-sm font-medium">
                          New Password
                        </label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="text-sm font-medium">
                          Confirm New Password
                        </label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div className="pt-4">
                        <Button>Update Password</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
