
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminOrders: React.FC = () => {
  // Sample orders data
  const orders = [
    { id: 'ORD-1234', customer: 'John Doe', date: '2023-11-15', total: 49.99, status: 'Completed' },
    { id: 'ORD-1235', customer: 'Jane Smith', date: '2023-11-14', total: 29.99, status: 'Processing' },
    { id: 'ORD-1236', customer: 'Bob Johnson', date: '2023-11-13', total: 89.99, status: 'Completed' },
    { id: 'ORD-1237', customer: 'Alice Brown', date: '2023-11-12', total: 19.99, status: 'Shipped' },
    { id: 'ORD-1238', customer: 'Chris Davis', date: '2023-11-11', total: 64.99, status: 'Pending' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'shipped': return 'secondary';
      case 'pending': return 'default';
      default: return 'outline';
    }
  };
  
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
                      <td className="p-3">
                        <Badge variant={getStatusColor(order.status) as any}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <button className="text-blue-500 hover:underline">View Details</button>
                      </td>
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

export default AdminOrders;
