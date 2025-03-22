
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AdminPayments: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  // Sample payments data
  const payments = [
    { id: 'PAY-1234', orderId: 'ORD-1234', customer: 'John Doe', amount: 49.99, method: 'Credit Card', status: 'Completed', date: '2023-11-15' },
    { id: 'PAY-1235', orderId: 'ORD-1235', customer: 'Jane Smith', amount: 29.99, method: 'PayPal', status: 'Completed', date: '2023-11-14' },
    { id: 'PAY-1236', orderId: 'ORD-1236', customer: 'Bob Johnson', amount: 89.99, method: 'Bitcoin (BTC)', status: 'Completed', date: '2023-11-13', cryptoAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', txid: '3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u' },
    { id: 'PAY-1237', orderId: 'ORD-1237', customer: 'Alice Brown', amount: 19.99, method: 'Stripe', status: 'Completed', date: '2023-11-12' },
    { id: 'PAY-1238', orderId: 'ORD-1238', customer: 'Chris Davis', amount: 64.99, method: 'Ethereum (ETH)', status: 'Pending', date: '2023-11-11', cryptoAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };
  
  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentDetails(true);
  };
  
  const isCryptoPayment = (method: string) => {
    return method.includes('Bitcoin') || method.includes('Ethereum') || 
           method.includes('BTC') || method.includes('ETH') ||
           method.includes('crypto');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Payments</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">Payment ID</th>
                    <th className="p-3 font-medium">Order ID</th>
                    <th className="p-3 font-medium">Customer</th>
                    <th className="p-3 font-medium">Amount</th>
                    <th className="p-3 font-medium">Method</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Date</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t">
                      <td className="p-3">{payment.id}</td>
                      <td className="p-3">{payment.orderId}</td>
                      <td className="p-3">{payment.customer}</td>
                      <td className="p-3">${payment.amount.toFixed(2)}</td>
                      <td className="p-3">
                        {isCryptoPayment(payment.method) ? (
                          <div className="flex items-center">
                            {payment.method}
                            <QrCode className="h-3 w-3 ml-1 text-muted-foreground" />
                          </div>
                        ) : (
                          payment.method
                        )}
                      </td>
                      <td className="p-3">
                        <Badge variant={getStatusColor(payment.status) as "default" | "secondary" | "destructive" | "outline"}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="p-3">{payment.date}</td>
                      <td className="p-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(payment)}
                        >
                          Details
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
      
      <Dialog open={showPaymentDetails} onOpenChange={setShowPaymentDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>
              Transaction information for payment {selectedPayment?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Payment ID</p>
                  <p className="font-medium">{selectedPayment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{selectedPayment.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedPayment.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">${selectedPayment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Method</p>
                  <p className="font-medium">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{selectedPayment.status}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedPayment.date}</p>
                </div>
              </div>
              
              {isCryptoPayment(selectedPayment.method) && (
                <>
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Cryptocurrency Details</h3>
                    
                    <div className="space-y-3">
                      <div className="rounded-md border p-3">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-muted-foreground">Wallet Address</p>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <QrCode className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <code className="text-xs break-all">{selectedPayment.cryptoAddress}</code>
                      </div>
                      
                      {selectedPayment.txid && (
                        <div className="rounded-md border p-3">
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs text-muted-foreground">Transaction ID</p>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <code className="text-xs break-all">{selectedPayment.txid}</code>
                        </div>
                      )}
                      
                      <div className="rounded-md bg-muted p-3 flex justify-center">
                        <div className="text-center">
                          <QrCode className="h-32 w-32 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">Scan to view wallet address</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPayments;
