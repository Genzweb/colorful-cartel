
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { QrCode as QrCodeIcon, Copy } from 'lucide-react';

const AdminOrders: React.FC = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Sample orders data
  const orders = [
    { id: 'ORD-1234', customer: 'John Doe', date: '2023-11-15', total: 49.99, status: 'Completed', paymentMethod: 'Credit Card' },
    { id: 'ORD-1235', customer: 'Jane Smith', date: '2023-11-14', total: 29.99, status: 'Processing', paymentMethod: 'PayPal' },
    { id: 'ORD-1236', customer: 'Bob Johnson', date: '2023-11-13', total: 89.99, status: 'Completed', paymentMethod: 'Cryptocurrency (BTC)' },
    { id: 'ORD-1237', customer: 'Alice Brown', date: '2023-11-12', total: 19.99, status: 'Shipped', paymentMethod: 'Stripe' },
    { id: 'ORD-1238', customer: 'Chris Davis', date: '2023-11-11', total: 64.99, status: 'Pending', paymentMethod: 'Cryptocurrency (ETH)' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'processing': return 'default';
      case 'shipped': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };
  
  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowOrderDetails(true);
  };
  
  // Find the selected order
  const selectedOrder = orders.find(order => order.id === selectedOrderId);
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">Order ID</th>
                    <th className="p-3 font-medium">Customer</th>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Total</th>
                    <th className="p-3 font-medium">Payment Method</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">{order.date}</td>
                      <td className="p-3">${order.total}</td>
                      <td className="p-3">{order.paymentMethod}</td>
                      <td className="p-3">
                        <Badge variant={getStatusColor(order.status) as "default" | "secondary" | "destructive" | "outline"}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(order.id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder?.date} by {selectedOrder?.customer}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <h3 className="font-medium">Payment Information</h3>
              <div className="text-sm">
                <p><span className="text-muted-foreground">Method:</span> {selectedOrder?.paymentMethod}</p>
                <p><span className="text-muted-foreground">Status:</span> {selectedOrder?.status}</p>
                <p><span className="text-muted-foreground">Amount:</span> ${selectedOrder?.total}</p>
              </div>
              
              {selectedOrder?.paymentMethod.includes('Cryptocurrency') && (
                <div className="mt-2 rounded-md border p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">Crypto Payment Details</p>
                    <QrCodeIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <div className="flex items-center mt-1 mb-2">
                    <code className="bg-muted px-2 py-1 rounded text-xs flex-1 truncate mr-2">
                      {selectedOrder?.paymentMethod.includes('BTC') ? 
                        '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' : 
                        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'}
                    </code>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Transaction</p>
                  <code className="bg-muted px-2 py-1 rounded text-xs block mt-1 truncate">
                    {selectedOrder?.paymentMethod.includes('BTC') ? 
                      'txid:3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u' : 
                      '0xabcdef1234567890abcdef1234567890abcdef12'}
                  </code>
                </div>
              )}
            </div>
            
            <Separator />
            
            <div className="grid gap-2">
              <h3 className="font-medium">Order Items</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Product 1</span>
                  <span>$29.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Product 2</span>
                  <span>$19.99</span>
                </div>
                {selectedOrder?.paymentMethod.includes('(ETH)') && (
                  <div className="flex justify-between">
                    <span>Product 3</span>
                    <span>$15.01</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
