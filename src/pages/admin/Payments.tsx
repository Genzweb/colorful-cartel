
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminPayments: React.FC = () => {
  // Sample payments data
  const payments = [
    { id: 'PAY-1234', orderId: 'ORD-1234', customer: 'John Doe', amount: 49.99, method: 'Credit Card', status: 'Completed', date: '2023-11-15' },
    { id: 'PAY-1235', orderId: 'ORD-1235', customer: 'Jane Smith', amount: 29.99, method: 'PayPal', status: 'Completed', date: '2023-11-14' },
    { id: 'PAY-1236', orderId: 'ORD-1236', customer: 'Bob Johnson', amount: 89.99, method: 'Credit Card', status: 'Failed', date: '2023-11-13' },
    { id: 'PAY-1237', orderId: 'ORD-1237', customer: 'Alice Brown', amount: 19.99, method: 'Stripe', status: 'Completed', date: '2023-11-12' },
    { id: 'PAY-1238', orderId: 'ORD-1238', customer: 'Chris Davis', amount: 64.99, method: 'PayPal', status: 'Pending', date: '2023-11-11' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
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
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t">
                      <td className="p-3">{payment.id}</td>
                      <td className="p-3">{payment.orderId}</td>
                      <td className="p-3">{payment.customer}</td>
                      <td className="p-3">${payment.amount.toFixed(2)}</td>
                      <td className="p-3">{payment.method}</td>
                      <td className="p-3">
                        <Badge variant={getStatusColor(payment.status) as any}>
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="p-3">{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;
