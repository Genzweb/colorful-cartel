
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminCustomers: React.FC = () => {
  // Sample customers data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', orders: 5, spent: 249.95 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', orders: 3, spent: 119.97 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', orders: 1, spent: 89.99 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', orders: 2, spent: 39.98 },
    { id: 5, name: 'Chris Davis', email: 'chris@example.com', status: 'Active', orders: 4, spent: 159.96 },
  ];
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Customers</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left bg-muted/50">
                  <tr>
                    <th className="p-3 font-medium">Customer</th>
                    <th className="p-3 font-medium">Email</th>
                    <th className="p-3 font-medium">Status</th>
                    <th className="p-3 font-medium">Orders</th>
                    <th className="p-3 font-medium">Total Spent</th>
                    <th className="p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {customer.name}
                        </div>
                      </td>
                      <td className="p-3">{customer.email}</td>
                      <td className="p-3">
                        <Badge variant={customer.status === 'Active' ? 'success' : 'secondary'}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="p-3">{customer.orders}</td>
                      <td className="p-3">${customer.spent.toFixed(2)}</td>
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

export default AdminCustomers;
